import React, { useState } from 'react';
import "assets/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Nav, Navbar, Modal } from 'react-bootstrap';
import { faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight, faAlignJustify, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Adminmailbox = () => {
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
        console.log('Personal Details Saved:', personalDetails);
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
          <Navbar.Brand href="admin-dashboard" style={{ color: "black" }}>Mailbox</Navbar.Brand>
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
              <Nav.Link as={Link} to="/Sreeteq/kingdev376/superadmin/Sreeteq/kingdev376/superadmin/login" className="text-white">
                <i className="bi bi-box-arrow-right"></i> Logout
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={10}>
            <Container fluid className="app-container">
              <Row className="toolbar mb-3">
                <Col className="toolbar-icons d-flex justify-content-start">
                  <Button variant="outline-secondary"><FontAwesomeIcon icon={faBold} /></Button>
                  <Button variant="outline-secondary"><FontAwesomeIcon icon={faItalic} /></Button>
                  <Button variant="outline-secondary"><FontAwesomeIcon icon={faUnderline} /></Button>
                  <Button variant="outline-secondary"><FontAwesomeIcon icon={faAlignLeft} /></Button>
                  <Button variant="outline-secondary"><FontAwesomeIcon icon={faAlignCenter} /></Button>
                  <Button variant="outline-secondary"><FontAwesomeIcon icon={faAlignRight} /></Button>
                  <Button variant="outline-secondary"><FontAwesomeIcon icon={faAlignJustify} /></Button>
                  <Button variant="outline-secondary"><FontAwesomeIcon icon={faPaperclip} /></Button>
                  <Button variant="outline-secondary"><FontAwesomeIcon icon={faPaperPlane} /></Button>
                </Col>
              </Row>
              <Row className="main-content">
                <Col>
                  <Form className="email-form">
                    <Form.Group controlId="formTo">
                      <Form.Label>To</Form.Label>
                      <Form.Control type="email" placeholder="Enter recipient email" />
                    </Form.Group>
                    <Form.Group controlId="formCc">
                      <Form.Label>Cc</Form.Label>
                      <Form.Control type="email" placeholder="Enter Cc email" />
                    </Form.Group>
                    <Form.Group controlId="formBcc">
                      <Form.Label>Bcc</Form.Label>
                      <Form.Control type="email" placeholder="Enter Bcc email" />
                    </Form.Group>
                    <Form.Group controlId="formSubject">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control type="text" placeholder="Enter subject" />
                    </Form.Group>
                    <Form.Group controlId="formMessage">
                      <Form.Label>Compose</Form.Label>
                      <Form.Control as="textarea" rows={5} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                      Send
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>
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
        </Row>
      </Container>
    </div>
  );
}

export default Adminmailbox;
