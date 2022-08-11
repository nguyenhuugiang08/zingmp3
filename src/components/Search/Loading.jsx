import Skeleton from 'react-loading-skeleton';
import { Col, Container, Row } from 'reactstrap';

const list = [1, 2, 3, 4, 5]

function Loading() {
  return (
    <div className='mt-5'>
      <Container>
        <Row>
          <Col xs={12}>
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