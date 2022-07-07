import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loadLink } from 'features/linkSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap'
import styles from 'scss/Home5.module.scss'

function HomeNewMusic({ data }) {
    const [list, setList] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        if (data.length > 0) {
            setList(data[4])
        }
    }, [data])

    const handleClickLink = (link) => {
        const action = loadLink(link)
        dispatch(action)
    }
    return (
        <div>
            <div>
                <div className={styles.home5}>
                    <div className={styles.home5Tiltle}>{list.title}</div>
                    <div className={styles.home5Container}>
                        <Container>
                            <Row xs={5}>
                                {list.items && list.items.map((compo, index) => (
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
                                                        <Link
                                                            className={styles.home5Play}
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
            </div>
        </div>
    )
}

export default HomeNewMusic