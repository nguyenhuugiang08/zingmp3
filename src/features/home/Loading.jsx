import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Col, Container, Row } from "reactstrap";

const LoadingItem = ({ prop }) => {
  return (
    <>
      {prop === 1 ? (
        <>
          <div>
            <Skeleton
              baseColor="#231B2E"
              highlightColor="#231B2E"
              height={208}
            />
          </div>
          <div>
            <Skeleton
              baseColor="#231B2E"
              highlightColor="#231B2E"
              height={32}
            />
          </div>
          <div>
            <Skeleton
              baseColor="#231B2E"
              highlightColor="#231B2E"
              height={42}
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <Skeleton
              baseColor="#231B2E"
              highlightColor="#231B2E"
              height={184}
            />
          </div>
          <div>
            <Skeleton
              baseColor="#231B2E"
              highlightColor="#231B2E"
              height={32}
            />
          </div>
        </>
      )}
    </>
  );
};

function Loading() {
  return (
    <div>
      <Container fluid>
        <Row xs={1} md={2} lg={3}>
          <Col>
            <Skeleton
              baseColor="#231B2E"
              highlightColor="#231B2E"
              height={210}
            />
          </Col>
          <Col>
            <Skeleton
              baseColor="#231B2E"
              highlightColor="#231B2E"
              height={210}
            />
          </Col>
          <Col>
            <Skeleton
              baseColor="#231B2E"
              highlightColor="#231B2E"
              height={210}
            />
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row xs={6} className="mt-3">
          <Col>
            <LoadingItem />
          </Col>
          <Col>
            <LoadingItem />
          </Col>
          <Col>
            <LoadingItem />
          </Col>
          <Col>
            <LoadingItem />
          </Col>
          <Col>
            <LoadingItem />
          </Col>
          <Col>
            <LoadingItem />
          </Col>
        </Row>
        <div>
          <Skeleton
            baseColor="#231B2E"
            highlightColor="#231B2E"
            height={32}
            width={100}
          />
        </div>
        <Row xs={2} md={3} lg={4} xl={5} className="mt-3">
          <Col>
            <LoadingItem prop={1} />
          </Col>
          <Col>
            <LoadingItem prop={1} />
          </Col>
          <Col>
            <LoadingItem prop={1} />
          </Col>
          <Col>
            <LoadingItem prop={1} />
          </Col>
          <Col>
            <LoadingItem prop={1} />
          </Col>
        </Row>
        <Row xs={2} md={3} lg={4} xl={5} className="mt-3">
          <Col>
            <LoadingItem prop={1} />
          </Col>
          <Col>
            <LoadingItem prop={1} />
          </Col>
          <Col>
            <LoadingItem prop={1} />
          </Col>
          <Col>
            <LoadingItem prop={1} />
          </Col>
          <Col>
            <LoadingItem prop={1} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Loading;
