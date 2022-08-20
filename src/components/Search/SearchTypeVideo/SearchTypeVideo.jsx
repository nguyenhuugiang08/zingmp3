import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import searchTypeApi from 'api/searchTypeApi';
import { loadLink } from 'app/linkSlice';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Loading from './Loading';

function SearchTypeVideo({ keyword, type }) {
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
        const action = loadLink(rest)
        dispatch(action)
    }

    return (
        <div>
            <div className='mt-4 mb-3' style={{fontSize: '1.4rem', paddingLeft: '12px', fontWeight: '600'}}>MV</div>
            {loading ? <Loading/> :
                <InfiniteScroll
                    dataLength={data.length} //This is important field to render the next data
                    next={!hasMore && fetchData}
                    hasMore={true}
                    loader={hasMore ? <></> : <div className='mv-loading-more'><ReactLoading type='spinningBubbles' color='#fff' height={'4%'} width={'4%'} /></div>}
                >
                    <Container>
                        <Row >
                            {data.map(mv => (
                                <Col xs={4} className="mb-4" key={mv.encodeId}>
                                    <div className='mv-wrapper'>
                                        <div className='mv-wrapper-first'>
                                            <div className='mv-wrapper-first__img' style={{ backgroundImage: `url(${mv.thumbnailM})` }}></div>
                                            <div className='mv-wrapper-first__icon'
                                            // onClick={() => handleSendEncodeId(mv.encodeId)}
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-play" />
                                            </div>
                                        </div>
                                        <div className='mv-wrapper-second mt-2'>
                                            <div className='mv-wrapper-second__img'>
                                                <div className='mv-wrapper-second__img-thumbnail' style={{ backgroundImage: `url(${mv.artists && mv.artists[0].thumbnail})` }}></div>
                                            </div>
                                            <div className='ms-3'>
                                                <div>{mv.title}</div>
                                                <div className='mv-wrapper-second__artist'>
                                                    {mv.artists && mv.artists.map((artist, index) => (
                                                        <Link
                                                            to={`${artist.link}/${artist.alias}`}
                                                            onClick={() => handleClickLink(artist.link, 'artistdetail')}
                                                            key={artist.id}
                                                            className="me-1 mv-wrapper-second__artist-link"
                                                        >
                                                            {index > 0 ? `${artist.name}` : `${artist.name},`}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </InfiniteScroll>
            }
        </div>
    )
}

export default SearchTypeVideo