import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import lyricApi from "api/lyricApi";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import ReactLoading from "react-loading";
import "scss/PlaySongLyric.scss";
import LyricHasTime from "./components/LyricHasTime";
import LyricNoTime from "./components/LyricNoTime";

function PlaySongLyric({ id, thumb, time }) {
    const [data, setData] = useState({});
    const [sentences, setSentences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState(false);
    const [display, setDisplay] = useState(false);
    const [scrollDistance, setScrollDistance] = useState(80);

    useEffect(() => {
        if (id) {
            const getLyric = async () => {
                const params = {
                    id: id,
                };
                setLoading(true);
                const response = await lyricApi.getAll(params);
                setData(response.data);
                setLoading(false);
            };
            getLyric();
        }
    }, [id]);

    useEffect(() => {
        if (data.sentences) {
            setSentences(data.sentences);
        }

        if (data.lyric) {
            setSentences(data.lyric);
        }
    }, [data]);

    const handleChangeCategory = (e) => {
        let activeElement = document.querySelectorAll(
            ".play-song-lyric__options-item"
        );
        activeElement.forEach((element) => {
            element.style.backgroundColor = "transparent";
        });
        e.target.style.backgroundColor = "#6D5C79";
    };

    const lyricRef = useRef();
    const circleRef = useRef();
    const modeRef = useRef();
    const imgRef = useRef();

    const handleChangeFontSize = (e, val) => {
        let activeElement = document.querySelectorAll(".btn-fontsize");
        activeElement.forEach((element) => {
            element.style.backgroundColor = "#ffffff1a";
        });
        e.target.style.backgroundColor = "#7200a1";
        let sentencesElement = document.querySelectorAll(
            ".play-song-lyric__center-sentences"
        );
        sentencesElement.forEach((element) => {
            element.style.fontSize = `${
                val === 1 ? "30px" : val === 2 ? "40px" : "44px"
            }`;
        });
        if (val === 1) {
            setScrollDistance(66);
        } else if (val === 2) {
            setScrollDistance(80);
        } else {
            setScrollDistance(80);
        }
    };

    const handleClickMode = () => {
        if (!mode) {
            let index = Math.floor(
                Math.random() * (data.defaultIBGUrls.length - 1)
            );
            circleRef.current.style.marginLeft = "13px";
            circleRef.current.style.animation = "lightMode linear 0.2s";
            modeRef.current.style.backgroundColor = "#7200a1";
            imgRef.current.src = `${data.defaultIBGUrls[index]}`;
            setMode(true);
        } else {
            circleRef.current.style.marginLeft = "0px";
            circleRef.current.style.animation = "darkMode linear 0.2s";
            modeRef.current.style.backgroundColor = "#a0a0a0";
            imgRef.current.src = "";
            setMode(false);
        }
    };

    const handleDisplayMenu = () => {
        let modeElement = document.querySelector(".play-song__btn-mode");
        if (!display) {
            modeElement.style.display = "block";
            setDisplay(true);
        } else {
            modeElement.style.display = "none";
            setDisplay(false);
        }
    };

    return (
        <div ref={lyricRef} className='play-song-lyric'>
            <img
                ref={imgRef}
                src={""}
                alt=''
                style={{ position: "fixed", bottom: "90px", opacity: "0.7" }}
            />
            <div className='play-song-lyric__wrapper'>
                <div className='play-song-lyric__options'>
                    <div
                        className='play-song-lyric__options-item'
                        onClick={(e) => handleChangeCategory(e)}
                    >
                        Danh sách bài hát
                    </div>
                    <div
                        className='play-song-lyric__options-item'
                        onClick={(e) => handleChangeCategory(e)}
                    >
                        karaoke
                    </div>
                    <div
                        className='play-song-lyric__options-item play-song-lyric__options-item--active'
                        onClick={(e) => handleChangeCategory(e)}
                    >
                        Lời bài hát
                    </div>
                </div>
                <div className='play-song-lyric__actions'>
                    <div className='play-song__btn'>
                        <FontAwesomeIcon icon='fa-solid fa-up-right-and-down-left-from-center' />
                    </div>
                    <div className='play-song__btn' onClick={handleDisplayMenu}>
                        <FontAwesomeIcon icon='fa-solid fa-gear' />
                        <div
                            className='play-song__btn-mode'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className='play-song__btn-mode-item '>
                                <div>Hình nền</div>
                                <div
                                    className='btn-mode'
                                    ref={modeRef}
                                    onClick={handleClickMode}
                                >
                                    <div
                                        className='btn-mode__circle'
                                        ref={circleRef}
                                    ></div>
                                </div>
                            </div>
                            <div className='play-song__btn-mode-item play-song__btn-mode-item__prevent'>
                                Chỉ phát nhạc nền
                                <div className='btn-mode'>
                                    <div className='btn-mode__circle'></div>
                                </div>
                            </div>
                            <div className='play-song__btn-mode-item'>
                                Cỡ chữ lời nhạc
                                <div className='d-flex justify-content-between'>
                                    <div
                                        className='play-song__btn-mode-item__sm ms-2 btn-fontsize'
                                        onClick={(e) =>
                                            handleChangeFontSize(e, 1)
                                        }
                                    >
                                        A
                                    </div>
                                    <div
                                        className='play-song__btn-mode-item__md play-song__btn-mode-item__active ms-2 btn-fontsize'
                                        onClick={(e) =>
                                            handleChangeFontSize(e, 2)
                                        }
                                    >
                                        A
                                    </div>
                                    <div
                                        className='play-song__btn-mode-item__xl ms-2 btn-fontsize'
                                        onClick={(e) =>
                                            handleChangeFontSize(e, 3)
                                        }
                                    >
                                        A
                                    </div>
                                </div>
                            </div>
                            <div className='play-song__btn-mode-item'>
                                Luôn phát nhạc toàn màn hình
                                <div className='btn-mode'>
                                    <div className='btn-mode__circle'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='play-song-lyric__main'>
                <Container fluid>
                    <Row xs={2}>
                        <Col xs={12} lg={5}>
                            <div>
                                <img
                                    className='play-song-lyric__img'
                                    src={thumb}
                                    alt=''
                                />
                            </div>
                        </Col>
                        <Col xs={12} lg={7}>
                            <div className='play-song-lyric__center'>
                                {loading ? (
                                    <ReactLoading
                                        type='spinningBubbles'
                                        color='#fff'
                                        height={40}
                                        style={{ padding: 200 + "px" }}
                                    />
                                ) : Array.isArray(sentences) ? (
                                    <LyricHasTime
                                        sentences={sentences}
                                        scrollDistance={scrollDistance}
                                        time={time}
                                    />
                                ) : (
                                    <LyricNoTime sentences={sentences} />
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default PlaySongLyric;
