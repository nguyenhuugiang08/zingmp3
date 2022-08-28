import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import ReactLoading from "react-loading";
import songApi from "api/songApi";
import { useDispatch, useSelector } from "react-redux";
import PlaySongRight from "../PlaySongRight/PlaySongRight";
import PlaySongLyric from "components/PlaySong/PlaySongLyric";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatTime from "utils/formatTime";
import { loadCurrentSong } from "app/currentSongSilce";

function PlaySongCenter() {
    const dataStore = useSelector((state) => state.currentSong);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");
    const [pathSong, setPathSong] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const [listSong, setListSong] = useState([]);
    const [index, setIndex] = useState(0);

    const [infoSong, setInfoSong] = useState({
        urlImage: "",
        title: "",
        artists: [],
        duration: "",
        thumbnailM: "",
    });

    const { urlImage, title, artists, duration, thumbnailM } = infoSong;

    const [vol, setVol] = useState(1);
    const [displayLyric, setDisplayLyric] = useState(false);

    useEffect(() => {
        if (dataStore.length !== 0) {
            setId(dataStore[dataStore.length - 1].encodeId);
            setListSong(dataStore[dataStore.length - 1].songs);
            setIndex(dataStore[dataStore.length - 1].index);
        }
    }, [dataStore]);

    useEffect(() => {
        if (dataStore.length !== 0) {
            try {
                const getPath = async () => {
                    const params = {
                        id: dataStore[dataStore.length - 1].encodeId,
                    };
                    setLoading(true);
                    const response = await songApi.getAll(params);
                    if (response.msg === "Success") {
                        setPathSong(response.data["128"]);
                        setIsPlaying(true);
                    } else {
                        setPathSong("");
                        setIsPlaying(false);
                    }
                    setLoading(false);
                };
                getPath();
            } catch (error) {
                console.log("error", error);
            }
        }
    }, [dataStore]);

    useEffect(() => {
        if (listSong.length !== 0) {
            setInfoSong({
                ...infoSong,
                urlImage: listSong[index].thumbnail,
                title: listSong[index].title,
                artists: listSong[index].artists,
                duration: listSong[index].duration,
                thumbnailM: listSong[index].thumbnailM,
            });
        }
    }, [listSong, index]);

    // xử lý play & pause audio
    const handlePlay = () => {
        if (!isPlaying && audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    //xử lý thông báo bài hát dành cho tài khoản VIP
    const notify = () =>
        toast.error("Dành Cho Tài Khoản VIP", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    //xử lý thanh thời gian chạy
    const handleOnchaneSeek = () => {
        if (loading && audioRef.current) {
            seekRef.current.value = 0;
            setTime(0);
            audioRef.current.pause();
        } else {
            seekRef.current.value =
                (audioRef.current.currentTime / duration) * 100;
            setTime(audioRef.current ? audioRef.current.currentTime : 0);
            seekRef.current.style.backgroundSize =
                ((seekRef.current.value - seekRef.current.min) * 100) /
                    (seekRef.current.max - seekRef.current.min) +
                "% 100%";
        }
    };

    //xử lý lặp lại bài hát khi click vào nút lặp lại
    const handleClickRepeatBtn = () => {
        repeatBtnRef.current.classList.toggle("play-song__btn--active");
        if (!isRepeat) {
            setIsRepeat(true);
        } else {
            setIsRepeat(false);
        }
    };

    // xử lý khi click nút random
    const handleClickRandomBtn = () => {
        randomBtnRef.current.classList.toggle("play-song__btn--active");
        if (!isRandom) {
            setIsRandom(true);
        } else {
            setIsRandom(false);
        }
    };

    // xử lý tua bài hát
    const handleChange = () => {
        const seekTime = (seekRef.current.value / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    // xử lý next bài hát
    const handleNextSong = () => {
        if (!isRandom) {
            setIndex((prev) => prev + 1);
            let encodeIdNext = "";
            if (index >= listSong.length - 1) {
                setIndex(0);
                encodeIdNext = listSong[0].encodeId;
                setId(encodeIdNext);
            } else {
                encodeIdNext = listSong[index + 1].encodeId;
                setId(encodeIdNext);
            }
            const action = loadCurrentSong({
                encodeId: encodeIdNext,
                isPlay: true,
                songs: listSong,
                index: index >= listSong.length - 1 ? 0 : index + 1,
            });
            dispatch(action);
        }
    };

    // xử lý prev bài hát
    const handlePrevSong = () => {
        if (!isRandom) {
            setIndex(index - 1);
            let encodeIdPrev = "";
            if (index <= 0) {
                setIndex(listSong.length - 1);
                encodeIdPrev = listSong[listSong.length - 1].encodeId;
                setId(encodeIdPrev);
            } else {
                encodeIdPrev = listSong[index - 1].encodeId;
                setId(encodeIdPrev);
            }
            const action = loadCurrentSong({
                encodeId: encodeIdPrev,
                isPlay: true,
                songs: listSong,
                index: index <= 0 ? listSong.length - 1 : index - 1,
            });
            dispatch(action);
        }
    };

    // xử lý khi kết thúc bài hát
    const handleEndSong = () => {
        if (isRepeat && audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            handleNextSong();
        }
    };

    // xử lý phát bài hát random khi click nút random - không random lại bài hát cũ
    const handleRandomSong = () => {
        const indexRandom = Math.floor(Math.random() * (listSong.length - 1));
        setIndex(indexRandom);
        const encodeIdPrev = listSong[indexRandom].encodeId;
        setId(encodeIdPrev);
        const action = loadCurrentSong({
            encodeId: encodeIdPrev,
            isPlay: true,
            songs: listSong,
            index: indexRandom,
        });
        dispatch(action);
    };

    // xử lý thay đổi âm lượng
    const handleChangeVol = () => {
        setVol(volRef.current.value);
        if (audioRef.current) {
            audioRef.current.volume = vol;
        }
        volRef.current.style.backgroundSize =
            ((volRef.current.value - volRef.current.min) * 100) /
                (volRef.current.max - volRef.current.min) +
            "% 100%";
    };

    // xử lý hiện lời bài hát
    const handelDisplayLyric = () => {
        if (!displayLyric) {
            setDisplayLyric(true);
        } else {
            setDisplayLyric(false);
        }
    };

    const audioRef = useRef();
    const seekRef = useRef();
    const repeatBtnRef = useRef();
    const randomBtnRef = useRef();
    const volRef = useRef();

    return (
        <>
            <PlaySongRight
                urlImage={urlImage}
                title={title}
                artists={artists}
            />
            <div className='play-song__center'>
                <div className='play-song__action'>
                    <button
                        className='play-song__btn play-song__btn-random'
                        ref={randomBtnRef}
                        onClick={handleClickRandomBtn}
                    >
                        <FontAwesomeIcon icon='fa-solid fa-shuffle' />
                    </button>
                    <button
                        className='play-song__btn play-song__btn-prev'
                        onClick={isRandom ? handleRandomSong : handlePrevSong}
                    >
                        <FontAwesomeIcon icon='fa-solid fa-backward-step' />
                    </button>
                    <button
                        onClick={
                            listSong.length > 0 && listSong[index].isWorldWide
                                ? handlePlay
                                : notify
                        }
                        className='play-song__btn btn-play'
                    >
                        {loading ? (
                            <ReactLoading
                                className='play-song-loading'
                                type='spinningBubbles'
                                color='#fff'
                                height={30}
                                width={30}
                            />
                        ) : !isPlaying ? (
                            <FontAwesomeIcon icon='fa-solid fa-play' />
                        ) : (
                            <FontAwesomeIcon icon='fa-solid fa-pause' />
                        )}
                        <audio
                            className='audio'
                            ref={audioRef}
                            src={pathSong}
                            onTimeUpdate={handleOnchaneSeek}
                            onEnded={handleEndSong}
                            autoPlay={true}
                        ></audio>
                    </button>
                    <button
                        className='play-song__btn play-song__btn-next'
                        onClick={isRandom ? handleRandomSong : handleNextSong}
                    >
                        <FontAwesomeIcon icon='fa-solid fa-forward-step' />
                    </button>
                    <button
                        className='play-song__btn play-song__btn-repeat'
                        ref={repeatBtnRef}
                        onClick={handleClickRepeatBtn}
                    >
                        <FontAwesomeIcon icon='fa-solid fa-repeat' />
                    </button>
                </div>
                <div className='play-song__duration'>
                    <span className='play-song__duration-time-left'>
                        {loading ? "00:00" : formatTime(time)}
                    </span>
                    <div className='play-song__duration-center'>
                        <input
                            type='range'
                            id='seek'
                            min={0}
                            max={100}
                            step={1}
                            ref={seekRef}
                            value={(time / duration) * 100 || 0}
                            className='play-song__duration-input'
                            onChange={handleChange}
                        />
                    </div>
                    <span className='play-song__duration-time-right'>
                        {formatTime(duration)}
                    </span>
                </div>
            </div>
            <div className='play-song__left'>
                <button className='play-song__btn'>
                    <FontAwesomeIcon icon='fa-regular fa-circle-play' />
                </button>
                <button className='play-song__btn' onClick={handelDisplayLyric}>
                    <FontAwesomeIcon icon='fa-solid fa-microphone' />
                </button>
                <button className='play-song__btn play-song__btn-window'>
                    <FontAwesomeIcon icon='fa-regular fa-window-restore' />
                </button>
                <button className='play-song__btn'>
                    <FontAwesomeIcon icon='fa-solid fa-volume-high' />
                </button>
                <input
                    type='range'
                    min={0}
                    max={1}
                    step={0.01}
                    className='play-song__left-vol'
                    ref={volRef}
                    value={vol}
                    onChange={handleChangeVol}
                    onClick={handleChangeVol}
                />
                <button className='play-song__btn'>
                    <FontAwesomeIcon icon='fa-solid fa-list-ul' />
                </button>
            </div>
            {displayLyric ? (
                <PlaySongLyric id={id} thumb={thumbnailM} time={time} />
            ) : (
                <></>
            )}
            <ToastContainer />
        </>
    );
}

export default PlaySongCenter;
