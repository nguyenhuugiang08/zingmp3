import { loadLink } from 'features/linkSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

function Nations({ data }) {
    const [list, setList] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        setList(data.nations)
    }, [data])

    const handleClickLink = (...rest) => {
        const action = loadLink(rest)
        dispatch(action)
    }

    return (
        <div className='nation'>
            <div className='nation-title'>quốc gia</div>
            <Container fluid>
                <Row>
                    {list.map(item => (
                        <Col xs={6} md={6} lg={4} xl={3} key={item.encodeId} className='mb-3'>
                            <Link className='nation-wrapper'
                                to={`${item.link}/${item.encodeId}`}
                                onClick={() => handleClickLink(item.link, 'nationdetail')}
                            >
                                <div className='nation-wrapper__thumbnail'>
                                    <div className='nation-wrapper__thumbnail-img' style={{ backgroundImage: `url(${item.thumbnail})` }}></div>
                                </div>
                                <div className='nation-wrapper-title'>
                                    {item.title}
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Nations