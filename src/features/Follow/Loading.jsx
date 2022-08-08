import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Masonry from 'react-masonry-css';
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
                <div>
                    <Masonry
                        breakpointCols={3}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        <div className='mb-3'> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={400} borderRadius={'8px'} /> </div>
                        <div className='mb-3'> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={420} borderRadius={'8px'}/> </div>
                        <div className='mb-3'> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={372} borderRadius={'8px'}/> </div>
                        <div className='mb-3'> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={333} borderRadius={'8px'}/> </div>
                        <div className='mb-3'> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={208} borderRadius={'8px'}/> </div>
                        <div className='mb-3'> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={234} borderRadius={'8px'}/> </div>
                    </Masonry>
                </div>
            </div>
        </div>
    )
}

export default Loading