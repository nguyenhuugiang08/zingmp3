import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import 'scss/RadioPodcard.scss'

function RadioPostcard({ list }) {
  const [postcard, setPostcard] = useState([])

  useEffect(() => {
    if (list.length > 0) {
      setPostcard(list.filter(item => item.sectionType === 'podcast'))
    }
  }, [list])

  return (
    <div className='podcard'>
      {postcard.map((podcard, index) => (
        <div key={index}>
          <div className='podcard-title'>{podcard.title}</div>
          <Container fluid>
            <Row xs={2} md={3} lg={4} xl={5}>
              {podcard.items.map((item, index) => (
                <div key={item.encodeId}>
                  {index >= 5 ? <></> :
                    <Col className='mb-4'>
                      <Link to={'/'} className='podcard-wrapper'>
                        <div className='podcard-wrapper-box'>
                          <div className='podcard-wrapper__img' style={{ backgroundImage: `url(${item.thumbnailM})` }}></div>
                        </div>
                        <div className='podcard-wrapper__title mt-2'>{item.title}</div>
                      </Link>
                    </Col>
                  }
                </div>
              ))}
            </Row>
          </Container>
        </div>
      ))}
    </div>
  )
}

export default RadioPostcard