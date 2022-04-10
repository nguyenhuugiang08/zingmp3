import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import 'scss/Home1.scss'

function HomeSilder({ list }) {
    const [sliders, setLiders] = useState([])
    useEffect(() => {
        if (list.length !== 0) {
            const newList = [...list]
            const restList = newList.splice(0, 1)
            setLiders(restList)
        }
    }, [list])

    return (
        <div className='mt-5'>
            {sliders.map((slider, index) => (
                <Swiper
                    key={index}
                    slidesPerView={3}
                    spaceBetween={30}
                    slidesPerGroup={3}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {slider.items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img className='swiper-slide-image' src={item.banner} alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ))}
        </div>
    )
}

export default HomeSilder