import React, { useEffect, useState } from 'react'
import { loadLink } from 'features/linkSlice'
import style from 'scss/Top100Outstanding.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Container, Row } from 'reactstrap'
import { Autoplay, Navigation } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'

function ArtistMv() {
    const [mv, setMv] = useState([])
    const artistData = useSelector(state => state.artist)

    const dispatch = useDispatch()
    const [data, setData] = useState({})

    useEffect(() => {
        if (artistData.length > 0) {
            setData(artistData[artistData.length - 1])
        }
    }, [artistData])

    useEffect(() => {
        if (data.sections && data.sections.length > 0) {
            setMv(data.sections[3].items)
        }
    }, [data])

    const handleClickLink = (link) => {
        const action = loadLink(link)
        dispatch(action)
    }
    return (
        <div className={style.top100Outstanding}>
            <div className={style.mainTitle}>
                <div className={style.top100OutstandingTiltle}>{data.sections && data.sections[3].title}</div>
                <Link to="/Top100">
                    <span>{'tất cả'.toUpperCase()}</span>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                </Link>
            </div>
            <div className={style.top100OutstandingContainer}>
                <Swiper
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
                    {mv.map((mv, index) => (
                        <SwiperSlide key={index}>
                            <div className={style.top100OutstandingCol}>
                                <div className={style.top100OutstandingPar}>
                                    <div className={style.top100OutstandingMv} style={{ backgroundImage: `url(${mv.thumbnail})` }}>
                                    </div>
                                    <div className={style.top100OutstandingChild}>
                                        <Link
                                            className={style.top100OutstandingPlay}
                                            to={`${mv.link}/${mv.encodeId}`}
                                            onClick={() => handleClickLink(mv.link)}
                                        >
                                            <FontAwesomeIcon icon="fa-solid fa-play" />
                                        </Link>
                                    </div>
                                </div>
                                <div className=' d-flex justify-content-start align-items-center mt-1'>
                                    <div style={{width: '40px', height: '40px',position:'relative', top: '3px'}}>
                                        <div className={style.top100OutstandingMvImg} style={{ backgroundImage: `url(${mv.artist.thumbnail})` }}></div>
                                    </div>
                                    <div className='ms-2'>
                                        <div className={style.top100OutstandingTitle}>
                                            {mv.title}
                                        </div>
                                        <div className={`${style.top100OutstandingArtistItem}`}>{mv.artistsNames}</div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* {mv.map((mv, index) => (
                    <div key={index}>
                        {index >= 4 ? <></> :
                            <Col className={style.top100OutstandingCol}>
                                <div className={style.top100OutstandingPar}>
                                    <div className={style.top100OutstandingImage} style={{ backgroundImage: `url(${mv.thumbnailM})` }}>
                                    </div>
                                    <div className={style.top100OutstandingChild}>
                                        <Link
                                            className={style.top100OutstandingPlay}
                                            to={`${mv.link}/${mv.encodeId}`}
                                            onClick={() => handleClickLink(mv.link)}
                                        >
                                            <FontAwesomeIcon icon="fa-solid fa-play" />
                                        </Link>
                                    </div>
                                </div>
                                <div className={style.top100OutstandingTitle}>
                                    {mv.title}
                                </div>
                                <div className={style.top100OutstandingArtistItem}>
                                    {mv.releaseDateText}
                                </div>
                            </Col>
                        }
                    </div>
                ))} */}
            </div>
        </div>
    )
}

export default ArtistMv