import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Navbar, ListGroup, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "assets/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function Admincalender() {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    const [personalDetails, setPersonalDetails] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        dateOfBirth: '',
        address: '',
      });
    
      const handleProfileClick = () => setShowModal(true);
    
      const handleCloseModal = () => {
        setShowModal(false);
        setEditMode(false);
      };
    
      const handleEdit = () => setEditMode(true);
    
      const handleSave = () => {
        setEditMode(false);
        setShowModal(false);
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalDetails({
          ...personalDetails,
          [name]: value
        });
      };

      const handleLogout = () => {
        localStorage.removeItem('superAdminToken');
        localStorage.removeItem('role');
        navigate('/Sreeteq/kingdev376/superadmin/login'); // Redirect to login
      };
      
  return (
    <div className="App">
      <Navbar bg="light" expand="lg" className="shadow-sm reduced-navbar">
        <Container>
          <Navbar.Brand href="admin-dashboard" style={{ color: "black" }}>Calender</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <span className="navbar-text" style={{ color: "black" }}>Good Morning, Mr. Admin</span>
            </Nav>
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Link href="#notifications" style={{ color: "black" }}>Send Notifications</Nav.Link>
              <Nav.Link href="#profile" className="d-flex align-items-center" style={{ color: "black" }}>
                <Button variant="link" onClick={handleProfileClick}>
                  <FontAwesomeIcon icon={faUserCircle} size="2x" />
                </Button>
                <span className="ms-2" style={{ color: "black" }}>S.Admin</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="mt-3">
        <Row>
        <Col md={2} className="sidebar bg-primary text-white">
            <Nav defaultActiveKey="/Sreeteq/kingdev376/superadmin/admin-dashboard" className="flex-column">
              <Nav.Link as={Link} to="/Sreeteq/kingdev376/superadmin/admin-dashboard" className="text-white">
                <i className="bi bi-house-door-fill"></i> Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/Sreeteq/kingdev376/superadmin/admin-calender" className="text-white">
                <i className="bi bi-calendar2-event-fill"></i> Calendar
              </Nav.Link>
              <Nav.Link as={Link} to="/Sreeteq/kingdev376/superadmin/admin-chat" className="text-white">
                <i className="bi bi-chat-dots-fill"></i> Chat
              </Nav.Link>
              <Nav.Link as={Link} to="/Sreeteq/kingdev376/superadmin/admin-performance" className="text-white">
                <i className="bi bi-bar-chart-fill"></i> Performance
              </Nav.Link>
              <Nav.Link as={Link} to="/Sreeteq/kingdev376/superadmin/admin-settings" className="text-white">
                <i className="bi bi-gear-fill"></i> Settings
              </Nav.Link>
              <Nav.Link as={Link} to="/Sreeteq/kingdev376/superadmin/login" className="text-white">
                <i className="bi bi-box-arrow-right"></i> Logout
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={10} className="main-content">
          <Row>
              <Col md={8}>
                <Card className="mb-3 shadow-sm">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <span>Visits for Today</span>
                    <Button variant="link">Send Notifications</Button>
                  </Card.Header>
                  <Card.Body>
                    <h2>32</h2>
                    <Row>
                      <Col>
                        <Card>
                          <Card.Body>
                            <h6>Latest Schedules</h6>
                            <p>02</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col>
                        <Card>
                          <Card.Body>
                            <h6>No Arrivals</h6>
                            <p>01</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-3 shadow-sm">
                  <Card.Header>Calendar</Card.Header>
                  <Card.Body>
                    <div className="calendar-placeholder">Calendar goes here</div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <Card className="mb-3 shadow-sm">
                  <Card.Header>Latest Reviews</Card.Header>
                  <Card.Body>
                    <ListGroup>
                      <ListGroup.Item>
                        <Row>
                          <Col md={1} className="d-flex align-items-center">
                            <i className="bi bi-person-circle"></i>
                          </Col>
                          <Col md={8}>
                            <h6>Sam Marvel</h6>
                            <p className="mb-0">Mobile: +973 (835) 892-9723</p>
                            <p className="mb-0">Service Details: Add-on Provided <a href="#">#2020035-005</a></p>
                          </Col>
                          <Col md={3} className="d-flex align-items-center justify-content-end">
                            <Button variant="outline-primary">Details</Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col md={1} className="d-flex align-items-center">
                            <i className="bi bi-person-circle"></i>
                          </Col>
                          <Col md={8}>
                            <h6>John Doe</h6>
                            <p className="mb-0">Mobile: +973 (165) 102-5700</p>
                            <p className="mb-0">Service Details: Add-on Provided <a href="#">#2020023-005</a></p>
                          </Col>
                          <Col md={3} className="d-flex align-items-center justify-content-end">
                            <Button variant="outline-primary">Details</Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="shadow-sm">
                  <Card.Header>Today's Appointments</Card.Header>
                  <Card.Body>
                    <ListGroup>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center bg-success text-white">
                        <span>Sam Marvel</span>
                        <span>09:15 AM</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center bg-info text-white">
                        <span>Abdul Rafi</span>
                        <span>10:00 AM</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center bg-danger text-white">
                        <span>Fathima Begum</span>
                        <span>10:45 AM</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center bg-warning text-white">
                        <span>Naboo Qhanna</span>
                        <span>11:30 AM</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center bg-primary text-white">
                        <span>Farah Valiji</span>
                        <span>12:15 PM</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center bg-secondary text-white">
                        <span>Sam Marvel</span>
                        <span>01:00 PM</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {editMode ? (
                <Form>
                <Form.Group controlId="firstName" className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" value={personalDetails.firstName} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="lastName" className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" value={personalDetails.lastName} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="mobileNumber" className="mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" name="mobileNumber" value={personalDetails.mobileNumber} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={personalDetails.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="dateOfBirth" className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" name="dateOfBirth" value={personalDetails.dateOfBirth} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="address" className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={personalDetails.address} onChange={handleChange} />
                </Form.Group>
                </Form>
            ) : (
                <div>
                <p><strong>First Name:</strong> {personalDetails.firstName}</p>
                <p><strong>Last Name:</strong> {personalDetails.lastName}</p>
                <p><strong>Mobile Number:</strong> {personalDetails.mobileNumber}</p>
                <p><strong>Email:</strong> {personalDetails.email}</p>
                <p><strong>Date of Birth:</strong> {personalDetails.dateOfBirth}</p>
                <p><strong>Address:</strong> {personalDetails.address}</p>
                </div>
            )}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleLogout} className="me-auto">
                Logout
            </Button>
            {editMode ? (
                <Button variant="primary" onClick={handleSave}>
                Save
                </Button>
            ) : (
                <Button variant="secondary" onClick={handleEdit}>
                Edit
                </Button>
            )}
            <Button variant="secondary" onClick={handleCloseModal}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
}

export default Admincalender;
