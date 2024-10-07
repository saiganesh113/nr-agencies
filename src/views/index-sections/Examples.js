import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// reactstrap components
import { Button, Container, Row } from "reactstrap";

// core components

function Examples() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/homeservices'); // Navigate to the desired route
  };
  return (
    <>
      <div className="section section-examples" data-background-color="black">
        <div className="space-50"></div>
        <Container className="text-center">
          <Row>
            <div className="col">
              <a href="examples/landing-page.html" target="_blank">
                <img
                  alt="..."
                  className="img-raised"
                  src={require("assets/img/landing.jpg")}
                ></img>
              </a>
              <Button
              className="btn-round"
              color="default"
              outline
              onClick={handleNavigate} // Trigger navigation on button click
            >
              Scheduled Services
            </Button>
            </div>
            <div className="col">
              <a href="examples/profile-page.html" target="_blank">
                <img
                  alt="..."
                  className="img-raised"
                  src={require("assets/img/profile.jpg")}
                ></img>
              </a>
              <Button
              className="btn-round"
              color="default"
              outline
              onClick={() => alert('Use WhatsApp or call for instant AC repair. Additional charges apply for urgent services.')}
            >
              Instant Services
            </Button>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Examples;