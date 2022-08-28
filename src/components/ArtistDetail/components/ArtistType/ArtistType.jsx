import React, { useEffect, useState } from "react";
import { loadLink } from "app/linkSlice";
import style from "scss/Top100Outstanding.module.scss";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import formatFollow from "utils/formatFollow";

function ArtistType({ data }) {
    const [like, setLike] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (data.sections && data.sections.length > 0) {
            setLike(
                data.sections.filter((item) => item.sectionType === "artist")[0]
                    .items
            );
        }
    }, [data]);

    const handleClickLink = (...rest) => {
        const action = loadLink(rest);
        dispatch(action);
    };
    return (
        <div className={style.top100Outstanding}>
            <div className={style.mainTitle}>
                <div className={style.top100OutstandingTiltle}>
                    {data.sections &&
                        data.sections.filter(
                            (item) => item.sectionType === "artist"
                        )[0].title}
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
                    {like.map((like, index) => (
                        <div key={like.id}>
                            {index >= 5 ? (
                                <></>
                            ) : (
                                <SwiperSlide
                                    className={style.top100OutstandingCol}
                                    key={like.id}
                                >
                                    <div
                                        className={style.top100OutstandingPar}
                                        style={{ borderRadius: "50%" }}
                                    >
                                        <div
                                            className={
                                                style.top100OutstandingImage
                                            }
                                            style={{
                                                backgroundImage: `url(${like.thumbnail})`,
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
                                                to={`${like.link}/${like.alias}`}
                                                onClick={() =>
                                                    handleClickLink(
                                                        like.link,
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
                                            {like.name}
                                        </div>
                                        <div>
                                            {formatFollow(like.totalFollow)} quan tâm
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )}
                        </div>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default ArtistType;
