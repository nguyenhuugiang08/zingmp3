import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import searchTypeApi from 'api/searchTypeApi';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import styles from 'scss/Album.module.scss';
import ReactLoading from 'react-loading';
import { loadLink } from 'features/linkSlice';
import { loadCurrentSong } from 'features/top100/top100Slice';
import Loading from './Loading';
import formatTime from 'utils/formatTime';

function SearchTypeSong({ keyword, type }) {
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const getDataSearchByType = async () => {
            try {
                const params = {
                    keyword: keyword,
                    type: type,
                    page: page,
                }
                if (page === 1) {
                    setLoading(true)
                }
                const response = await searchTypeApi.getAll(params);
                if (response.data.items) {
                    const newList = [...data, ...response.data.items];
                    setData(newList);
                } else {
                    setHasMore(true)
                }
                if (response.data)
                    setLoading(false);
            } catch (error) {
                console.log('falied to fetch data', error);
            }
        }
        getDataSearchByType();
    }, [page])

    const fetchData = () => {
        setPage(prev => prev + 1);
    }

    const handleClickLink = (...rest) => {
        const action = loadLink(rest);
        dispatch(action);
    }
    const handleClick = (props) => {
        const action = loadCurrentSong(props);
        dispatch(action);
    }

    return (
        <div className='mt-4'>
            <div className='Artist-outstanding__title'>Bài Hát</div>
            {loading ? <Loading /> :
                <InfiniteScroll
                    dataLength={data.length} //This is important field to render the next data
                    next={!hasMore && fetchData}
                    hasMore={true}
                    loader={hasMore ? <></> : <div className='mv-loading-more'><ReactLoading type='spinningBubbles' color='#fff' height={'4%'} width={'4%'} /></div>}
                >
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <div>
                                    <div className={`${styles.Album} Artist-outstanding`}>
                                        {data.map((item, index) => (
                                            <div key={index} className={`${styles.albumWrapper}`} style={{ flex: '1' }}>
                                                <div className={styles.albumLeft}>
                                                    <div className={styles.albumImagePar}
                                                        onClick={() => handleClick({
                                                            encodeId: item.encodeId,
                                                            isPlay: true,
                                                            songs: data,
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
                                                    {formatTime(item.duration)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </InfiniteScroll>
            }
        </div>
    )
}

export default SearchTypeSong