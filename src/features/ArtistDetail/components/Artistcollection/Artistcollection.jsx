import React, { useEffect, useState } from 'react'
import { loadLink } from 'features/linkSlice'
import style from 'scss/Top100Outstanding.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Container, Row } from 'reactstrap'

function Artistcollection() {
    const [collcetion, setCollection] = useState([])
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
            setCollection(data.sections[4].items)
        }
    }, [data])

    const handleClickLink = (link) => {
        const action = loadLink(link)
        dispatch(action)
    }
    return (
        <div className={style.top100Outstanding}>
            <div className={style.mainTitle}>
                <div className={style.top100OutstandingTiltle}>{data.sections && data.sections[4].title}</div>
                <Link to="/Top100">
                    <span>{'tất cả'.toUpperCase()}</span>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                </Link>
            </div>
            <div className={style.top100OutstandingContainer}>
                <Container>
                    <Row xs={5}>
                        {collcetion.map((collection, index) => (
                            <div key={index}>
                                {index >= 5 ? <></> :
                                    <Col className={style.top100OutstandingCol}>
                                        <div className={style.top100OutstandingPar}>
                                            <div className={style.top100OutstandingImage} style={{ backgroundImage: `url(${collection.thumbnail})` }}>
                                            </div>
                                            <div className={style.top100OutstandingChild}>
                                                <div>
                                                    <FontAwesomeIcon icon="fa-regular fa-heart" />
                                                </div>
                                                <Link
                                                    className={style.top100OutstandingPlay}
                                                    to={`${collection.link}/${collection.encodeId}`}
                                                    onClick={() => handleClickLink(collection.link)}
                                                >
                                                    <FontAwesomeIcon icon="fa-solid fa-play" />
                                                </Link>
                                                <div>
                                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.top100OutstandingTitle}>
                                            {collection.title}
                                        </div>
                                        <div className={style.top100OutstandingArtistItem}>
                                            {collection.releaseDateText}
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

export default Artistcollection