import React, { useState } from 'react';
import { Container, Row, Col, ListGroup,Button,Modal,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "assets/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Adminsettings = () => {
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
          <Navbar.Brand href="admin-dashboard" style={{ color: "black" }}>Settings</Navbar.Brand>
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
            <Container fluid className="p-4">
              <Row className="mt-4">
                <Col md={10}>
                  <ListGroup>
                    <ListGroup.Item action>Theme</ListGroup.Item><br/>
                    <ListGroup.Item action>Account</ListGroup.Item> <br/>
                    <ListGroup.Item action>Privacy</ListGroup.Item><br/>
                    <ListGroup.Item action>Security</ListGroup.Item><br/>
                    <ListGroup.Item action>Help</ListGroup.Item><br/>
                    <ListGroup.Item action>Others</ListGroup.Item><br/>
                  </ListGroup>
                </Col>
              </Row>
            </Container>
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
};

export default Adminsettings;
