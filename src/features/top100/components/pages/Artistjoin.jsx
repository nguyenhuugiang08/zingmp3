import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loadLink } from 'features/linkSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import style from 'scss/Top100Outstanding.module.scss'

function Artistjoin({ suggestPlaylist }) {
    const [artist, setrArtist] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        if (suggestPlaylist.length > 0) {
            setrArtist(suggestPlaylist.filter(item => item.sectionType === 'artist')[0])
        }
    }, [suggestPlaylist])


    const handleClickLink = (...rest) => {
        const action = loadLink(rest)
        dispatch(action)
    }

    return (
        <div className={style.top100Outstanding}>
            <div className={style.mainTitle}>
                <div className={style.top100OutstandingTiltle}>{artist.title}</div>
            </div>
            <div className={style.top100OutstandingContainer}>
                <Container>
                    <Row xs={5}>
                        {artist.items && artist.items.map((like, index) => (
                            <div key={index}>
                                {index >= 5 ? <></> :
                                    <Col className={style.top100OutstandingCol}>
                                        <div className={style.top100OutstandingPar} style={{ borderRadius: '50%' }}>
                                            <div className={style.top100OutstandingImage} style={{ backgroundImage: `url(${like.thumbnail})`, borderRadius: '50%' }}>
                                            </div>
                                            <div className={style.top100OutstandingChild}>
                                                <div>
                                                    <FontAwesomeIcon icon="fa-regular fa-heart" />
                                                </div>
                                                <Link
                                                    className={style.top100OutstandingPlay}
                                                    to={`${like.link}/${like.alias}`}
                                                    onClick={() => handleClickLink(like.link, 'artistdetail')}
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
                                                {like.name}
                                            </div>
                                            <div>{like.totalFollow > 1000 ? `${Math.floor(like.totalFollow / 1000)}K` : like.totalFollow} quan tâm</div>
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

export default Artistjoin