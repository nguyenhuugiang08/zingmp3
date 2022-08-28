import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "scss/RadioPodcard.scss";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function RadioPostcard({ list }) {
    const [postcard, setPostcard] = useState([]);

    useEffect(() => {
        if (list.length > 0) {
            setPostcard(list.filter((item) => item.sectionType === "podcast"));
        }
    }, [list]);

    return (
        <div className='podcard mt-3'>
            {postcard.map((podcard, index) => (
                <div key={index} className='pb-4'>
                    <div className='podcard-title'>{podcard.title}</div>
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
                        {podcard.items.map((item, index) => (
                            <div key={item.encodeId}>
                                {index >= 5 ? (
                                    <></>
                                ) : (
                                    <SwiperSlide key={item.encodeId}>
                                        <Link
                                            to={"/"}
                                            className='podcard-wrapper'
                                        >
                                            <div className='podcard-wrapper-box'>
                                                <div
                                                    className='podcard-wrapper__img'
                                                    style={{
                                                        backgroundImage: `url(${item.thumbnailM})`,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className='podcard-wrapper__title mt-2'>
                                                {item.title}
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )}
                            </div>
                        ))}
                    </Swiper>
                </div>
            ))}
        </div>
    );
}

export default RadioPostcard;
