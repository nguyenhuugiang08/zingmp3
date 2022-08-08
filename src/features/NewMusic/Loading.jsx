import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Col, Container, Row } from 'reactstrap';

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
                <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={12} width={32} borderRadius={999} />
            </div>
        </div>
    )
}

function Loading() {
    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12}>
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