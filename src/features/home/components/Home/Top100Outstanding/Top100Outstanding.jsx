import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loadLink } from 'features/linkSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap'
import styles from 'scss/Top100Outstanding.module.scss'

function Top100Outstanding({ data }) {
    const [outstanding, setOutstanding] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        if (data.length > 0) {
            setOutstanding(data.filter(item => item.sectionType === 'playlist' && item.title === "Top 100")[0])
        }
    }, [data])

    const handleClickLink = (link) => {
        const action = loadLink(link)
        dispatch(action)
      }

    return (
        <div className={styles.top100Outstanding}>
            <div className={styles.mainTitle}>
                <div className={styles.top100OutstandingTiltle}>{outstanding.title}</div>
                <Link to="/Top100">
                    <span>{'tất cả'.toUpperCase()}</span>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                </Link>
            </div>
            <div className={styles.top100OutstandingContainer}>
                <Container>
                    <Row xs={5}>
                        {outstanding.items && outstanding.items.map((compo, index) => (
                            <div key={index}>
                                {index >= 5 ? <></> :
                                    <Col className={styles.top100OutstandingCol}>
                                        <div className={styles.top100OutstandingPar}>
                                            <div className={styles.top100OutstandingImage} style={{ backgroundImage: `url(${compo.thumbnail})` }}>
                                            </div>
                                            <div className={styles.top100OutstandingChild}>
                                                <div>
                                                    <FontAwesomeIcon icon="fa-regular fa-heart" />
                                                </div>
                                                <Link
                                                    className={styles.top100OutstandingPlay}
                                                    to={`${compo.link}/${compo.encodeId}`}
                                                    onClick={() => handleClickLink(compo.link)}
                                                >
                                                    <FontAwesomeIcon icon="fa-solid fa-play" />
                                                </Link>
                                                <div>
                                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.top100OutstandingTitle}>
                                            {compo.title}
                                        </div>
                                        <div>
                                            <Nav>
                                                {compo.artists.map((artist, index) => (
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
    )
}

export default Top100Outstanding