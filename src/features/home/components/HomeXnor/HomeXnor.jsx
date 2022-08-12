import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import styles from 'scss/Home5.module.scss'
import { useDispatch } from 'react-redux'
import { loadLink } from 'features/linkSlice'


function HomeXnor({ data }) {
    const [chooses, setChooses] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        if (data.length > 0) {
            setChooses(data.filter(item => item.sectionType === 'playlist' && item.title === "XONE's CORNER")[0])
        }
    }, [data])


    const handleClickLink = (...rest) => {
        const action = loadLink(rest)
        dispatch(action)
    }
    return (
        <div>
            <div className={styles.home5}>
                <div>
                    <div className={styles.home5Tiltle}>{chooses.title}</div>
                    <div className={styles.home5Container}>
                        <Container fluid>
                            <Row xs={2} md={3} lg={4} xl={5}>
                                {chooses.items && chooses.items.map((compo, index) => (
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
                                                            onClick={() => handleClickLink(compo.link, 'album')}
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
                                                <div className={styles.home5SortDescription}>
                                                    {compo.sortDescription}
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

export default HomeXnor