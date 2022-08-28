import React, { useEffect, useState } from "react";
import { loadLink } from "app/linkSlice";
import style from "scss/Top100Outstanding.module.scss";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, NavItem } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

function PlaylistType({ data }) {
    const [single, setSingle] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (data.sections && data.sections.length > 0) {
            setSingle(
                data.sections.filter((item) => item.sectionType === "playlist")
            );
        }
    }, [data]);

    const handleClickLink = (...rest) => {
        const action = loadLink(rest);
        dispatch(action);
    };
    return (
        <div>
            {single.map((playlist, index) => (
                <div
                    key={index}
                    className={style.top100Outstanding}
                >
                    <div className={style.mainTitle}>
                        <div className={style.top100OutstandingTiltle}>
                            {playlist.title}
                        </div>
                        <Link to='/Top100'>
                            <span>{"tất cả".toUpperCase()}</span>
                            <FontAwesomeIcon icon='fa-solid fa-chevron-right' />
                        </Link>
                    </div>
                    <div className={style.top100OutstandingContainer}>
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={10}
                            slidesPerGroup={1}
                            pagination={true}
                            modules={[Pagination]}
                            breakpoints={{
                                739: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                1023: {
                                    slidesPerView: 4,
                                    spaceBetween: 30,
                                },
                                1400: {
                                    slidesPerView: 5,
                                    spaceBetween: 30,
                                },
                            }}
                            className='mySwiper'
                        >
                            {playlist.items.map((compo, index) => (
                                <div key={compo.encodeId}>
                                    {index >= 5 ? (
                                        <></>
                                    ) : (
                                        <SwiperSlide
                                            className={
                                                style.top100OutstandingCol
                                            }
                                            key={compo.encodeId}
                                        >
                                            <div
                                                className={
                                                    style.top100OutstandingPar
                                                }
                                            >
                                                <div
                                                    className={
                                                        style.top100OutstandingImage
                                                    }
                                                    style={{
                                                        backgroundImage: `url(${compo.thumbnail})`,
                                                    }}
                                                ></div>
                                                <div
                                                    className={
                                                        style.top100OutstandingChild
                                                    }
                                                >
                                                    <div>
                                                        <FontAwesomeIcon icon='fa-regular fa-heart' />
                                                    </div>
                                                    <Link
                                                        className={
                                                            style.top100OutstandingPlay
                                                        }
                                                        to={`${compo.link}/${compo.encodeId}`}
                                                        onClick={() =>
                                                            handleClickLink(
                                                                compo.link,
                                                                "album"
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon icon='fa-solid fa-play' />
                                                    </Link>
                                                    <div>
                                                        <FontAwesomeIcon icon='fa-solid fa-ellipsis' />
                                                    </div>
                                                </div>
                                            </div>
                                            {playlist.title ===
                                            "Single & EP" ? (
                                                <div>
                                                    <div
                                                        className={
                                                            style.top100OutstandingTitle
                                                        }
                                                    >
                                                        {compo.title}
                                                    </div>
                                                    <div
                                                        className={
                                                            style.top100OutstandingArtistItem
                                                        }
                                                    >
                                                        {compo.releaseDateText}
                                                    </div>
                                                </div>
                                            ) : playlist.title ===
                                              "Tuyển tập" ? (
                                                <div>
                                                    <div
                                                        className={
                                                            style.top100OutstandingTitle
                                                        }
                                                    >
                                                        {compo.title}
                                                    </div>
                                                    <div
                                                        className={
                                                            style.top100OutstandingArtistItem
                                                        }
                                                    >
                                                        {compo.releaseDateText}
                                                    </div>
                                                </div>
                                            ) : playlist.title ===
                                              "Xuất hiện trong" ? (
                                                <div>
                                                    <div
                                                        className={
                                                            style.top100OutstandingTitle
                                                        }
                                                    >
                                                        {compo.title}
                                                    </div>
                                                    <div>
                                                        <Nav>
                                                            {compo.artists.map(
                                                                (
                                                                    artist,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
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
                                                                                {
                                                                                    artist.name
                                                                                }
                                                                                ,
                                                                            </Link>
                                                                        </NavItem>
                                                                    </div>
                                                                )
                                                            )}
                                                        </Nav>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div
                                                        className={
                                                            style.top100OutstandingTitle
                                                        }
                                                    >
                                                        {compo.title}
                                                    </div>
                                                    <div
                                                        className={
                                                            style.top100OutstandingArtistItem
                                                        }
                                                    >
                                                        {compo.releaseDateText}
                                                    </div>
                                                </div>
                                            )}
                                        </SwiperSlide>
                                    )}
                                </div>
                            ))}
                        </Swiper>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PlaylistType;
