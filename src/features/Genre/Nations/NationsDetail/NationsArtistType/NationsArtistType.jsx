import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loadLink } from 'features/linkSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import style from 'scss/Top100Outstanding.module.scss';

function NationsArtistType({ data }) {
    const [list, setList] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        setList(data.sections.filter(section => section.sectionType === 'artist'))
    }, [data])

    const handleClickLink = (...rest) => {
        const action = loadLink(rest)
        dispatch(action)
    }
    return (
        <div className={`${style.top100Outstanding} mt-0`}>
            {list.map((artist, index) => (
                <div className='genre-detail-wrapper' key={index}>
                    <div className={`${style.mainTitle} `}>
                        <div className={`${style.top100OutstandingTiltle} mb-3`}>{artist.title}</div>
                    </div>
                    <Row xs={5}>
                        {artist.items.map((item, index) => (
                            <div key={item.encodeId}>
                                <Col className={style.top100OutstandingCol}>
                                    {index > 4 ? <></> :
                                        <div>
                                            <div className={style.top100OutstandingPar} style={{ borderRadius: '50%' }}>
                                                <div className={style.top100OutstandingImage} style={{ backgroundImage: `url(${item.thumbnail})`, borderRadius: '50%' }}>
                                                </div>
                                                <div className={style.top100OutstandingChild}>
                                                    <div>
                                                        <FontAwesomeIcon icon="fa-regular fa-heart" />
                                                    </div>
                                                    <Link
                                                        className={style.top100OutstandingPlay}
                                                        to={`${item.link}/${item.alias}`}
                                                        onClick={() => handleClickLink(item.link, 'artistdetail')}
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
                                                    {item.name}
                                                </div>
                                                <div>{Math.floor(item.totalFollow / 1000)}K quan tâm</div>
                                            </div>
                                        </div>
                                    }
                                </Col>
                            </div>
                        ))}
                    </Row>
                </div>
            ))}
        </div >
    )
}

export default NationsArtistType