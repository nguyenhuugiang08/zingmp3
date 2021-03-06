import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { Link } from 'react-router-dom';
import { loadLink } from 'features/linkSlice';
import { useDispatch } from 'react-redux';
import { getId } from './getidSlice';
import ConfirmPlaySong from './confirmplaysong/ConfirmPlaySong';

import "swiper/css";
import "swiper/css/navigation";
import 'scss/Home1.scss'

function HomeSilder({ data }) {
    const [sliders, setLiders] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        if (data.length !== 0) {
            setLiders(data.filter(item => item.sectionType === 'banner'))
        }
    }, [data])

    const handleClickLink = (link) => {
        const action = loadLink(link)
        dispatch(action)
    }

    const handleClick = ({ encodeId }) => {
        const action = getId(encodeId)
        dispatch(action)
        let ConfirmPlaySongElement = document.querySelector('.overlay_confirm')
        ConfirmPlaySongElement.style.display = "block"
    }

    return (
        <div className='mt-5'>
            {sliders.map((slider, index) => (
                <Swiper
                    key={index}
                    slidesPerView={3}
                    spaceBetween={30}
                    slidesPerGroup={1}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    className="mySwiper"
                >
                    {slider.items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Link
                                to={(item.type === 3 || item.type === 4) && `${item.link}/${item.encodeId}`}
                                onClick={item.type === 3 || item.type === 4 ? (() => handleClickLink(item.link)) : (item.type === 1 ? (() => handleClick({
                                    encodeId: item.encodeId
                                })) : "")}
                            > <img className='swiper-slide-image' src={item.banner} alt="" /></Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ))}
            <ConfirmPlaySong/>
        </div>
    )
}

export default HomeSilder