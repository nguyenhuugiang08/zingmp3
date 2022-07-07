import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Navigation } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'
import styles from 'scss/Artist.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadLink } from 'features/linkSlice'

function Artist({ list }) {
    const [artists, setArtist] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (list.length > 0) {
            setArtist(list[7].items)
        }
    }, [list])

    const classes = clsx(styles.artistThumb)

    const handleClickLink = (...rest) => {
        const action = loadLink(rest)
        dispatch(action)
    }

    return (
        <div className='mt-5'>
            <Swiper
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
                    artists.map((artist, index) => (
                        <SwiperSlide key={index}>
                            <Link to={`${artist.link}/${artist.alias}`}
                                onClick={() => handleClickLink(
                                    artist.link,
                                    'artistdetail'
                                )}
                            >
                                <img className={classes} src={artist.thumbnail} alt="" />
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default Artist