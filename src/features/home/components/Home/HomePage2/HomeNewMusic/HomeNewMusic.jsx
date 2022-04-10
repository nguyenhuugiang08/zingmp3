import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap'
import styles from 'scss/Home5.module.scss'

function HomeNewMusic({ data }) {
    const [list, setList] = useState([])

    useEffect(() => {
        if (data.items) {
            const newList = [...data.items]
            const restList = newList.splice(1, 1)
            setList(restList)
        }
    }, [data])

    return (
        <div>
            <div>
                <div className={styles.home5}>
                    {list.map((item, index) => (
                        <div key={index}>
                            <div className={styles.home5Tiltle}>{item.title}</div>
                            <div className={styles.home5Container}>
                                <Container>
                                    <Row xs={5}>
                                        {item.items.map((compo, index) => (
                                            <div key={index}>
                                                {index >= 5 ? <></> :
                                                    <Col className={styles.home5Col}>
                                                        <div className={styles.home5Par}>
                                                            <div className={styles.home5Image} style={{ backgroundImage: `url(${compo.thumbnail})` }}>
                                                            </div>
                                                            <div className={styles.home5Child}>
                                                                <div>
                                                                    <FontAwesomeIcon icon="fa-regular fa-heart" />
                                                                </div>
                                                                <Link className={styles.home5Play} to={compo.link}>
                                                                    <FontAwesomeIcon icon="fa-solid fa-play" />
                                                                </Link>
                                                                <div>
                                                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={styles.home5Title}>
                                                            {compo.title}
                                                        </div>
                                                        <div>
                                                            <Nav>
                                                                {compo.artists.map((artist, index) => (
                                                                    <div key={index} className={styles.home5Artist}>
                                                                        <NavItem>
                                                                            <NavLink
                                                                                href="#"
                                                                                className={styles.home5ArtistItem}
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
            </div>
        </div>
    )
}

export default HomeNewMusic