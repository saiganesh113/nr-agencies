import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function CompleteExamples() {
  return (
    <>
      <div className="section">
        <Container className="text-center">
          <Row className="justify-content-md-center">
            <Col lg="8" md="12">
              <h2 className="title">NR Services - Instant AC Solutions</h2>
              <h5 className="description">
                NR is a platform designed to solve real-time issues related to
                booking AC mechanics for home services. The service aims to
                connect users with certified and experienced AC mechanics
                quickly and efficiently.
              </h5>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default CompleteExamples;
