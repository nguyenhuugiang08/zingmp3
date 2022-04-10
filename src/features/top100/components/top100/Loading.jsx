import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Col, Container, Row } from 'reactstrap'

function Loading() {
    const LoadingItem = () => {
        return (
            <>
                <div> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={208} /> </div>
                <div> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={32} /> </div>
                <div> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={42} /> </div>
            </>
        )
    }
    return (
        <div>
            <div>
                <div> <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={260} /> </div>
            </div>
            <Container>
                <Row xs={5} className='mt-3'>
                    <Col> <LoadingItem /> </Col>
                    <Col> <LoadingItem /> </Col>
                    <Col> <LoadingItem /> </Col>
                    <Col> <LoadingItem /> </Col>
                    <Col> <LoadingItem /> </Col>
                </Row>
                <div>
                    <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={32} width={100} />
                </div>
                <Row xs={5} className='mt-3'>
                    <Col> <LoadingItem /> </Col>
                    <Col> <LoadingItem /> </Col>
                    <Col> <LoadingItem /> </Col>
                    <Col> <LoadingItem /> </Col>
                    <Col> <LoadingItem /> </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Loading