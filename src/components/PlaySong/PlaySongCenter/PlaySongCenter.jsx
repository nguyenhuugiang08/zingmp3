import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import ReactLoading from 'react-loading';
import songApi from 'api/songApi'
import { useSelector } from 'react-redux';
import PlaySongRight from '../PlaySongRight/PlaySongRight';
import PlaySongLyric from 'components/PlaySong/PlaySongLyric/PlaySongLyric';

function PlaySongCenter() {
    const dataStore = useSelector(state => state.top100)

    const [loading, setLoading] = useState(false)
    const [id, setId] = useState('')
    const [pathSong, setPathSong] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [time, setTime] = useState(0)
    const [isRepeat, setIsRepeat] = useState(false)
    const [isRandom, setIsRandom] = useState(false)
    const [listSong, setListSong] = useState([])
    const [index, setIndex] = useState(0)
    const [urlImage, setUrlImage] = useState('')
    const [title, setTitle] = useState('')
    const [artists, setArtists] = useState([])
    const [duration, setDuration] = useState('')
    const [vol, setVol] = useState(1)
    const [displayLyric, setDisplayLyric] = useState(false)

    const [thumb, setThumb] = useState('')

    useEffect(() => {
        if (id) {
            const getPath = async () => {
                const params = {
                    id: id
                }
                setLoading(true)
                const response = await songApi.getAll(params)
                setPathSong(response.data)
                setIsPlaying(true)
                setLoading(false)
            }
            getPath()
        }
    }, [id])

    useEffect(() => {
        if (dataStore.length !== 0) {
            setId(dataStore[dataStore.length - 1].encodeId)
        }
    }, [dataStore])

    useEffect(() => {
        if (dataStore.length !== 0) {
            setListSong(dataStore[dataStore.length - 1].songs)
        }
    }, [dataStore])

    useEffect(() => {
        if (dataStore.length !== 0) {
            setIndex(dataStore[dataStore.length - 1].index)
        }
    }, [dataStore])


    useEffect(() => {
        if (listSong.length !== 0) {
            setUrlImage(listSong[index].thumbnail)
        }
    }, [listSong, index])

    useEffect(() => {
        if (listSong.length !== 0) {
            setTitle(listSong[index].title)
        }
    }, [listSong, index])

    useEffect(() => {
        if (listSong.length !== 0) {
            setArtists(listSong[index].artists)
        }
    }, [listSong, index])

    useEffect(() => {
        if (listSong.length !== 0) {
            setDuration(listSong[index].duration)
        }
    }, [listSong, index])

    useEffect(() => {
        if (listSong.length !== 0) {
            setThumb(listSong[index].thumbnailM)
        }
    }, [listSong, index])

    const handlePlay = () => {
        if (!isPlaying && audioRef.current) {
            audioRef.current.play()
            setIsPlaying(true)
        } else {
            if (audioRef.current) {
                audioRef.current.pause()
                setIsPlaying(false)
            }
            else{
                alert("D??nh cho VIP")
            }
        }
    }

    const handleOnchaneSeek = () => {
        if (loading && audioRef.current) {
            seekRef.current.value = 0
            setTime(0)
            audioRef.current.pause()
        } else {
            seekRef.current.value = (audioRef.current.currentTime / duration) * 100
            setTime(audioRef.current ? audioRef.current.currentTime : 0)
        }
    }

    const handleClickRepeatBtn = () => {
        repeatBtnRef.current.classList.toggle("play-song__btn--active")
        if (!isRepeat) {
            setIsRepeat(true)
        } else {
            setIsRepeat(false)
        }
    }

    const handleClickRandomBtn = () => {
        randomBtnRef.current.classList.toggle("play-song__btn--active")
        if (!isRandom) {
            setIsRandom(true)
        } else {
            setIsRandom(false)
        }
    }

    const handleChange = () => {
        const seekTime = seekRef.current.value / 100 * duration
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime
            audioRef.current.play()
            setIsPlaying(true)
        }
    }

    const handleNextSong = () => {
        if (!isRandom) {
            setIndex(index + 1)
            if (index >= listSong.length - 1) {
                setIndex(0)
                const encodeIdNext = listSong[0].encodeId
                setId(encodeIdNext)
            } else {
                const encodeIdNext = listSong[index + 1].encodeId
                setId(encodeIdNext)
            }
        } else {
            handleRandomSong()
        }
    }

    const handlePrevSong = () => {
        if (!isRandom) {
            setIndex(index - 1)
            if (index <= 0) {
                setIndex(listSong.length - 1)
                const encodeIdPrev = listSong[listSong.length - 1].encodeId
                setId(encodeIdPrev)
            } else {
                const encodeIdPrev = listSong[index - 1].encodeId
                setId(encodeIdPrev)
            }
        }
    }

    const handleEndSong = () => {
        if (isRepeat &&  audioRef.current) {
            audioRef.current.play()
            setIsPlaying(true)
        } else {
            handleNextSong()
        }
    }

    const handleRandomSong = () => {
        const indexRandom = Math.floor(Math.random() * (listSong.length - 1))
        setIndex(indexRandom)
        const encodeIdPrev = listSong[indexRandom].encodeId
        setId(encodeIdPrev)
    }

    const handleChangeVol = () => {
        setVol(volRef.current.value)
        if(audioRef.current){
            audioRef.current.volume = vol
        }
    }

    const handelDisplayLyric = () => {
        if (!displayLyric) {
            setDisplayLyric(true)
        } else {
            setDisplayLyric(false)
        }
    }

    const audioRef = useRef()
    const seekRef = useRef()
    const repeatBtnRef = useRef()
    const randomBtnRef = useRef()
    const volRef = useRef()

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
                        className='play-song__btn'
                        ref={randomBtnRef}
                        onClick={handleClickRandomBtn}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-shuffle" />
                    </button>
                    <button
                        className='play-song__btn'
                        onClick={isRandom ? handleRandomSong : handlePrevSong}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-backward-step" />
                    </button>
                    <button
                        onClick={handlePlay}
                        className="play-song__btn btn-play"
                    >
                        {loading ? <ReactLoading type='spinningBubbles' color='#fff' height={30} width={30} /> :
                            (!isPlaying ? <FontAwesomeIcon icon="fa-solid fa-play" /> : <FontAwesomeIcon icon="fa-solid fa-pause" />)}
                        {pathSong && <audio
                            ref={audioRef}
                            src={pathSong["128"]}
                            onTimeUpdate={handleOnchaneSeek}
                            onEnded={handleEndSong}
                            autoPlay={true}
                        ></audio>}
                    </button>
                    <button
                        className='play-song__btn'
                        onClick={isRandom ? handleRandomSong : handleNextSong}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-forward-step" />
                    </button>
                    <button
                        className='play-song__btn'
                        ref={repeatBtnRef}
                        onClick={handleClickRepeatBtn}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-repeat" />
                    </button>
                </div>
                <div className='play-song__duration'>
                    <span className='play-song__duration-time-left'>
                        {loading ? '00' : (Math.floor(time / 60) >= 10 ? Math.floor(time / 60) :
                            `0${Math.floor(time / 60)}`)}
                        :{loading ? '00' : (time % 60 > 9 ? Math.ceil(time % 60) : `0${Math.ceil(time % 60)}`)}
                    </span>
                    <div className='play-song__duration-center'>
                        <input
                            type="range" id='seek' min={0} max={100} step={1} ref={seekRef}
                            className="play-song__duration-input"
                            onChange={handleChange}
                        />
                    </div>
                    <span className='play-song__duration-time-right'>{Math.floor(duration / 60) > 10 ? Math.floor(duration / 60) : `0${Math.floor(duration / 60)}`}
                        :{duration % 60 > 10 ? duration % 60 : `0${duration % 60}`}
                    </span>
                </div>
            </div>
            <div className='play-song__left'>
                <button
                    className='play-song__btn'>
                    <FontAwesomeIcon icon="fa-regular fa-circle-play" />
                </button>
                <button
                    className='play-song__btn'
                    onClick={handelDisplayLyric}
                >
                    <FontAwesomeIcon icon="fa-solid fa-microphone" />
                </button>
                <button className='play-song__btn'>
                    <FontAwesomeIcon icon="fa-regular fa-window-restore" />
                </button>
                <button className='play-song__btn'>
                    <FontAwesomeIcon icon="fa-solid fa-volume-high" />
                </button>
                <input
                    type="range" min={0} max={1} step={0.01}
                    className='play-song__left-vol'
                    ref={volRef}
                    onChange={handleChangeVol}
                    onClick={handleChangeVol}
                />
                <button className='play-song__btn'>
                    <FontAwesomeIcon icon="fa-solid fa-list-ul" />
                </button>
            </div>
            {displayLyric ? <PlaySongLyric id={id} thumb={thumb} time={time} /> : <></>}
        </>
    )
}

export default PlaySongCenter