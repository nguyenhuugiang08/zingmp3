import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "scss/Top100Outstanding.module.scss";
import { useDispatch } from "react-redux";
import { loadLink } from "app/linkSlice";
import { loadCurrentSong } from "app/currentSongSilce";
import PlayMv from "features/Mv/components/PlayMv/PlayMv";

function VideoType({ list }) {
    const [mounted, setMounted] = useState(false);
    const [encodeId, setEncodeId] = useState("");

    const dispatch = useDispatch();

    const handleClickLink = (...rest) => {
        const action = loadLink(rest);
        dispatch(action);
    };

    const handleSendEncodeId = (id) => {
        setEncodeId(id);
        setMounted(true);
        const action = loadCurrentSong({ isPlay: false });
        dispatch(action);
    };

    const handleClosePlayer = () => {
        setMounted(false);
    };
    return (
        <div>
            <div className={style.top100Outstanding}>
                <div className={style.mainTitle}>
                    <div className={style.top100OutstandingTiltle}>MV</div>
                </div>
                <div className={style.top100OutstandingContainer}>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        slidesPerGroup={1}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        navigation={true}
                        modules={[Autoplay, Navigation]}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            739: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1023: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        className='mySwiper'
                    >
                        {list.map((mv) => (
                            <SwiperSlide key={mv.encodeId}>
                                <div className={style.top100OutstandingCol}>
                                    <div className={style.top100OutstandingPar}>
                                        <div
                                            className={
                                                style.top100OutstandingMv
                                            }
                                            style={{
                                                backgroundImage: `url(${mv.thumbnail})`,
                                            }}
                                        ></div>
                                        <div
                                            className={
                                                style.top100OutstandingChild
                                            }
                                        >
                                            <div
                                                className={
                                                    style.top100OutstandingPlay
                                                }
                                                onClick={() =>
                                                    handleSendEncodeId(
                                                        mv.encodeId
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon icon='fa-solid fa-play' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className=' d-flex justify-content-start align-items-center mt-1'>
                                        <div
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                position: "relative",
                                                top: "3px",
                                            }}
                                        >
                                            <div
                                                className={
                                                    style.top100OutstandingMvImg
                                                }
                                                style={{
                                                    backgroundImage: `url(${
                                                        mv.artist &&
                                                        mv.artist.thumbnail
                                                    })`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className='ms-2'>
                                            <div
                                                className={
                                                    style.top100OutstandingTitle
                                                }
                                            >
                                                {mv.title}
                                            </div>
                                            <Nav>
                                                {mv.artists &&
                                                    mv.artists.map(
                                                        (artist, index) => (
                                                            <div
                                                                key={index}
                                                                className={
                                                                    style.top100OutstandingArtist
                                                                }
                                                            >
                                                                <NavItem>
                                                                    <Link
                                                                        to={`${artist.link}/${artist.alias}`}
                                                                        onClick={() =>
                                                                            handleClickLink(
                                                                                artist.link,
                                                                                "artistdetail"
                                                                            )
                                                                        }
                                                                        className={
                                                                            style.top100OutstandingArtistItem
                                                                        }
                                                                        style={{
                                                                            textDecoration:
                                                                                "none",
                                                                        }}
                                                                    >
                                                                        {index <
                                                                        mv
                                                                            .artists
                                                                            .length -
                                                                            1
                                                                            ? `${artist.name},`
                                                                            : `${artist.name}`}
                                                                    </Link>
                                                                </NavItem>
                                                            </div>
                                                        )
                                                    )}
                                            </Nav>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            {!mounted ? (
                <></>
            ) : (
                <div>
                    <div
                        className='playmv-container-header__icon'
                        onClick={handleClosePlayer}
                    >
                        <FontAwesomeIcon icon='fa-solid fa-xmark' />
                    </div>
                    <PlayMv encodeId={encodeId} />
                </div>
            )}
        </div>
    );
}

export default VideoType;
