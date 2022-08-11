import Skeleton from 'react-loading-skeleton';
import { Col, Container, Row } from 'reactstrap';

function Loading() {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    return (
        <div>
            <Container>
                <Row>
                    {list.map((item ,index)=> (
                        <Col xs={4} key={index} className='mt-3'>
                            <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={216}/>
                            <div className='d-flex justify-content-start align-items-center mt-2'>
                                <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={40} width={40} borderRadius={'50%'} /></div>
                                <div className='ms-2'>
                                    <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={12} width={120} />
                                    <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={12} width={140} />
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Loading