import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Col, Container, Row } from 'reactstrap';

function Loading() {
    return (
        <div>
            <div>
                <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={434} width={'100%'} borderRadius={'8px'} />
            </div>
            <div>
                <div className='mb-3 mt-5'><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={24} width={254} borderRadius={'5px'} /></div>
                <Container>
                    <Row>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={150} borderRadius={'5px'} /></div>
                        </Col>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={150} borderRadius={'5px'} /></div>
                        </Col>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={150} borderRadius={'5px'} /></div>
                        </Col>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={150} borderRadius={'5px'} /></div>
                        </Col>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={150} borderRadius={'5px'} /></div>
                        </Col>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={150} borderRadius={'5px'} /></div>
                        </Col>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={150} borderRadius={'5px'} /></div>
                        </Col>
                        <Col className='mb-3' xs={3}>
                            <div><Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={150} borderRadius={'5px'} /></div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Loading