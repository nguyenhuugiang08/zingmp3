import React, { useEffect, useState } from 'react'
import { loadLink } from 'features/linkSlice'
import style from 'scss/Top100Outstanding.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap'

function Artistamong() {
    const [among, setAmong] = useState([])
    const artistData = useSelector(state => state.artist)

    const dispatch = useDispatch()
    const [data, setData] = useState({})

    useEffect(() => {
        if (artistData.length > 0) {
            setData(artistData[artistData.length - 1])
        }
    }, [artistData])

    useEffect(() => {
        if (data.sections && data.sections.length > 0) {
            setAmong(data.sections[5].items)
        }
    }, [data])

    const handleClickLink = (link) => {
        const action = loadLink(link)
        dispatch(action)
    }
    return (
        <div className={style.top100Outstanding}>
            <div className={style.mainTitle}>
                <div className={style.top100OutstandingTiltle}>{data.sections && data.sections[5].title}</div>
                <Link to="/Top100">
                    <span>{'tất cả'.toUpperCase()}</span>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                </Link>
            </div>
            <div className={style.top100OutstandingContainer}>
                <Container>
                    <Row xs={5}>
                        {among.map((among, index) => (
                            <div key={index}>
                                {index >= 5 ? <></> :
                                    <Col className={style.top100OutstandingCol}>
                                        <div className={style.top100OutstandingPar}>
                                            <div className={style.top100OutstandingImage} style={{ backgroundImage: `url(${among.thumbnail})` }}>
                                            </div>
                                            <div className={style.top100OutstandingChild}>
                                                <div>
                                                    <FontAwesomeIcon icon="fa-regular fa-heart" />
                                                </div>
                                                <Link
                                                    className={style.top100OutstandingPlay}
                                                    to={`${among.link}/${among.encodeId}`}
                                                    onClick={() => handleClickLink(among.link)}
                                                >
                                                    <FontAwesomeIcon icon="fa-solid fa-play" />
                                                </Link>
                                                <div>
                                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.top100Title}>
                                            {among.title}
                                        </div>
                                        <div>
                                            <Nav>
                                                {among.artists.map((artist, index) => (
                                                    <div key={index} className={style.top100Artist}>
                                                        <NavItem>
                                                            <NavLink
                                                                href="#"
                                                                className={style.top100ArtistItem}
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

export default Artistamong