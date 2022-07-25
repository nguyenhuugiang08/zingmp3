import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loadLink } from 'features/linkSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Nav, NavItem, Row, NavLink } from 'reactstrap'
import styles from 'scss/Top100Outstanding.module.scss'

function PlaylistSuggest({ suggestPlaylist }) {
    const [playlists, setPlaylists] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (suggestPlaylist.length > 0) {
            setPlaylists(suggestPlaylist.filter(item => item.sectionType === 'playlist'))
        }
    }, [suggestPlaylist])


    const handleClickLink = (link) => {
        const action = loadLink(link)
        dispatch(action)
    }

    return (
        <div className={styles.top100Outstanding}>
            {playlists.map((playlist, index) => (
                <div key={index}>
                    <div className={styles.mainTitle}>
                        <div className={styles.top100OutstandingTiltle}>{playlist.title}</div>
                    </div>
                    <div className={styles.top100OutstandingContainer}>
                        <Container>
                            <Row xs={5}>
                                {playlist.items.map((item, index) => (
                                    <div key={index}>
                                        {index >= 5 ? <></> :
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
                                                            onClick={() => handleClickLink(item.link)}
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
                                                        {item.artists.map((artist, index) => (
                                                            <div key={index} className={styles.top100OutstandingArtist}>
                                                                <NavItem>
                                                                    <NavLink
                                                                        href="#"
                                                                        className={styles.top100OutstandingArtistItem}
                                                                    >
                                                                        {artist.name},
                                                                    </NavLink>
                                                                </NavItem>
                                                            </div>
                                                        ))}
                                                    </Nav>
                                                </div>
                                            </Col>
                                        }
                                    </div>
                                ))}
                            </Row>
                        </Container>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PlaylistSuggest