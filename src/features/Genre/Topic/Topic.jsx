import { loadLink } from 'features/linkSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

function Topic({ data }) {
    const [list, setList] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        setList(data.topic)
    }, [data])

    const handleClickLink = (...rest) => {
        const action = loadLink(rest)
        dispatch(action)
    }

    return (
        <div className='topic mt-5'>
            <div className='topic-title'>tâm trạng và hoạt động</div>
            <Container>
                <Row>
                    {list.map(item => (
                        <Col xs={3} key={item.encodeId} className='mb-3'>
                            <Link className='topic-wrapper'
                                to={`${item.link}/${item.encodeId}`}
                                onClick={() => handleClickLink(item.link, 'hubdetail')}
                            >
                                <div className='topic-wrapper__thumbnail'>
                                    <div className='topic-wrapper__thumbnail-img' style={{ backgroundImage: `url(${item.thumbnailHasText})` }}></div>
                                </div>
                                <div className='topic-wrapper-playlist'>
                                    {item.playlists.map(playlist => (
                                        <div key={playlist.encodeId} className='topic-wrapper-playlist__box'>
                                            <div className='topic-wrapper-playlist__box-item' style={{ backgroundImage: `url(${playlist.thumbnail})` }}></div>
                                        </div>
                                    ))}
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Topic