import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Nav, NavItem, Row } from 'reactstrap';
import style from 'scss/Top100Outstanding.module.scss';
import { loadLink } from 'app/linkSlice';

function PlaylistType({ list }) {
    const dispatch = useDispatch();

    const handleClickLink = (...rest) => {
        const action = loadLink(rest);
        dispatch(action);
    }
    
    return (
        <div className={style.top100Outstanding}>
            <div className={style.mainTitle}>
                <div className={style.top100OutstandingTiltle}>Playlist/Album</div>
                <Link to="/Top100">
                    <span>{'tất cả'.toUpperCase()}</span>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                </Link>
            </div>
            <div className={style.top100OutstandingContainer}>
                <Container>
                    <Row xs={5}>
                        {list.map((compo, index) => (
                            <div key={index}>
                                {index >= 5 ? <></> :
                                    <Col className={style.top100OutstandingCol}>
                                        <div className={style.top100OutstandingPar}>
                                            <div className={style.top100OutstandingImage} style={{ backgroundImage: `url(${compo.thumbnail})` }}>
                                            </div>
                                            <div className={style.top100OutstandingChild}>
                                                <div>
                                                    <FontAwesomeIcon icon="fa-regular fa-heart" />
                                                </div>
                                                <Link
                                                    className={style.top100OutstandingPlay}
                                                    to={`${compo.link}/${compo.encodeId}`}
                                                    onClick={() => handleClickLink(compo.link, 'album')}
                                                >
                                                    <FontAwesomeIcon icon="fa-solid fa-play" />
                                                </Link>
                                                <div>
                                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={style.top100OutstandingTitle}>
                                                {compo.title}
                                            </div>
                                            <div>
                                                <Nav>
                                                    {compo.artists && compo.artists.map((artist, index) => (
                                                        <div key={index} className={style.top100OutstandingArtist}>
                                                            <NavItem>
                                                                <Link
                                                                    to={`${artist.link}/${artist.alias}`}
                                                                    onClick={() => handleClickLink(artist.link, 'artistdetail')}
                                                                    className={style.top100OutstandingArtistItem}
                                                                    style={{ textDecoration: 'none' }}
                                                                >
                                                                    {artist.name},
                                                                </Link>
                                                            </NavItem>
                                                        </div>
                                                    ))}
                                                </Nav>
                                            </div>
                                        </div>
                                    </Col>
                                }

                            </div>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default PlaylistType