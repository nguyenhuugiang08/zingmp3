import { Col, Container, Row } from 'reactstrap'
import React, { useEffect, useRef, useState } from 'react'
import playlistApi from 'api/playlistApi'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from 'scss/Album.module.scss'
import { useDispatch } from 'react-redux'
import { loadCurrentSong } from 'features/top100/top100Slice'

function Anbuml() {
    const [playlist, setPlaylist] = useState({})
    const [playlistSong, setPlaylistSong] = useState({})
    const [songs, setSongs] = useState([])
    const [artist, setArtist] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        const getPlayList = async () => {
            const params = {
                id: 'ZWZB969E'
            }
            const response = await playlistApi.getAll(params)
            setPlaylist(response.data)
        }
        getPlayList()
    }, [])
    useEffect(() => {
        if (playlist.song) {
            setPlaylistSong(playlist.song)
        }
    }, [playlist])

    useEffect(() => {
        if (playlistSong.items) {
            setSongs(playlistSong.items)
        }
    }, [playlistSong])

    useEffect(() => {
        if (playlist.artists) {
            setArtist(playlist.artists)
        }
    }, [playlist])


    const handleClick = (props) => {
        const action = loadCurrentSong(props)
        dispatch(action)
        thumbRef.current.style.borderRadius = '50%'

        const thumbAnimate = thumbRef.current.animate([
            {transform: ' rotate(360deg) '}
        ], {
            duration: 10000,
            iterations: Infinity
        })

        thumbAnimate.pause()
    }

    const d = new Date()
    const thumbRef = useRef()
    return (
        <div className={styles.Album}>
            <Container>
                <Row xs={2}>
                    <Col xs={3}>
                        <div ref={thumbRef} className={styles.albumThumb} style={{ backgroundImage: `url(${playlist.thumbnailM})` }}></div>
                        <div className={styles.albumTitle}>{playlist.title}</div>
                        <div className={styles.albumTime}>Cập nhật : {d.getDate()}/{d.getMonth() + 1 > 10 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`}/{d.getFullYear()}</div>
                        <div className={styles.albumArtist}>
                            {artist.map((artist, index) => (
                                <Link key={index} className={styles.albumArtistItem} to={artist.link}>{artist.name},</Link>
                            ))}
                        </div>
                        <div className={styles.albumLike}>{playlist.like} người yêu thích</div>
                        <button className={styles.albumBtn}>
                            <FontAwesomeIcon className={styles.albumIcon} icon="fa-solid fa-play" />
                            <div>TIẾP TỤC PHÁT</div>
                        </button>
                        <div className={styles.albumAction}>
                            <div className={styles.albumActionIcon}> <FontAwesomeIcon icon="fa-regular fa-heart" /></div>
                            <div className={styles.albumActionIcon}><FontAwesomeIcon icon="fa-solid fa-ellipsis" /></div>
                        </div>
                    </Col>
                    <Col xs={9}>
                        <div className={styles.albumScroll}>
                            <div><span className={styles.albumPreface}>Lời tựa </span> {playlist.sortDescription} </div>
                            <div className={styles.albumTitleBox}>
                                <div className={styles.albumTitleLeft}>
                                    <FontAwesomeIcon icon="fa-solid fa-arrow-down-wide-short" />
                                    <span style={{ marginLeft: '10px' }}>BÀI HÁT</span></div>
                                <div className={styles.albumTitleCenter}>ALBUM</div>
                                <div className={styles.albumTitleRight}>THỜI GIAN</div>
                            </div>
                            {songs.map((song, index) => (
                                <div key={index} className={styles.albumWrapper}>
                                    <div className={styles.albumLeft}>
                                        <div className={styles.albumIconMusic}>
                                            <FontAwesomeIcon icon="fa-solid fa-music" />
                                        </div>
                                        <div className={styles.albumImagePar}
                                            onClick={() => handleClick({
                                                thumbnail: song.thumbnail,
                                                encodeId: song.encodeId,
                                                duration: song.duration,
                                                title: song.title,
                                                artists: song.artists,
                                                isPlay: true,
                                                songs: songs,
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
                                                {song.artists.map((artist, index) => (
                                                    <Link className={styles.albumArtistItem} key={index} to={artist.link}>
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

export default Anbuml