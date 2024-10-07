import React, { useState } from 'react';
import "assets/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Nav, Navbar, ListGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function AdminDashboard() {
  const [branchName, setBranchName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [numberOfCounters, setNumberOfCounters] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const handleBranchNameChange = (event) => setBranchName(event.target.value);
  const handleLatitudeChange = (event) => setLatitude(event.target.value);
  const handleLongitudeChange = (event) => setLongitude(event.target.value);
  const handleNumberOfCountersChange = (event) => setNumberOfCounters(event.target.value);
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    dateOfBirth: '',
    address: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
          <Navbar.Brand href="admin-dashboard" style={{ color: "black" }}>Dashboard</Navbar.Brand>
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
              <Col md={6}>
                <Card className="mb-3 shadow-sm">
                  <Card.Header>Add a Location</Card.Header>
                  <Card.Body>
                    <Form onSubmit={handleSubmit}>
                      <Row className="mb-3">
                        <Col>
                          <Form.Control placeholder="Branch Name" value={branchName} onChange={handleBranchNameChange} />
                        </Col>
                        <Col>
                          <Form.Control placeholder="Latitude" value={latitude} onChange={handleLatitudeChange} />
                        </Col>
                        <Col>
                          <Form.Control placeholder="Longitude" value={longitude} onChange={handleLongitudeChange} />
                        </Col>
                        <Col>
                          <Form.Control placeholder="No. of Counters" value={numberOfCounters} onChange={handleNumberOfCountersChange} />
                        </Col>
                        <Col>
                          <Button type="submit" variant="primary" className="w-100">Save</Button>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="mb-3 shadow-sm">
                  <Card.Header className="d-flex justify-content-between">
                    Issue Categories
                    <Button variant="link">View All</Button>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="issue" className="mb-3">
                            <Form.Control placeholder="Issue" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="priority" className="mb-3">
                            <Form.Control as="select">
                              <option>Priority</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Card className="mb-3 shadow-sm">
                  <Card.Header>Add a Store</Card.Header>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col>
                          <Card className="text-center mb-4 ">
                            <Card.Body>Add Admin</Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card className="text-center mb-4">
                            <Card.Body>Add Admin</Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card className="text-center mb-4">
                            <Card.Body>Add Admin</Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="shadow-sm">
                  <Card.Header className="d-flex justify-content-between">
                    Latest Reviews
                    <Button variant="link">View All</Button>
                  </Card.Header>
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
                        </Row>
                      </ListGroup.Item>
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
                        </Row>
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
              <div className="text-center mb-3">
                {personalDetails.photo && <img src={personalDetails.photo} alt="Profile" className="img-thumbnail" />}
              </div>
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

export default AdminDashboard;
