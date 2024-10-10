import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Corrected import

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate(); // Corrected use of navigate

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const fetchData = async () => {
    try {
      const [
        servicesResponse,
        repairsResponse,
        installationsResponse,
        notificationsResponse,
      ] = await Promise.all([
        axios.get('https://nr-agencies-0-api.onrender.com/api/services'),
        axios.get('https://nr-agencies-0-api.onrender.com/api/repairs'),
        axios.get('https://nr-agencies-0-api.onrender.com/api/installations'),
        axios.get('https://nr-agencies-0-api.onrender.com/api/notifications'),
      ]);

      setServices(servicesResponse.data);
      setRepairs(repairsResponse.data);
      setInstallations(installationsResponse.data);
      setNotifications(notificationsResponse.data);

      setAllItems([
        ...servicesResponse.data,
        ...repairsResponse.data,
        ...installationsResponse.data,
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
const [wrepairs, setWrepairs] = useState([]); 
const [winstallations, setWinstallations] = useState([]);
const [wuninstallations, setWuninstallations] = useState([]);

useEffect(() => {
  const fetchWashRepairs = async () => {
    try {
      const response = await axios.get('https://sreeteqs-api.onrender.com/api/wrepairs');
      setWrepairs(response.data); // Set the repair services from the backend
    } catch (error) {
      console.error('Error fetching repairs:', error);
    }
  };

  const fetchWashInstallations = async () => {
    try {
      const response = await axios.get('https://sreeteqs-api.onrender.com/api/winstallations');
      setWinstallations(response.data); // Set the installation services from the backend
    } catch (error) {
      console.error('Error fetching installations:', error);
    }
  };

  const fetchWashUninstallations = async () => {
    try {
      const response = await axios.get('https://sreeteqs-api.onrender.com/api/wuninstallations');
      setWuninstallations(response.data); // Set the uninstallation services from the backend
    } catch (error) {
      console.error('Error fetching uninstallations:', error);
    }
  };

  // Call all fetch functions
  fetchWashRepairs();
  fetchWashInstallations();
  fetchWashUninstallations();
}, []);


  // State for storing fridge data fetched from the backend
  const [singleDoors, setSingleDoors] = useState([]);
  const [doubleDoors, setDoubleDoors] = useState([]);
  const [sideBySideDoors, setSideBySideDoors] = useState([]);

    // Function to handle booking confirmation 

  useEffect(() => {
    const fetchFridgeData = async () => {
      try {
        const [singleResponse, doubleResponse, sideResponse] = await Promise.all([
          axios.get('https://sreeteqs-api.onrender.com/api/singledoor'),
          axios.get('https://sreeteqs-api.onrender.com/api/doubledoor'),
          axios.get('https://sreeteqs-api.onrender.com/api/sidedoor'),
        ]);
        setSingleDoors(singleResponse.data);
        setDoubleDoors(doubleResponse.data);
        setSideBySideDoors(sideResponse.data);
      } catch (error) {
        console.error('Error fetching fridge data:', error);
      }
    };

    fetchFridgeData();
  }, []);


  return (
    <>

      {/* Floating Menu Bar */}
      <div className="container mt-5">
      <div className="floating-menu-container">
      <div className="menu-button-container">
        <button
          className="btn btn-primary floating-menu"
          id="menuButton"
          onClick={toggleMenu}
        >
          Menu
        </button>
      </div>
      <div className={`floating-menu-bar ${menuOpen ? 'show' : ''}`}>
        <Link
          to="service-section"
          smooth={true}
          duration={500}
          className="menu-option"
          onClick={toggleMenu}
        >
          AC
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            className="ms-2"
          >
            <path d="M2 12h20M5 12l-3 3h3v3h2v-3h2v3h2v-3h2v3h2v-3h3l-3-3" />
            <path d="M4 4h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          </svg>
        </Link>
        <Link
          to="repair-section"
          smooth={true}
          duration={500}
          className="menu-option"
          onClick={toggleMenu}
        >
          Machine
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            className="ms-2"
          >
            <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
            <circle cx="12" cy="12" r="4" />
            <path d="M7 8h10v8H7z" />
          </svg>
        </Link>
        <Link
          to="install-section"
          smooth={true}
          duration={500}
          className="menu-option"
          onClick={toggleMenu}
        >
          Fridge
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            className="ms-2"
          >
            <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
            <path d="M6 2v20" />
            <path d="M18 2v20" />
            <path d="M6 8h12v12H6z" />
          </svg>
        </Link>
      </div>
    </div>
      {/* Service Section */}
      <div id="service-section" className="d-flex justify-content-between align-items-center mb-2">
        <h2 style={{ fontSize: '2.5rem' }}>AC Service</h2>
        <a href="#service-section" className="text-primary">Know more</a>
      </div>
      <h3>Services</h3>
      <div className="row">
        {services.map((service) => (
          <div className="col-md-6 mb-4" key={service.id}>
            <div className="card h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                {/* Text Section */}
                <div>
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text">Type: {service.type}</p>
                  <p className="card-text">Price: ₹{service.price}</p>
                  <p className="card-text">Discount: {service.discount}</p>
                  <div className="d-flex align-items-center mb-2">
                    <svg width="16" height="16" fill="#07794C">
                      <path d="M2 2.5a2.5 2.5 0 015 0V4h2V2.5a2.5 2.5 0 015 0V4h1.25A2.75 2.75 0 0118 6.75v10.5A2.75 2.75 0 0115.25 20H2.75A2.75 2.75 0 010 17.25V6.75A2.75 2.75 0 012.75 4H4V2.5zm3 0a1 1 0 10-2 0V4h2V2.5zm8 0a1 1 0 10-2 0V4h2V2.5zM2.75 6a.75.75 0 00-.75.75V17.25c0 .414.336.75.75.75h12.5a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75H2.75z" />
                    </svg>
                    <p className="mb-0 ms-2">{service.technology}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <svg width="16" height="16" fill="#07794C">
                      <path d="M7.25 4h-2.5v-.5A.75.75 0 003 4v.5H2.25A2.25 2.25 0 000 6.75v6A2.25 2.25 0 002.25 15h7.5A2.25 2.25 0 0012 12.75v-6A2.25 2.25 0 009.75 4H9V2.25A2.25 2.25 0 006.75 0h-1.5A2.25 2.25 0 003 2.25V4zm1-1.75a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25V4h-2V2.25zM1.5 6.75a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75V9H1.5V6.75zM1.5 10h9v2.75a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V10zm3.25 1.25a.25.25 0 00-.25.25v.5a.25.25 0 00.25.25h2.5a.25.25 0 00.25-.25v-.5a.25.25 0 00-.25-.25h-2.5z" />
                    </svg>
                    <p className="mb-0 ms-2">Warranty: {service.warranty}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                  <Button
  style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
  onClick={() => {
    // Redirect to login page
    navigate('/login'); // Update this to '/signup' if you want to go to the signup page
  }}
>
  Add to Cart
</Button>

                    <span className="text-muted">Estimated Time: {service.time}</span>
                  </div>
                </div>

                {/* Image Section */}
                <img
                  src={`${process.env.PUBLIC_URL}${service.image}`}
                  alt={service.name}
                  style={{ height: '250px', width: '200px', objectFit: 'cover', marginLeft: '20px' }}
                />
              </div>
              <div className="card-footer text-center bg-light p-2">
                <large className="text-muted">Price: ₹{service.price}</large>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br/>

        {/* Repair Section */}
        <h3>Repairs</h3>
        <div className="row">
          {repairs.map((repair) => (
            <div className="col-md-6 mb-4" key={repair.id}>
              <div className="card h-100">
                <div className="card-body d-flex align-items-center justify-content-between">
                  {/* Text Section */}
                  <div>
                    <h5 className="card-title">{repair.name}</h5>
                    <p className="card-text">Type: {repair.type}</p>
                    <p className="card-text">Price: ₹{repair.price}</p>
                    <p className="card-text">Discount: ₹{repair.discount}</p>
                    <div className="d-flex align-items-center mb-2">
                      <svg width="16" height="16" fill="#07794C">
                        <path d="M2 2.5a2.5 2.5 0 015 0V4h2V2.5a2.5 2.5 0 015 0V4h1.25A2.75 2.75 0 0118 6.75v10.5A2.75 2.75 0 0115.25 20H2.75A2.75 2.75 0 010 17.25V6.75A2.75 2.75 0 012.75 4H4V2.5zm3 0a1 1 0 10-2 0V4h2V2.5zm8 0a1 1 0 10-2 0V4h2V2.5zM2.75 6a.75.75 0 00-.75.75V17.25c0 .414.336.75.75.75h12.5a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75H2.75z" />
                      </svg>
                      <p className="mb-0 ms-2">{repair.technology}</p>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <svg width="16" height="16" fill="#07794C">
                        <path d="M7.25 4h-2.5v-.5A.75.75 0 003 4v.5H2.25A2.25 2.25 0 000 6.75v6A2.25 2.25 0 002.25 15h7.5A2.25 2.25 0 0012 12.75v-6A2.25 2.25 0 009.75 4H9V2.25A2.25 2.25 0 006.75 0h-1.5A2.25 2.25 0 003 2.25V4zm1-1.75a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25V4h-2V2.25zM1.5 6.75a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75V9H1.5V6.75zM1.5 10h9v2.75a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V10zm3.25 1.25a.25.25 0 00-.25.25v.5a.25.25 0 00.25.25h2.5a.25.25 0 00.25-.25v-.5a.25.25 0 00-.25-.25h-2.5z" />
                      </svg>
                      <p className="mb-0 ms-2">Warranty: {repair.warranty}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                    <Button
  style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
  onClick={() => {
    // Redirect to login page
    navigate('/login'); // Update this to '/signup' if you want to go to the signup page
  }}
>
  Add to Cart
</Button>

                      <span className="text-muted">Estimated Time: {repair.time}</span>
                    </div>
                  </div>

                  {/* Image Section */}
                  <img
                    src={`${process.env.PUBLIC_URL}${repair.image}`}
                    alt={repair.name}
                    style={{ height: '250px', width: '200px', objectFit: 'cover', marginLeft: '20px' }}
                  />
                </div>
                <div className="card-footer text-center bg-light p-2">
                  <large className="text-muted">Price: ₹{repair.price}</large>
                </div>
              </div>
            </div>
          ))}
        </div>
      <br/>

      <h3>Installation & Uninstallation</h3>
        <div className="row">
          {installations.map((installation) => (
            <div className="col-md-6 mb-4" key={installation.id}>
              <div className="card h-100">
                <div className="card-body d-flex align-items-center justify-content-between">
                  {/* Text Section */}
                  <div>
                    <h5 className="card-title">{installation.name}</h5>
                    <p className="card-text">Type: {installation.type}</p>
                    <p className="card-text">Price: ₹{installation.price}</p>
                    <p className="card-text">Discount: ₹{installation.discount}</p>
                    <div className="d-flex align-items-center mb-2">
                      <svg width="16" height="16" fill="#07794C">
                        <path d="M2 2.5a2.5 2.5 0 015 0V4h2V2.5a2.5 2.5 0 015 0V4h1.25A2.75 2.75 0 0118 6.75v10.5A2.75 2.75 0 0115.25 20H2.75A2.75 2.75 0 010 17.25V6.75A2.75 2.75 0 012.75 4H4V2.5zm3 0a1 1 0 10-2 0V4h2V2.5zm8 0a1 1 0 10-2 0V4h2V2.5zM2.75 6a.75.75 0 00-.75.75V17.25c0 .414.336.75.75.75h12.5a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75H2.75z" />
                      </svg>
                      <p className="mb-0 ms-2">{installation.technology}</p>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <svg width="16" height="16" fill="#07794C">
                        <path d="M7.25 4h-2.5v-.5A.75.75 0 003 4v.5H2.25A2.25 2.25 0 000 6.75v6A2.25 2.25 0 002.25 15h7.5A2.25 2.25 0 0012 12.75v-6A2.25 2.25 0 009.75 4H9V2.25A2.25 2.25 0 006.75 0h-1.5A2.25 2.25 0 003 2.25V4zm1-1.75a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25V4h-2V2.25zM1.5 6.75a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75V9H1.5V6.75zM1.5 10h9v2.75a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V10zm3.25 1.25a.25.25 0 00-.25.25v.5a.25.25 0 00.25.25h2.5a.25.25 0 00.25-.25v-.5a.25.25 0 00-.25-.25h-2.5z" />
                      </svg>
                      <p className="mb-0 ms-2">Warranty: {installation.warranty}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                    <Button
  style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
  onClick={() => {
    // Redirect to login page
    navigate('/login'); // Update this to '/signup' if you want to go to the signup page
  }}
>
  Add to Cart
</Button>

                      <span className="text-muted">Estimated Time: {installation.time}</span>
                    </div>
                  </div>

                  {/* Image Section */}
                  <img
                    src={`${process.env.PUBLIC_URL}${installation.image}`}
                    alt={installation.name}
                    style={{ height: '250px', width: '200px', objectFit: 'cover', marginLeft: '20px' }}
                  />
                </div>
                <div className="card-footer text-center bg-light p-2">
                  <large className="text-muted">Price: ₹{installation.price}</large>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br/>
    </div>

    <div className='container'>
      <div id="repair-section" className="d-flex justify-content-between align-items-center mb-2">
          <h2 style={{ fontSize: '2.5rem' }}>Washing Machine Service</h2>
          <a href="#repair-section" className="text-primary">Know more</a>
        </div>

      {/* Repairs Section */}
      <h3>Repairs</h3>
      <div className="row">
        {wrepairs.map((wrepair) => (
          <div className="col-md-6 mb-4" key={wrepair._id}>
            <div className="card h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="card-title">{wrepair.name}</h5>
                  <p className="card-text">Type: {wrepair.type}</p>
                  <p className="card-text">Base Price: ₹{wrepair.price}</p>

                  {/* Styled Issues Section */}
                  <div className="form-group">
                    <h5>Common Repair Issues</h5>
                    <ul className="list-unstyled">
                      {wrepair.issues && wrepair.issues.length > 0 ? (
                        wrepair.issues.map((issue, issueIndex) => (
                          <li key={issueIndex} className="text-muted">
                            <i className="fas fa-circle" style={{ fontSize: '8px', marginRight: '5px' }}></i>
                            {issue}
                          </li>
                        ))
                      ) : (
                        <li>No issues available</li>
                      )}
                    </ul>
                  </div>
                </div>

                <img
                  src={`${process.env.PUBLIC_URL}${wrepair.image}`}
                  alt={wrepair.name}
                  style={{ height: '250px', width: '200px', objectFit: 'cover', marginLeft: '20px' }}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center p-2">
              <Button
  style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
  onClick={() => {
    // Redirect to login page
    navigate('/login'); // Update this to '/signup' if you want to go to the signup page
  }}
>
  Add to Cart
</Button>

                <span className="text-muted">Estimated Time: {wrepair.time}</span>
              </div>

              <div className="card-footer text-center bg-light p-2">
                <large className="text-muted">
                  Total Price: ₹{wrepair.price}
                </large>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Installations Section */}
      <h3>Installations</h3>
      <div className="row">
        {winstallations.map((winstallation) => (
          <div className="col-md-6 mb-4" key={winstallation.id}>
            <div className="card h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                {/* Text Section */}
                <div>
                  <h5 className="card-title">{winstallation.name}</h5>
                  <p className="card-text">Type: {winstallation.type}</p>
                  <p className="card-text">Base Price: ₹{winstallation.price}</p>
                  
                  <div className="d-flex align-items-center mb-2">
                    <p className="mb-0 ms-2">Technology: {winstallation.technology}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <p className="mb-0 ms-2">Warranty: {winstallation.warranty}</p>
                  </div>
                </div>

                {/* Image Section */}
                <img
                  src={`${process.env.PUBLIC_URL}${winstallation.image}`} 
                  alt={winstallation.name}
                  style={{
                    height: '250px',
                    width: '200px',
                    objectFit: 'cover',
                    marginLeft: '20px',
                  }}
                />
              </div>

              {/* Add to Cart and Estimated Time */}
              <div className="d-flex justify-content-between align-items-center p-2">
              <Button
  style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
  onClick={() => {
    // Redirect to login page
    navigate('/login'); // Update this to '/signup' if you want to go to the signup page
  }}
>
  Add to Cart
</Button>

                <span className="text-muted">Estimated Time: {winstallation.time}</span>
              </div>

              {/* Price Calculation */}
              <div className="card-footer text-center bg-light p-2">
                <large className="text-muted">Total Price: ₹{winstallation.price}</large>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Uninstallations Section */}
      <h3>Uninstallations</h3>
      <div className="row">
        {wuninstallations.map((wuninstallation) => (
          <div className="col-md-6 mb-4" key={wuninstallation.id}>
            <div className="card h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                {/* Text Section */}
                <div>
                  <h5 className="card-title">{wuninstallation.name}</h5>
                  <p className="card-text">Type: {wuninstallation.type}</p>
                  <p className="card-text">Base Price: ₹{wuninstallation.price}</p>
                  
                  <div className="d-flex align-items-center mb-2">
                    <p className="mb-0 ms-2">Technology: {wuninstallation.technology}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <p className="mb-0 ms-2">Warranty: {wuninstallation.warranty}</p>
                  </div>
                </div>

                {/* Image Section */}
                <img
                  src={`${process.env.PUBLIC_URL}${wuninstallation.image}`} 
                  alt={wuninstallation.name}
                  style={{
                    height: '250px',
                    width: '200px',
                    objectFit: 'cover',
                    marginLeft: '20px',
                  }}
                />
              </div>

              {/* Add to Cart and Estimated Time */}
              <div className="d-flex justify-content-between align-items-center p-2">
              <Button
  style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
  onClick={() => {
    // Redirect to login page
    navigate('/login'); // Update this to '/signup' if you want to go to the signup page
  }}
>
  Add to Cart
</Button>

                <span className="text-muted">Estimated Time: {wuninstallation.time}</span>
              </div>

              {/* Price Calculation */}
              <div className="card-footer text-center bg-light p-2">
                <large className="text-muted">Total Price: ₹{wuninstallation.price}</large>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className='container'>
    {/* install Section */}
    <div id="install-section" className="d-flex justify-content-between align-items-center mb-2">
          <h2 style={{ fontSize: '2.5rem' }}>Refrigerator Services</h2>
          <a href="#install-section" className="text-primary">Know more</a>
        </div>

    {/* Single Door Issues Section */}
    <h3>Single Door Issues</h3>
    <div className="row">
      {singleDoors.length > 0 ? (
        singleDoors.map((singleDoor) => (
          <div className="col-md-6 mb-4" key={singleDoor._id}>
            <div className="card h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="card-title">{singleDoor.name}</h5>
                  <p className="card-text">Type: {singleDoor.fridgeType}</p>
                  <p className="card-text">Base Price: ₹{singleDoor.price}</p>
                  <div className="form-group">
                    {singleDoor.doorIssues && singleDoor.doorIssues.length > 0 ? (
                      <ul>
                        {singleDoor.doorIssues.map((issue, issueIndex) => (
                          <li key={issueIndex} className="text-muted">{issue}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No issues available</p>
                    )}
                  </div>
                </div>
                <img
                  src={`${process.env.PUBLIC_URL}${singleDoor.image}`}
                  alt={singleDoor.name}
                  style={{ height: '250px', width: '200px', objectFit: 'cover', marginLeft: '20px' }}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center p-2">
              <Button
  style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
  onClick={() => {
    // Redirect to login page
    navigate('/login'); // Update this to '/signup' if you want to go to the signup page
  }}
>
  Add to Cart
</Button>

                <span className="text-muted">Estimated Time: {singleDoor.time}</span>
              </div>
              <div className="card-footer text-center bg-light p-2">
                <large className="text-muted">
                  Total Price: ₹{singleDoor.price}
                </large>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No Single Door Refrigerators Available</p>
      )}
    </div>

    {/* Double Door Issues Section */}
    <h3>Double Door Issues</h3>
    <div className="row">
      {doubleDoors.length > 0 ? (
        doubleDoors.map((doubleDoor) => (
          <div className="col-md-6 mb-4" key={doubleDoor._id}>
            <div className="card h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="card-title">{doubleDoor.name}</h5>
                  <p className="card-text">Type: {doubleDoor.fridgeType}</p>
                  <p className="card-text">Base Price: ₹{doubleDoor.price}</p>
                  <div className="form-group">
                    {doubleDoor.doorIssues && doubleDoor.doorIssues.length > 0 ? (
                      <ul>
                        {doubleDoor.doorIssues.map((issue, issueIndex) => (
                          <li key={issueIndex} className="text-muted">{issue}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No issues available</p>
                    )}
                  </div>
                </div>
                <img
                  src={`${process.env.PUBLIC_URL}${doubleDoor.image}`}
                  alt={doubleDoor.name}
                  style={{ height: '250px', width: '200px', objectFit: 'cover', marginLeft: '20px' }}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center p-2">
              <Button
  style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
  onClick={() => {
    // Redirect to login page
    navigate('/login'); // Update this to '/signup' if you want to go to the signup page
  }}
>
  Add to Cart
</Button>

                <span className="text-muted">Estimated Time: {doubleDoor.time}</span>
              </div>
              <div className="card-footer text-center bg-light p-2">
                <large className="text-muted">
                  Total Price: ₹{doubleDoor.price}
                </large>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No Double Door Refrigerators Available</p>
      )}
    </div>

    {/* Side-by-Side Door Issues Section */}
    <h3>Side-By-Side Door Issues</h3>
    <div className="row">
      {sideBySideDoors.length > 0 ? (
        sideBySideDoors.map((sideBySideDoor) => (
          <div className="col-md-6 mb-4" key={sideBySideDoor._id}>
            <div className="card h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="card-title">{sideBySideDoor.name}</h5>
                  <p className="card-text">Type: {sideBySideDoor.fridgeType}</p>
                  <p className="card-text">Base Price: ₹{sideBySideDoor.price}</p>
                  <div className="form-group">
                    {sideBySideDoor.doorIssues && sideBySideDoor.doorIssues.length > 0 ? (
                      <ul>
                        {sideBySideDoor.doorIssues.map((issue, issueIndex) => (
                          <li key={issueIndex} className="text-muted">{issue}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No issues available</p>
                    )}
                  </div>
                </div>
                <img
                  src={`${process.env.PUBLIC_URL}${sideBySideDoor.image}`}
                  alt={sideBySideDoor.name}
                  style={{ height: '250px', width: '200px', objectFit: 'cover', marginLeft: '20px' }}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center p-2">
              <Button
  style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
  onClick={() => {
    // Redirect to login page
    navigate('/login'); // Update this to '/signup' if you want to go to the signup page
  }}
>
  Add to Cart
</Button>

                <span className="text-muted">Estimated Time: {sideBySideDoor.time}</span>
              </div>
              <div className="card-footer text-center bg-light p-2">
                <large className="text-muted">
                  Total Price: ₹{sideBySideDoor.price}
                </large>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No Side By Side Door Refrigerators Available</p>
      )}
    </div>
  </div>
    </>
  );
};

export default ServicePage;