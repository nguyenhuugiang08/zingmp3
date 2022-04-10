import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import styles from 'scss/ZingchartWeek.module.scss'

function ZingchartWeek({ list }) {
    const [week, setWeek] = useState([])

    useEffect(() => {
        if (list.items) {
            const newList = [...list.items]
            const restList = newList.splice(1, 1)
            setWeek(restList)
        }
    }, [list])

    const classes = clsx(styles.banner)
    const linkClasses = clsx(styles.link)

    return (
        <div>
            <Container className='pt-5' >
                {week.map((item, index) => (
                    <Row xs={3} key={index}>
                        {item.items.map((banner, index) => (
                            <Col key={index} >
                                <Link className={linkClasses} to='/zingchart'>
                                    {/* <div className={classes} style={{backgroundImage: `url(${banner.banner})`}}></div> */}
                                    <img className={classes} src={banner.cover} alt="" />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                ))}
            </Container>
        </div>
    )
}

export default ZingchartWeek