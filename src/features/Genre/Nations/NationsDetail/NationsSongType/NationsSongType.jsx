import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import styles from 'scss/Album.module.scss'
import { loadCurrentSong } from 'app/currentSongSilce'
import { loadLink } from 'app/linkSlice'
import formatTime from 'utils/formatTime'

function NationsSongType({ data }) {
    const dispatch = useDispatch()

    const [list, setList] = useState([])

    useEffect(() => {
        setList(data.sections.filter(item => item.sectionType === 'song'))
    }, [data])

    const handleClick = (props) => {
        const action = loadCurrentSong(props)
        dispatch(action)
    }

    const handleClickLink = (...rest) => {
        const action = loadLink(rest)
        dispatch(action)
    }

    return (
        <div style={{ color: '#fff' }}>
            {list.map((song, index) => (
                <Row key={index}>
                    <div className='Artist-outstanding__title'>{song.title}</div>
                    {song.items.map((item, index) => (
                        <Col xs={12} md={6} lg={4}>
                            <div className={`${styles.Album} py-0`} style={{ borderRadius: '5px', overflow: 'hidden' }}>
                                <div key={item.encodeId} className={`${styles.albumWrapper} hot-song`} >
                                    <div className={styles.albumLeft} style={{ flex: '1' }}>
                                        <div className={styles.albumImagePar}
                                            onClick={() => handleClick({
                                                encodeId: item.encodeId,
                                                isPlay: true,
                                                songs: song.items,
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
                                            <div className='new-release__song-info__title'>{item.title}
                                                {!item.isWorldWide ? <div className='new-release__song-vip' >
                                                    <div className='new-release__song-vip__icon' style={{ backgroundImage: `url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.7.8/static/media/vip-label.3dd6ac7e.svg)` }}></div>
                                                </div> : <></>}
                                            </div>
                                            <div className={styles.albumSongArtist}>
                                                {item.artists !== undefined && item.artists.map((artist, index) => (
                                                    <Link className={styles.albumArtistItem} key={artist.id}
                                                        to={`${artist.link}/${artist.alias}`}
                                                        onClick={() => handleClickLink(artist.link, 'artistdetail')}
                                                    >
                                                        {index < item.artists.length - 1 ? `${artist.name},` : `${artist.name}`}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.albumRight} chart-right genre-duration`}>
                                        {formatTime(item.duration)}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            ))
            }

        </div >
    )
}

export default NationsSongType