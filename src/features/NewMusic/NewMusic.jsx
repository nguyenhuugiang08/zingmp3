import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import styles from 'scss/Album.module.scss';
import { loadCurrentSong } from 'features/top100/top100Slice';
import { useDispatch } from 'react-redux';
import { loadLink } from 'features/linkSlice';
import releaseChartApi from 'api/releaseChartApi';

function NewMusic() {
    const [data, setData] = useState([])

    useEffect(() => {
        const getReleaseData = async () => {
            try {
                const response = await releaseChartApi.getAll()
                setData(response.data.items)
            } catch (error) {
                console.log('falied to fetch data', error)
            }
        }
        getReleaseData()
    }, [])
    

    const dispatch = useDispatch()

    //xử lý load bài hát khi ấn vào thumbnail bài hát
    const handleClick = (props) => {
        const action = loadCurrentSong(props)
        dispatch(action)
    }

    //xử lý chuyển trang artist detail
    const handleClickLink = (...rest) => {
        const action = loadLink(rest)
        dispatch(action)
    }

    return (
        <div className={styles.Album}>
            <Container>
                <Row>
                    <Col xs={12}>
                        <div>
                            {data.map((song, index) => (
                                <div key={index} className={`${styles.albumWrapper}`} style={{ flex: '1' }}>
                                    <div className={styles.albumLeft}>
                                        <div className={`zingchart_count ${index === 0 ? 'zingchart_count--active_one' :
                                            (index === 1 ? 'zingchart_count--active_two' : (index === 2 ? 'zingchart_count--active_three' : ''))}`}>{index + 1}</div>
                                        <div>{song.rakingStatus === 0 ? <FontAwesomeIcon icon="fa-solid fa-minus" /> : (song.rakingStatus > 0 ?
                                            <div className='zingchart_raking'><FontAwesomeIcon icon="fa-solid fa-caret-up" style={{ color: '#1dc186' }} /> {song.rakingStatus}</div> :
                                            <div className='zingchart_raking'><FontAwesomeIcon icon="fa-solid fa-caret-down" style={{ color: '#e35050' }} /> {song.rakingStatus * -1}</div>
                                        )}</div>
                                        <div className={styles.albumImagePar}
                                            onClick={() => handleClick({
                                                encodeId: song.encodeId,
                                                isPlay: true,
                                                songs: data,
                                                index: index
                                            })}
                                        >
                                            <img className={styles.albumImage} src={song.thumbnail} alt="" />
                                            <div
                                                className={styles.albumIconChild}
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-play" />
                                            </div>
                                        </div>
                                        <div className={styles.albumArtistMain}>
                                            <div>{song.title}</div>
                                            <div className={styles.albumSongArtist}>
                                                {song.artists !== undefined && song.artists.map((artist, index) => (
                                                    <Link className={styles.albumArtistItem} key={index}
                                                        to={`${artist.link}/${artist.alias}`}
                                                        onClick={() => handleClickLink(artist.link, 'artistdetail')}
                                                    >
                                                        {index > 0 ? `, ${artist.name}` : artist.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <Link className={styles.albumCenter} to={song.album !== undefined && song.album.link}>
                                        {song.album !== undefined && song.album.title}
                                    </Link>
                                    <div className={styles.albumRight}>
                                        {Math.floor(song.duration / 60) >= 10 ?
                                            Math.floor(song.duration / 60) :
                                            `0${Math.floor(song.duration / 60)}`
                                        }:
                                        {song.duration % 60 >= 10 ? song.duration % 60 : `0${song.duration % 60}`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default NewMusic