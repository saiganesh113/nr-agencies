import React from "react";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import Washingmachine from "./Washingmachine";

// core components

function Download() {
  return (
    <>
      <div
        className="section section-download"
        data-background-color="black"
        id="download-section"
      >
        <Container>
          <Row className="justify-content-md-center">
            <Col className="text-center" lg="8" md="12">
              <h3 className="title">NR Services</h3>
              <h5 className="description">
                NR Services is an innovative platform designed to streamline the
                process of booking professional AC mechanics for home services.
                By connecting users with certified and experienced technicians.
              </h5>
              <br />
              <Washingmachine />
             
            </Col>
            <Col className="text-center" lg="8" md="12">
              {/* <Button
                className="btn-round mr-1"
                color="info"
                href="https://www.creative-tim.com/product/now-ui-kit-react?ref=nukr-index-page"
                role="button"
                size="lg"
              >
                Download React
              </Button>
              <Button
                className="btn-round"
                color="primary"
                href="https://www.invisionapp.com/now?ref=creativetim"
                outline
                role="button"
                size="lg"
                target="_blank"
              >
                Download PSD/Sketch
              </Button> */}
            </Col>
          </Row>
          <br></br>
          <br></br>
          <br></br>
          <Row className="text-center mt-5">
            <Col className="ml-auto mr-auto" md="8">
              <h2>Want more?</h2>
              <h5 className="description">
                {/* We're going to launch{" "} */}
                <a
                  // href="http://demos.creative-tim.com/now-ui-kit-pro-react/#/presentation?ref=nukr-index-page"
                  onClick={(e) => e.preventDefault()}
                >
                  {/* Now UI Kit PRO React */}
                </a>
                NR Services ensures prompt, reliable, and efficient solutions
                for all AC-related needs. From installation to maintenance and
                repair, our platform offers a seamless experience, complete with
                real-time bookings, secure payments, and customer reviews, all
                within a user-friendly interface. Our commitment to quality and
                convenience makes NR Services the go-to solution for hassle-free
                AC servicing.
              </h5>
            </Col>
            <Col md="12">
              {/* <Button
                className="btn-neutral btn-round"
                color="default"
                href="http://creative-tim.com/product/now-ui-kit-pro-react?ref=nukr-index-page"
                size="lg"
                target="_blank"
              >
                <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                Upgrade to PRO
              </Button> */}
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row className="justify-content-md-center sharing-area text-center">
            <Col className="text-center" lg="8" md="12">
              <h3>Thank you for supporting us!</h3>
            </Col>
            <Col className="text-center" lg="8" md="12">
              <Button
                className="btn-neutral btn-icon btn-round"
                color="twitter"
                href=""
                id="tooltip86114138"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip86114138">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-neutral btn-icon btn-round"
                color="facebook"
                href=""
                id="tooltip735272548"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip735272548">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-neutral btn-icon btn-round"
                color="linkedin"
                href=""
                id="tooltip647117716"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-linkedin"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip647117716">
                Follow us
              </UncontrolledTooltip>
              <Button
  className="btn-neutral btn-icon btn-round"
  color="instagram"
  href="https://www.instagram.com/your-profile"  // Add your Instagram profile URL here
  id="tooltipInstagram"
  size="lg"
  target="_blank"
>
  <i className="fab fa-instagram"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltipInstagram">
                Follow on Instagram
              </UncontrolledTooltip>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Download;
