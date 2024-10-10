import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
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
    
        if (!token || !techid) {
          throw new Error('Token or TechID not found. Please log in again.');
        }
    
        const response = await axios.get(`https://sreeteqs-api.onrender.com/api/auth/technician/${techid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
    
        // Accessing technician object from the response
        const techDetails = response.data.technician;
    
        if (!techDetails) {
          throw new Error('Technician details not available in response.');
        }
    
        // Update the personalDetails state with fetched data
        setPersonalDetails({
          techid: techDetails.techid || '',
          Name: techDetails.techName || '',  // Ensure you are using the correct field names
          email: techDetails.email || '',
          mobileNumber: techDetails.phone || '',
          aadharNumber: techDetails.adharnumber || '',
        });
    
      } catch (error) {
        setError(`Failed to load technician data: ${error.message}`); // More informative error
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
          const response = await axios.get(`https://sreeteqs-api.onrender.com/api/payment/users`);
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
  const handleOrderAction = async (transactionId, actionType) => {
    try {
      if (actionType === 'complete') {
        await axios.post(`https://sreeteqs-api.onrender.com/api/payment/complete/${transactionId}`);
        setCompletedOrders(prevState => [...prevState, transactionId]);
      } else if (actionType === 'cancel') {
        await axios.post(`https://sreeteqs-api.onrender.com/api/payment/cancel/${transactionId}`);
        setOrders(prevOrders => prevOrders.filter(order => order.transactionId !== transactionId));
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      setError('Failed to update order status.');
    }
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
    <>
    <style>
        {`
          .icon-button {
            background-color: transparent;
            border: none;
            align-items:center;
            margin-right: 5px; /* Adjust spacing between icons */
            color: #007bff; /* Change color as needed */
            font-size: 1.5rem; /* Adjust size as needed */
            cursor: pointer;
          }

          .icon-button:hover {
            color: #0056b3; /* Adjust hover color */
          }
        `}
    </style>
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
          {error && <p className="text-danger">{error}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : orders.length > 0 ? (
            orders.map(order => {
              const completedStyle = completedOrders.includes(order.transactionId)
                ? {
                    filter: 'blur(2px) brightness(70%)',
                    opacity: '0.7',
                    pointerEvents: 'none',
                  }
                : {};

              const handleViewLocation = (lat, lon) => {
                const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
                window.open(googleMapsUrl, '_blank'); // Opens location in a new tab
              };

              const handleCall = (mobileNumber) => {
                window.location.href = `tel:${mobileNumber}`; // Initiates a phone call
              };

              return (
                <Col xs={10} md={5} lg={5} key={order.transactionId} className="mb-3">
                  <Card style={completedStyle}>
                    <Card.Body>
                      <Card.Title>Order ID: {order.transactionId}</Card.Title>
                      <Card.Text>
                        <strong>Amount:</strong> ₹{order.amount}
                        <br />
                        <strong>User ID:</strong> {order.userid || 'Not provided'} <br />
                        <strong>User Name:</strong> {order.cart[0].username || 'Not provided'}
                        <ul>
                          {order.cart.map((item, index) => (
                            <li key={index}>
                              {item.name} - ₹{item.price}
                              <div>{item.warranty}</div>
                              <div>{item.technology}</div>
                              <div>{item.cleaning}</div>
                              <div>{item.discount}</div>
                              <div>{item.reviews}</div>
                              <div><strong>Coordinates:</strong> Lat: {item.coordinates?.lat}, Lon: {item.coordinates?.lon}</div>
                            </li>
                          ))}
                        </ul>
                        <strong>Address:</strong> {order.address || 'No address provided'}
                        <br />
                        <strong>Mobile Number:</strong> {order.cart[0].mobileNumber || 'Not provided'}
                      </Card.Text>
                      {!completedOrders.includes(order.transactionId) && (
                        <Button onClick={() => handleOrderAction(order.transactionId, 'complete')} className="icon-button">
                          <FaCheck />
                        </Button>
                      )}
                      <Button onClick={() => handleOrderAction(order.transactionId, 'cancel')} className="icon-button">
                        <FaTimes />
                      </Button>
                      <Button
                        onClick={() =>
                          handleViewLocation(order.cart[0].coordinates?.lat, order.cart[0].coordinates?.lon)
                        }
                        className="icon-button"
                      >
                        <FaMapMarkerAlt />
                      </Button>
                      <Button onClick={() => handleCall(order.cart[0].mobileNumber)} className="icon-button">
                        <FaPhoneAlt />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p>No orders available.</p>
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
    {/* Show loading spinner or message when data is being fetched */}
    {loading && <div>Loading...</div>}
    
    {/* Show error message if any error occurs */}
    {error && <div className="text-danger">{error}</div>}
    
    {/* Technician profile data */}
    {!loading && !error && (
      <form>
        <p><strong>TechID:</strong> {personalDetails.techid}</p>
        <p><strong>Name:</strong> {personalDetails.Name}</p>
        <p><strong>Email:</strong> {personalDetails.email}</p>
        <p><strong>Mobile Number:</strong> {personalDetails.mobileNumber}</p>
        <p><strong>Aadhar Number:</strong> {personalDetails.aadharNumber}</p>
      </form>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
    <Button variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  </Modal.Footer>
</Modal>
</Container>
</>
  );
};

export default TechnicianDashboard;