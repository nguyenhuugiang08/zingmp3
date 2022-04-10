import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap'
import styles from 'scss/Top100Outstanding.module.scss'

function Top100Outstanding({ list }) {
    const [outstanding, setOutstanding] = useState([])
    useEffect(() => {
        if (list.items) {
            const newList = [...list.items]
            const restList = newList.splice(3, 1)
            setOutstanding(restList)
        }
    }, [list])

    return (
        <div className={styles.top100Outstanding}>
            {outstanding.map((item, index) => (
                <div key={index}>
                    <div className={styles.mainTitle}>
                        <div className={styles.top100OutstandingTiltle}>{item.title}</div>
                        <Link to="/Top100">
                            <span>{'tất cả'.toUpperCase()}</span>
                            <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                        </Link>
                    </div>
                    <div className={styles.top100OutstandingContainer}>
                        <Container>
                            <Row xs={5}>
                                {item.items.map((compo, index) => (
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
                                                        <Link className={styles.top100OutstandingPlay} to="/">
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
            ))}
        </div>
    )
}

export default Top100Outstanding