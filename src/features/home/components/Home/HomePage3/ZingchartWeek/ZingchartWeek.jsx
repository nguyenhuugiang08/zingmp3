import clsx from 'clsx'
import { loadLink } from 'features/linkSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import styles from 'scss/ZingchartWeek.module.scss'

function ZingchartWeek({ list }) {
    const [week, setWeek] = useState([])
    const zingchartData = useSelector(state => state.zingchartData)
    const dispatch = useDispatch()

    useEffect(() => {
        if (list.length > 0) {
            setWeek(list[6].items)
        }
    }, [list])

    const classes = clsx(styles.banner)
    const linkClasses = clsx(styles.link)

    const handleClickLink = (...rest) => {
        const action = loadLink(rest)
        dispatch(action)
    }
    return (
        <div>
            <Container className='pt-5' >
                <Row xs={3} >
                    {week.map((item, index) => (
                        <Col xs={4} key={index}>
                            <Link className={linkClasses} to={zingchartData.length > 0 && `${zingchartData[0].weekChart.us.link}/${zingchartData[0].weekChart.us.playlistId}`}
                                onClick={() => handleClickLink(zingchartData[0].weekChart.us.link, 'chart')}>
                                <img className={classes} src={item.cover} alt="" />
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default ZingchartWeek