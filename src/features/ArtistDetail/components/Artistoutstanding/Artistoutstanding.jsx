import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import { Autoplay, Pagination } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'
import styles from 'scss/Album.module.scss'
import { loadCurrentSong } from 'features/top100/top100Slice'

function Artistoutstanding() {
    const artistData = useSelector(state => state.artist)
    const dispatch = useDispatch()

    const [data, setData] = useState({})
    const [outstanding, setOutstanding] = useState([])

    useEffect(() => {
        if (artistData.length > 0) {
            setData(artistData[artistData.length - 1])
        }
    }, [artistData])

    useEffect(() => {
        if (data.sections && data.sections.length > 0) {
            setOutstanding(data.sections[0].items)
        }
    }, [data])

    const handleClick = (props) => {
        const action = loadCurrentSong(props)
        dispatch(action)
    }

    return (
        <div style={{ color: '#fff' }}>
            <Row>
                <div className='Artist-outstanding__title'>{data.sections && data.sections[0].title}</div>
                <Col xs={3}>
                    <Swiper
                        slidesPerView={1}
                        slidesPerGroup={1}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        pagination={true}
                        modules={[Autoplay, Pagination]}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false
                        }}
                        className="mySwiper"
                    >
                        {outstanding.map((outstanding, index) => (
                            <SwiperSlide key={index}>
                                <img className='Artist-outstanding__title-img' src={outstanding.thumbnailM} alt="" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Col>
                <Col xs={9}>
                    <div className='Artist-outstanding__scroll'>
                        <div className={`${styles.Album} Artist-outstanding`}>
                            {outstanding.map((item, index) => (
                                <div key={index} className={`${styles.albumWrapper}`} style={{ flex: '1' }}>
                                    <div className={styles.albumLeft}>
                                        <div className={styles.albumImagePar}
                                            onClick={() => handleClick({
                                                encodeId: item.encodeId,
                                                isPlay: true,
                                                songs: outstanding,
                                                index: index
                                            })}
                                        >
                                            <img className={styles.albumImage} src={item.thumbnail} alt="" />
                                            <div
                                                className={styles.albumIconChild}
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-play" />
                                            </div>
                                        </div>
                                        <div className={styles.albumArtistMain}>
                                            <div>{item.title}</div>
                                            <div className={styles.albumSongArtist}>
                                                {item.artists !== undefined && item.artists.map((artist, index) => (
                                                    <Link className={styles.albumArtistItem} key={index} to={artist.link}>
                                                        {index > 0 ? `, ${artist.name}` : artist.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <Link className={styles.albumCenter} to={item.album !== undefined && item.album.link}>
                                        {item.album !== undefined && item.album.title}
                                    </Link>
                                    <div className={styles.albumRight}>
                                        {Math.floor(item.duration / 60) >= 10 ?
                                            Math.floor(item.duration / 60) :
                                            `0${Math.floor(item.duration / 60)}`
                                        }:
                                        {item.duration % 60 >= 10 ? item.duration % 60 : `0${item.duration % 60}`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Artistoutstanding