import React, { useEffect, useState } from "react";
import { loadLink } from "app/linkSlice";
import style from "scss/Top100Outstanding.module.scss";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autoplay, Pagination } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { Nav, NavItem } from "reactstrap";
import { loadCurrentSong } from "app/currentSongSilce";
import PlayMv from "features/Mv/components/PlayMv/PlayMv";

function VideoType({ data }) {
    const [mv, setMv] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [encodeId, setEncodeId] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (data.sections && data.sections.length > 0) {
            setMv(
                data.sections.filter((item) => item.sectionType === "video")[0]
                    .items
            );
        }
    }, [data]);

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
        <div className={style.top100Outstanding}>
            <div className={style.mainTitle}>
                <div className={style.top100OutstandingTiltle}>
                    {data.sections &&
                        data.sections.filter(
                            (item) => item.sectionType === "video"
                        )[0].title}
                </div>
                <Link to='/Top100'>
                    <span>{"tất cả".toUpperCase()}</span>
                    <FontAwesomeIcon icon='fa-solid fa-chevron-right' />
                </Link>
            </div>
            <div className={style.top100OutstandingContainer}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    slidesPerGroup={1}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    modules={[Autoplay, Pagination]}
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
                    {mv &&
                        mv.map((mv, index) => (
                            <SwiperSlide key={index}>
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
                                            onClick={() =>
                                                handleSendEncodeId(mv.encodeId)
                                            }
                                        >
                                            <div
                                                className={
                                                    style.top100OutstandingPlay
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
                                                {mv.artists.map(
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
                                                                    mv.artists
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
