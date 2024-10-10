import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Nav, Navbar, Button, Modal, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "assets/css/bootstrap.min.css";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {
    NavItem,
    NavLink,
    TabContent,
    TabPane,
  } from "reactstrap";
import axios from 'axios'; // Ensure axios is installed and imported

const Adminperformance = () => {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [personalDetails, setPersonalDetails] = useState({});
    const [users, setUsers] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();
    const [pills, setPills] = useState("1");

  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const userResponse = await axios.get('https://sreeteqs-api.onrender.com/api/auth/users');
            setUsers(userResponse.data.users);
      
            const technicianResponse = await axios.get('https://sreeteqs-api.onrender.com/api/auth/technicians');
            setTechnicians(technicianResponse.data.technicians);
      
            const paymentResponse = await axios.get('https://sreeteqs-api.onrender.com/api/payment/users');
            setPayments(paymentResponse.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);

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
                    <Navbar.Brand href="admin-dashboard" style={{ color: "black" }}>Performance</Navbar.Brand>
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
                <Col md={10}>
                    {/* Add additional tables or displays for users, technicians, and payments */}
                    <Container className="mt-2">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={pills === "1" ? "active" : ""}
                                    href="#user"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPills("1");
                                    }}
                                >
                                    <i className="fas fa-user"></i> <b>User Details</b>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={pills === "2" ? "active" : ""}
                                    href="#technician"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPills("2");
                                    }}
                                >
                                    <i className="fas fa-wrench"></i> <b>Technician Details</b>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={pills === "3" ? "active" : ""}
                                    href="#payments"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPills("3");
                                    }}
                                >
                                    <i className="fas fa-credit-card"></i> <b>Payment Details</b>
                                </NavLink>
                            </NavItem>
                        </Nav>

                        <TabContent activeTab={"pills" + pills}>
                            <TabPane tabId="pills1">
                                <h3>User Details</h3>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>User Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(users) && users.map(user => (
                                            <tr key={user._id}>
                                                <td>{user.userid}</td>
                                                <td>{user.Name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </TabPane>

                            <TabPane tabId="pills2">
                                <h3>Technician Details</h3>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Tech ID</th>
                                            <th>Tech Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Aadhar Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(technicians) && technicians.map(technician => (
                                            <tr key={technician._id}>
                                                <td>{technician.techid}</td>
                                                <td>{technician.techName}</td>
                                                <td>{technician.email}</td>
                                                <td>{technician.phone}</td>
                                                <td>{technician.adharnumber}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </TabPane>

                            <TabPane tabId="pills3">
                                <h3>Payment Details</h3>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Payment ID</th>
                                            <th>User ID</th>
                                            <th>Mobile Number</th>
                                            <th>Amount</th>
                                            <th>Date</th>
                                            <th>Payment Status</th>
                                            <th>Address</th>
                                            <th>Cart Items</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(payments) && payments.map(payment => (
                                            <tr key={payment._id}>
                                                <td>{payment.transactionId}</td>
                                                <td>{payment.userid}</td>
                                                <td>{Array.isArray(payment.cart) ? payment.cart.map(item => item.mobileNumber).join(', ') : 'N/A'}</td>
                                                <td>{payment.amount}</td>
                                                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                                                <td>{payment.paymentStatus}</td>
                                                <td>{payment.address}</td>
                                                <td>{Array.isArray(payment.cart) ? payment.cart.map(item => item.name).join(', ') : 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </TabPane>
                        </TabContent>
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

export default Adminperformance;
