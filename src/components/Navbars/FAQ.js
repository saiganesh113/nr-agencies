import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';

const FAQ = () => {
  const [activeKey, setActiveKey] = useState('0');

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h2>Frequently Asked Questions</h2>
          <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
            <Card>
              <Card.Header>
                <Accordion.Header eventKey="0">
                What if I require to reschedule or cancel my booking?
                </Accordion.Header>
              </Card.Header>
              <Accordion.Body>
                Sree Teq understands that plans can alter. You can effectively reschedule or cancel your booking through our app or site. We give adaptability to alter your benefit as required without any hassle.
              </Accordion.Body>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Header eventKey="1">
                  How can I book AC service & AC repair with Sree Teq?
                </Accordion.Header>
              </Card.Header>
              <Accordion.Body>
                Booking your AC Service & Repair with Sree Teq is simple and easy. You can do it through our app or website. Just select the service you require, select a helpful time space, and we'll dole out a talented proficient to take care of your AC needs.
              </Accordion.Body>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Header eventKey="2">
                  How can I reach Sree Teq customer support team if I have any questions or concerns?
                </Accordion.Header>
              </Card.Header>
              <Accordion.Body>
              NR Offices is continuously here to offer assistance. You can reach our back group through our app or website.
              </Accordion.Body>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Header eventKey="3">
                  Are there any guarantee given for the services?
                </Accordion.Header>
              </Card.Header>
              <Accordion.Body>
                Yes, we assure a 30-day warranty on all our AC services.
              </Accordion.Body>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Header eventKey="4">
                  Can I request the same proficient for future services?
                </Accordion.Header>
              </Card.Header>
              <Accordion.Body>
                Yes, Sree Teq allows you to request the same proficient for future services if you're fulfilled with their work. We get it the significance of building believe and compatibility with our customers.
              </Accordion.Body>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Header eventKey="5">
                  How are the experts at Sree Teq trained?
                </Accordion.Header>
              </Card.Header>
              <Accordion.Body>
              Our experts experience thorough preparing and certification programs to guarantee they have the fundamental abilities and knowledge.
              </Accordion.Body>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Header eventKey="6">
                  How does the pricing of AC Services work?
                </Accordion.Header>
              </Card.Header>
              <Accordion.Body>
              The estimating for AC services shifts based on the sort of benefit (establishment, support, repair), the sort of AC unit, area, and extra costs like parts and labor.
              </Accordion.Body>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Header eventKey="7">
                  Can I believe the experts sent by Sree Teq?
                </Accordion.Header>
              </Card.Header>
              <Accordion.Body>
                Absolutely! All our experts are foundation confirmed, and our stage gives full protections scope. You can communicate specifically with the alloted proficient through our app for included peace of intellect.
              </Accordion.Body>
            </Card>
          </Accordion>
        </div>
        <div className="col-md-4">
          <br />
          <h5>AC Repair & Service Near Me</h5>
          <p>Find AC, Fridge and washing Machine Repair & Service near you.</p>
          <h5>You are here</h5>
          <p>Home / AC, Fridge and washing Machine Repair & Service</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;