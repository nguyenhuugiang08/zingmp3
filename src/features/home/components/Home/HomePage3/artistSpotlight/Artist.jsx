import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Navigation } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'
import styles from 'scss/Artist.module.scss'

function Artist({ list }) {
    const [artists, setArtist] = useState([])

    useEffect(() => {
        if (list.itmes) {
            const newList = [...list.items]
            const restList = newList.splice(2, 1)
            setArtist(restList)
        }
    }, [list])

    const classes = clsx(styles.artistThumb)

    return (
        <div className='mt-5'>
            {artists.map((item, index) => (
                <Swiper
                    key={index}
                    slidesPerView={7}
                    spaceBetween={30}
                    slidesPerGroup={1}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {
                        item.items.map((artist, index) => (
                            <SwiperSlide key={index}>
                                <img className={classes} src={artist.thumbnail} alt="" />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ))}
        </div>
    )
}

export default Artist