import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Card, Badge, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle, faHome, faClipboardList, faCalendarAlt, faChartLine, faSignOutAlt, faBorderAll, faBorderStyle } from '@fortawesome/free-solid-svg-icons';
import 'assets/css/bootstrap.min.css';
import moment from 'moment';
import ChartComponent from './ChartComponent'; // Import the chart component
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Bar } from 'react-chartjs-2';
import PieChart from './piechart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TechnicianDashboard = ({techid, userId }) => {
  const [location, setLocation] = useState('Fetching location...');
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [completedOrders, setCompletedOrders] = useState([]);

  const [personalDetails, setPersonalDetails] = useState({
    techid: '',
    Name: '',
    email: '',
    mobileNumber: '',
    aadharNumber: '',
    panNumber: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  useEffect(() => {
    const loadTechnicianData = async () => {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('tech_token'); // Retrieve token
        const techid = localStorage.getItem('tech_id');   // Retrieve tech_id
        console.log('Fetching technician data with techid:', techid); // Debugging log

        if (!techid) {
          throw new Error('TechID not found.');
        }

        const response = await axios.get(`https://nr-agencies-project-api.onrender.com/api/auth/technician/${techid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('API response data:', response.data); // Log the response

        const techDetails = response.data.technician; // Access the nested 'technician' object

        if (!techDetails) {
          throw new Error('Technician details not available.');
        }

        // Update the personalDetails state with fetched data
        setPersonalDetails({
          techid: techDetails.techid || '',
          Name: techDetails.Name || '',
          email: techDetails.email || '',
          mobileNumber: techDetails.phone || '',
          aadharNumber: techDetails.adharnumber || '',
          panNumber: techDetails.pancard || ''
        });

      } catch (error) {
        console.error('Failed to load technician data:', error);
        setError('Failed to load technician data.');
      } finally {
        setLoading(false);
      }
    };

    // Load technician data on component mount
    loadTechnicianData();
  }, []);
  

  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    if (activeSection === 'orders') {
      const fetchOrders = async () => {
        try {
          const response = await axios.get('https://nr-agencies-project-api.onrender.com/api/payment/users');
          console.log('Orders response:', response.data); // Log the response data
          setOrders(response.data.data || []); // Use response.data.data instead of response.data
        } catch (error) {
          console.error('Error fetching orders:', error);
          setOrders([]); // Set orders to an empty array on error
        }
      };
  
      fetchOrders();
    }
  }, [activeSection]);

  // Define the handleOrderAction function
  const handleOrderAction = (orderId, action) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.transactionId === orderId
          ? { ...order, allowed: action === 'complete' } // Assuming you use 'complete' action to mark as completed
          : order
      )
    );
  };

  useEffect(() => {
    setSchedules([
      { date: moment().add(1, 'day').format('YYYY-MM-DD'), tasks: 3 }, // Example: 3 tasks scheduled for tomorrow
      { date: moment().add(2, 'day').format('YYYY-MM-DD'), tasks: 2 } // Example: 2 tasks scheduled for the day after tomorrow
    ]);
  }, []);

  const earnings = 200000;
  const workCompletionRate = 75;
  const acAndInvoices = 25;
  const customerRating = 4.5;
  const acService = 10; // example value
  const washingMachineService = 5; // example value
  const timeCommitment = 20;

  useEffect(() => {
    // Simulate fetching notifications
    setNotifications([
      { id: 1, message: 'New job assigned' },
      { id: 2, message: 'Job review received' },
    ]);

    // Fetch the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
        },
        (error) => {
          setLocation('Location not available');
        }
      );
    } else {
      setLocation('Geolocation not supported');
    }
  }, []);

  const handleProfileClick = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSectionChange = (section) => setActiveSection(section);


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const selectedDateTasks = schedules.find(schedule => schedule.date === moment(selectedDate).format('YYYY-MM-DD'))?.tasks || 0;

  const chartData = {
    labels: ['AC Services', 'Washing Machine Services'],
    datasets: [
      {
        label: 'Services Completed',
        data: [acService, washingMachineService],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)']
      }
    ]
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication-related data
    localStorage.removeItem('tech_token');
    localStorage.removeItem('tech_id');
    navigate('/login'); // Redirect to login page
  };

  return (
    <Container fluid className="mobile-dashboard p-0">
      <Row className="header d-flex justify-content-between align-items-center py-3 mx-0">
        <Col xs={3} className="d-flex align-items-center">
          <Button variant="link" onClick={handleProfileClick}>
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          </Button>
        </Col>
        <Col xs={6} className="d-flex align-items-center text-center">
          <span>{location}</span>
        </Col>
        <Col xs={3} className="text-right">
          <Button variant="link" onClick={() => console.log('Show notifications')}>
            <FontAwesomeIcon icon={faBell} size="2x" />
            <Badge bg="secondary">{notifications.length}</Badge>
          </Button>
        </Col>
      </Row>

      {activeSection === 'dashboard' && (
      <Container fluid className="px-2 py-3">
          <Row className="my-3">
          <Col className="d-flex justify-content-center">
          <div style={{ width: '50%'}}>
            <PieChart
              acService={acService}
              washingMachineService={washingMachineService}
              workCompletionRate={workCompletionRate}
              customerRating={customerRating}
              timeCommitment={timeCommitment}
            />
          </div>
        </Col>
      </Row>
        
            <Row>
              <Col>
                <Card className="text-center mb-3">
                  <Card.Body>
                    <Card.Title className="display-4">${earnings.toLocaleString()}</Card.Title>
                    <Card.Text>Total Earnings</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
        
            <Row>
              <Col xs={12} >
                <Card className="text-center mb-3">
                  <Card.Body>
                    <Card.Title>Work Completion Rate</Card.Title>
                    <Card.Text>{workCompletionRate}%</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12}>
                <Card className="text-center mb-3">
                  <Card.Body>
                    <Card.Title>AC & Invoices</Card.Title>
                    <Card.Text>{acAndInvoices}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12}>
                <Card className="text-center mb-3">
                  <Card.Body>
                    <Card.Title>Customer Rating</Card.Title>
                    <Card.Text>{customerRating} / 5</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
      )}

    {activeSection === 'orders' && (
    <Row className="my-3 justify-content-center">
        {error && <p className="text-danger">{error}</p>} {/* Show error if any */}
        {loading ? (
        <p>Loading...</p> // Show loading indicator while fetching orders
        ) : orders.length > 0 ? (
        orders.map(order => (
            <Col xs={10} md={5} lg={5} key={order.transactionId} className="mb-3"> {/* Adjust column size for different screen sizes */}
            <Card>
                <Card.Body>
                <Card.Title>Order ID: {order.transactionId}</Card.Title>
                <Card.Text>
                    <strong>Amount:</strong> ₹{order.amount}
                    <ul>
                    {order.cart.map((item, index) => (
                        <li key={index}>
                        {item.name} - ₹{item.price}
                        <div>{item.warranty}</div>
                        <div>{item.technology}</div>
                        <div>{item.cleaning}</div>
                        <div>{item.discount}</div>
                        <div>{item.reviews}</div>
                        </li>
                    ))}
                    </ul>
                    <strong>Address:</strong> {order.address || 'No address provided'}
                    <br />
                </Card.Text>
                {!completedOrders.includes(order.transactionId) && (
                    <Button onClick={() => handleOrderAction(order.transactionId, 'complete')}>
                    Mark as Completed
                    </Button>
                )}
                <Button onClick={() => handleOrderAction(order.transactionId, 'cancel')}>
                    Cancel Order
                </Button>
                </Card.Body>
            </Card>
            </Col>
        ))
        ) : (
        <p>No orders available.</p> // Show this if there are no orders
        )}
    </Row>
    )}

      {activeSection === 'schedules' && (
        <Row>
          <Col xs={10} md={10} className="mx-auto">
            <Card className="text-center mb-3">
              <Card.Body>
                <Card.Title>Schedules</Card.Title>
                <div className="d-flex justify-content-center">
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="text-center mb-3"
                  />
                </div>
                <Card.Text style={{ border: '1px solid #ccc', padding: '10px', fontSize: 'medium' }}>
                  <strong>Tasks on {moment(selectedDate).format('MMMM Do, YYYY')}:</strong> {selectedDateTasks}
                </Card.Text>
                <Bar data={chartData} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {activeSection === 'performance' && (
        <Row className="my-3">
        <Col>
          <ChartComponent 
            data={{
              acService,
              washingMachineService,
              timeCommitment,
              workCompletionRate,
              customerRating
            }} 
          />
        </Col>
      </Row> 
      )}

    <Row className="menu-bar fixed bottom-0 w-100 mx-0 d-flex justify-content-around align-items-center">
        <Col className="text-center p-0">
            <Button variant="link" onClick={() => handleSectionChange('dashboard')}>
            <FontAwesomeIcon icon={faHome} />
            <span className="d-block">Dashboard</span>
            </Button>
        </Col>
        <Col className="text-center p-0">
            <Button variant="link" onClick={() => handleSectionChange('orders')}>
            <FontAwesomeIcon icon={faClipboardList} />
            <span className="d-block">Orders</span>
            </Button>
        </Col>
        <Col className="text-center p-0">
            <Button variant="link" onClick={() => handleSectionChange('schedules')}>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span className="d-block">Schedules</span>
            </Button>
        </Col>
        <Col className="text-center p-0">
            <Button variant="link" onClick={() => handleSectionChange('performance')}>
            <FontAwesomeIcon icon={faChartLine} />
            <span className="d-block">Performance</span>
            </Button>
        </Col>
    </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Technician Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <form>
          <p>TechID: {personalDetails.techid}</p>
          <p>Name: {personalDetails.Name}</p>
          <p>Email: {personalDetails.email}</p>
          <p>Mobile Number: {personalDetails.mobileNumber}</p>
          <p>Aadhar Number: {personalDetails.aadharNumber}</p>
          <p>PAN Number: {personalDetails.panNumber}</p>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal}>Close</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </Modal.Footer>
    </Modal>

    </Container>
  );
};

export default TechnicianDashboard;
