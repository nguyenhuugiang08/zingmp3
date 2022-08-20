import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loadLink } from 'app/linkSlice';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import style from 'scss/Top100Outstanding.module.scss';

function ArtistType({ list }) {
    const dispatch = useDispatch();

    const handleClickLink = (...rest) => {
        const action = loadLink(rest);
        dispatch(action);
    }

    return (
        <div>
            <div className={style.top100Outstanding}>
                <div className={style.mainTitle}>
                    <div className={style.top100OutstandingTiltle}>Nghệ Sĩ/OA</div>
                </div>
                <div className={style.top100OutstandingContainer}>
                    <Container>
                        <Row xs={5}>
                            {list.map((artist, index) => (
                                <div key={index}>
                                    {index >= 5 ? <></> :
                                        <Col className={style.top100OutstandingCol}>
                                            <div className={style.top100OutstandingPar} style={{ borderRadius: '50%' }}>
                                                <div className={style.top100OutstandingImage} style={{ backgroundImage: `url(${artist.thumbnail})`, borderRadius: '50%' }}>
                                                </div>
                                                <div className={style.top100OutstandingChild}>
                                                    <div>
                                                        <FontAwesomeIcon icon="fa-regular fa-heart" />
                                                    </div>
                                                    <Link
                                                        className={style.top100OutstandingPlay}
                                                        to={`${artist.link}/${artist.alias}`}
                                                        onClick={() => handleClickLink(artist.link, 'artistdetail')}
                                                    >
                                                        <FontAwesomeIcon icon="fa-solid fa-play" />
                                                    </Link>
                                                    <div>
                                                        <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center flex-column'>
                                                <div className={style.top100OutstandingTitle}>
                                                    {artist.name}
                                                </div>
                                                <div>{Math.floor(artist.totalFollow / 1000)}K quan tâm</div>
                                            </div>
                                        </Col>
                                    }

                                </div>
                            ))}
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default ArtistType