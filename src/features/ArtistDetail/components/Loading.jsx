import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Col, Container, Row } from 'reactstrap'

const list = [1, 2, 3, 4, 5]

function Loading() {
  return (
    <div>
      <Container>
        <Row>
          <Col xs={7}>
            <div ><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={80} width={652} borderRadius={8} /></div>
            <div className='mt-2'><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={12} width={652} borderRadius={3} /></div>
            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={12} width={652} borderRadius={3} /></div>
            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={12} width={652} borderRadius={3} /></div>
            <div className='d-flex justify-content-start'>
              <div className='me-5'><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={36} width={100} borderRadius={5} /></div>
              <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={36} width={100} borderRadius={5} /></div>
            </div>
          </Col>
          <Col xs={5}>
            <div className='d-flex justify-content-end'><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={260} width={260} borderRadius={'50%'} /></div>
          </Col>
          <div className='my-4'><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={32} width={700} borderRadius={5} /></div>
        </Row>
        <Row>
          <Col xs={3}>
            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={264} width={264} borderRadius={8} /></div>
          </Col>
          <Col xs={9}>
            {list.map((item, index) => (
              <div className={`d-flex justify-content-between align-items-center mb-2`} key={index} >
                <div className='d-flex'>
                  <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={40} width={40} borderRadius={8} /></div>
                  <div className='ms-2'>
                    <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={12} width={270} borderRadius={999} /></div>
                    <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={12} width={240} borderRadius={999} /></div>
                  </div>
                </div>
                <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={12} width={100} borderRadius={999} /></div>
                <div className='d-flex'>
                  <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={20} width={20} borderRadius={'50%'} />
                  <Skeleton className='ms-2' baseColor='#231B2E' highlightColor='#231B2E' height={20} width={20} borderRadius={'50%'} />
                  <Skeleton className='ms-2' baseColor='#231B2E' highlightColor='#231B2E' height={20} width={20} borderRadius={'50%'} />
                  <Skeleton className='ms-2' baseColor='#231B2E' highlightColor='#231B2E' height={20} width={20} borderRadius={'50%'} />
                </div>
              </div>
            ))}
            )
          </Col>
        </Row>
        <Row xs={5} className='pb-5'>
          <Col>
            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={222} width={216} borderRadius={8} /></div>
          </Col>
          <Col>
            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={222} width={216} borderRadius={8} /></div>
          </Col>
          <Col>
            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={222} width={216} borderRadius={8} /></div>
          </Col>
          <Col>
            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={222} width={216} borderRadius={8} /></div>
          </Col>
          <Col>
            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={222} width={216} borderRadius={8} /></div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Loading