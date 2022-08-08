import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Col, Container, Row } from 'reactstrap';

function LoadingTypeDetail() {
    return (
        <div>
            <div>
                <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={434} width={'100%'} borderRadius={'8px'} />
            </div>
            <div className='mt-5'>
                <Container>
                    <Row>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={244} borderRadius={'5px'} /></div>
                        </Col>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={244} borderRadius={'5px'} /></div>
                        </Col>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={244} borderRadius={'5px'} /></div>
                        </Col>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={244} borderRadius={'5px'} /></div>
                        </Col>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={244} borderRadius={'5px'} /></div>
                        </Col>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={244} borderRadius={'5px'} /></div>
                        </Col>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={244} borderRadius={'5px'} /></div>
                        </Col>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={244} borderRadius={'5px'} /></div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default LoadingTypeDetail