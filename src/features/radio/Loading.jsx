import Skeleton from 'react-loading-skeleton';
import { Col, Container, Row } from 'reactstrap';

function Loading() {
    return (
        <div>
            <Container>
                <Row xs={7} className='mt-4'>
                    <Col>
                        <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={140} width={140} borderRadius={'50%'} />
                    </Col>
                    <Col>
                        <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={140} width={140} borderRadius={'50%'} />
                    </Col>
                    <Col>
                        <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={140} width={140} borderRadius={'50%'} />
                    </Col>
                    <Col>
                        <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={140} width={140} borderRadius={'50%'} />
                    </Col>
                    <Col>
                        <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={140} width={140} borderRadius={'50%'} />
                    </Col>
                    <Col>
                        <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={140} width={140} borderRadius={'50%'} />
                    </Col>
                    <Col>
                        <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={140} width={140} borderRadius={'50%'} />
                    </Col>
                </Row>
            </Container>
            <div className='mt-5'>
                <Container>
                    <Row xs={5}>
                        <Col>
                            <div className='mb-3'>
                                <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={252} borderRadius={'8px'} />
                            </div>
                        </Col>
                        <Col>
                            <div className='mb-3'>
                                <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={252} borderRadius={'8px'} />
                            </div>
                        </Col>
                        <Col>
                            <div className='mb-3'>
                                <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={252} borderRadius={'8px'} />
                            </div>
                        </Col>
                        <Col>
                            <div className='mb-3'>
                                <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={252} borderRadius={'8px'} />
                            </div>
                        </Col>
                        <Col>
                            <div className='mb-3'>
                                <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={252} borderRadius={'8px'} />
                            </div>
                        </Col>
                        <Col>
                            <div className='mb-3'>
                                <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={252} borderRadius={'8px'} />
                            </div>
                        </Col>
                        <Col>
                            <div className='mb-3'>
                                <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={252} borderRadius={'8px'} />
                            </div>
                        </Col>
                        <Col>
                            <div className='mb-3'>
                                <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={252} borderRadius={'8px'} />
                            </div>
                        </Col>
                        <Col>
                            <div className='mb-3'>
                                <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={252} borderRadius={'8px'} />
                            </div>
                        </Col>
                        <Col>
                            <div className='mb-3'>
                                <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={252} borderRadius={'8px'} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Loading