import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import hubDetailApi from 'api/hubDetailApi';
import { loadLink } from 'app/linkSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Col, Container, Nav, NavItem, Row } from 'reactstrap';
import styles from 'scss/Top100Outstanding.module.scss';
import 'scss/Genre.scss';
import LoadingTypeDetail from 'features/Genre/LoadingTypeDetail';

function TopicDetail() {
    const { encodeId } = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        const getHubDetil = async () => {
            try {
                const params = {
                    id: encodeId,
                }
                setLoading(true)
                const response = await hubDetailApi.getAll(params)
                setData(response.data)
                setLoading(false)
            } catch (error) {
                console.log('failed to fetch data', error)
            }
        }
        getHubDetil()
    }, [encodeId])

    const handleClickLink = (...rest) => {
        const action = loadLink(rest)
        dispatch(action)
    }

    return (
        <div>
            {loading ? <LoadingTypeDetail /> :
                <div className={`${styles.top100Outstanding} mt-0`}>
                    <div className='genre-detail-banner'>
                        <div className='genre-detail-banner__img' style={{ backgroundImage: `url(${data.cover})` }}></div>
                        <div className='genre-detail-banner__blur'></div>
                    </div>
                    {data.sections && data.sections.map(section => (
                        <div className='genre-detail-wrapper'>
                            <Container fluid>
                                <Row xs={2} md={3} lg={4} xl={5}>
                                    {section.items.map((item, index) => (
                                        <div key={item.encodeId}>
                                            <Col className={styles.top100OutstandingCol}>
                                                <div className={styles.top100OutstandingPar}>
                                                    <div className={styles.top100OutstandingImage} style={{ backgroundImage: `url(${item.thumbnail})` }}>
                                                    </div>
                                                    <div className={styles.top100OutstandingChild}>
                                                        <div>
                                                            <FontAwesomeIcon icon="fa-regular fa-heart" />
                                                        </div>
                                                        <Link
                                                            className={styles.top100OutstandingPlay}
                                                            to={`${item.link}/${item.encodeId}`}
                                                            onClick={() => handleClickLink(item.link, 'album')}
                                                        >
                                                            <FontAwesomeIcon icon="fa-solid fa-play" />
                                                        </Link>
                                                        <div>
                                                            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.top100OutstandingTitle}>
                                                    {item.title}
                                                </div>
                                                <div>
                                                    <Nav>
                                                        {item.artists && item.artists.map((artist, index) => (
                                                            <div key={index} className={styles.top100OutstandingArtist}>
                                                                <NavItem>
                                                                    <Link
                                                                        style={{ textDecoration: 'none' }}
                                                                        to={`${artist.link}/${artist.alias}`}
                                                                        onClick={() => handleClickLink(artist.link, 'artistdetail')}
                                                                        className={styles.top100OutstandingArtistItem}
                                                                    >
                                                                        {artist.name},
                                                                    </Link>
                                                                </NavItem>
                                                            </div>
                                                        ))}
                                                    </Nav>
                                                </div>
                                            </Col>
                                        </div>
                                    ))}
                                </Row>
                            </Container>
                        </div>
                    ))}
                </div >
            }
        </div>
    )
}

export default TopicDetail