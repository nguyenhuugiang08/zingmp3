import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadLink } from "app/linkSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from "scss/Top100Outstanding.module.scss";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import formatFollow from "utils/formatFollow";

function ArtistType({ list }) {
    const dispatch = useDispatch();

    const handleClickLink = (...rest) => {
        const action = loadLink(rest);
        dispatch(action);
    };

    return (
        <div>
            <div className={style.top100Outstanding}>
                <div className={style.mainTitle}>
                    <div className={style.top100OutstandingTiltle}>
                        Nghệ Sĩ/OA
                    </div>
                </div>
                <div className={style.top100OutstandingContainer}>
                    <Swiper
                        loop={true}
                        slidesPerView={3}
                        spaceBetween={10}
                        slidesPerGroup={1}
                        loopFillGroupWithBlank={true}
                        navigation={true}
                        modules={[Navigation]}
                        breakpoints={{
                            739: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                                slidesPerGroup: 1,
                            },
                            1023: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                                slidesPerGroup: 1,
                            },
                            1400: {
                                slidesPerView: 7,
                                spaceBetween: 30,
                                slidesPerGroup: 1,
                            },
                        }}
                        className='artist-swiper'
                    >
                        {list.map((artist, index) => (
                            <div key={artist.id}>
                                {index >= 5 ? (
                                    <></>
                                ) : (
                                    <SwiperSlide key={artist.id}>
                                        <div
                                            className={
                                                style.top100OutstandingPar
                                            }
                                            style={{ borderRadius: "50%" }}
                                        >
                                            <div
                                                className={
                                                    style.top100OutstandingImage
                                                }
                                                style={{
                                                    backgroundImage: `url(${artist.thumbnail})`,
                                                    borderRadius: "50%",
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
                                                    to={`${artist.link}/${artist.alias}`}
                                                    onClick={() =>
                                                        handleClickLink(
                                                            artist.link,
                                                            "artistdetail"
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
                                        <div className='d-flex justify-content-center align-items-center flex-column'>
                                            <div
                                                className={
                                                    style.top100OutstandingTitle
                                                }
                                            >
                                                {artist.name}
                                            </div>
                                            <div>
                                                {formatFollow(
                                                    artist.totalFollow
                                                )}{" "}
                                                quan tâm
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )}
                            </div>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default ArtistType;
