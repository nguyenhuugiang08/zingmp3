import Skeleton from "react-loading-skeleton"
import { Col, Container, Row } from "reactstrap"

function Loading() {
    return (
        <div className='mt-3'>
            <Container>
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