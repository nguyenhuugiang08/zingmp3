import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Col, Container, Row } from 'reactstrap'

function Content({ mt }) {
    return (
        <div className={`d-flex justify-content-between align-items-center ${mt === 1 ? "" : "mt-4"} `}>
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
    )
}

function Loading() {
    return (
        <div>
            <Container>
                <Row>
                    <Col xs={3} className="d-flex justtify-contetn-center align-items-center flex-column">
                        <div> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={266} width={266} borderRadius={8} /> </div>
                        <div className='my-2'> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={20} width={240} /> </div>
                        <div> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={12} width={210} borderRadius={999} /> </div>
                        <div> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={12} width={210} borderRadius={999} /> </div>
                        <div className='mt-3'> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={34} width={174} borderRadius={999} /> </div>
                        <div className='d-flex justtify-contetn-center align-items-center mt-3'>
                            <div className='me-4'> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={35} width={35} borderRadius={'50%'} /> </div>
                            <div> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={35} width={35} borderRadius={'50%'} /> </div>
                        </div>
                    </Col>
                    <Col xs={9}>
                        <Content mt={1}/>
                        <Content />
                        <Content />
                        <Content />
                        <Content />
                        <Content />
                        <Content />
                        <Content />
                        <Content />
                        <Content />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Loading