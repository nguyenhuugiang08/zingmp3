import React, { useEffect, useState } from 'react'
import { loadLink } from 'features/linkSlice'
import style from 'scss/Top100Outstanding.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap'

function PlaylistType() {
    const [single, setSingle] = useState([])
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
            setSingle(data.sections.filter(item => item.sectionType === 'playlist'))
        }
    }, [data])

    const handleClickLink = (link) => {
        const action = loadLink(link)
        dispatch(action)
    }
    return (
        <div>
            {single.map(playlist => (
                <div className={style.top100Outstanding}>
                    <div className={style.mainTitle}>
                        <div className={style.top100OutstandingTiltle}>{playlist.title}</div>
                        <Link to="/Top100">
                            <span>{'tất cả'.toUpperCase()}</span>
                            <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                        </Link>
                    </div>
                    <div className={style.top100OutstandingContainer}>
                        <Container>
                            <Row xs={5}>
                                {playlist.items.map((compo, index) => (
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
                                                            onClick={() => handleClickLink(compo.link)}
                                                        >
                                                            <FontAwesomeIcon icon="fa-solid fa-play" />
                                                        </Link>
                                                        <div>
                                                            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                                        </div>
                                                    </div>
                                                </div>
                                                {playlist.title === 'Single & EP' ?
                                                    <div>
                                                        <div className={style.top100OutstandingTitle}>
                                                            {compo.title}
                                                        </div>
                                                        <div className={style.top100OutstandingArtistItem}>
                                                            {compo.releaseDateText}
                                                        </div>
                                                    </div>
                                                    : (playlist.title === 'Tuyển tập' ?
                                                        <div>
                                                            <div className={style.top100OutstandingTitle}>
                                                                {compo.title}
                                                            </div>
                                                            <div className={style.top100OutstandingArtistItem}>
                                                                {compo.releaseDateText}
                                                            </div>
                                                        </div> :
                                                        (playlist.title === 'Xuất hiện trong' ?
                                                            <div>
                                                                <div className={style.top100OutstandingTitle}>
                                                                    {compo.title}
                                                                </div>
                                                                <div>
                                                                    <Nav>
                                                                        {compo.artists.map((artist, index) => (
                                                                            <div key={index} className={style.top100OutstandingArtist}>
                                                                                <NavItem>
                                                                                    <NavLink
                                                                                        href="#"
                                                                                        className={style.top100OutstandingArtistItem}
                                                                                    >
                                                                                        {artist.name},
                                                                                    </NavLink>
                                                                                </NavItem>
                                                                            </div>
                                                                        ))}
                                                                    </Nav>
                                                                </div>
                                                            </div> : <div>
                                                                <div className={style.top100OutstandingTitle}>
                                                                    {compo.title}
                                                                </div>
                                                                <div className={style.top100OutstandingArtistItem}>
                                                                    {compo.releaseDateText}
                                                                </div>
                                                            </div>
                                                        ))

                                                }
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

export default PlaylistType