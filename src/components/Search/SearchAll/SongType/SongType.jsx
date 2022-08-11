import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loadLink } from 'features/linkSlice';
import { loadCurrentSong } from 'features/top100/top100Slice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import styles from 'scss/Album.module.scss';

function SongType({ list }) {

    const dispatch = useDispatch();

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
            <Row>
                <div className='Artist-outstanding__title'>Bài Hát</div>
                <Col xs={12}>
                    <div>
                        <div className={`${styles.Album} Artist-outstanding`}>
                            {list.map((item, index) => (
                                <div key={index} className={`${styles.albumWrapper}`} style={{ flex: '1' }}>
                                    <div className={styles.albumLeft}>
                                        <div className={styles.albumImagePar}
                                            onClick={() => handleClick({
                                                encodeId: item.encodeId,
                                                isPlay: true,
                                                songs: list,
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
                                    <Link className={styles.albumCenter}
                                        to={item.album !== undefined && `${item.album.link}/${item.album.encodeId}`}
                                        onClick={() => handleClickLink(item.album.link, 'album')}
                                    >
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

export default SongType