import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import styles from 'scss/Home5.module.scss'


function HomeXnor({ list }) {
    const [chooses, setChooses] = useState([])
    useEffect(() => {
        if (list.length !== 0) {
            const newList = [...list]
            const restList = newList.splice(4, 1)
            setChooses(restList)
        }
    }, [list])
    return (
        <div>
            <div className={styles.home5}>
                {chooses.map((item, index) => (
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
                ))}
            </div>
        </div>
    )
}

export default HomeXnor