import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import * as Components from './Components'; 
// Assuming you have styled-components in Components.js


function SignUp() {
  const [formData, setFormData] = useState({
    techid: "",
    Name: "",
    email: "",
    phone: "",
    adharnumber: "",
    pancard: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();
  

  const validateForm = () => {
    const newErrors = {};

    if (!formData.techid.trim()) newErrors.techid = "Tech ID is required.";
    if (!formData.Name.trim()) newErrors.Name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.adharnumber) newErrors.adharnumber = "Adhar Number is required.";
    if (!formData.pancard) newErrors.pancard = "Pan Card is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/auth/register-technician`, formData);
      console.log(response.data);
      navigate("/login-page");
    } catch (error) {
      console.error("Error during signup:", error.response?.data?.message || "Signup failed");
      setErrors({ submit: error.response?.data?.message || "Signup failed" });
    }
  };

  // Login form state
  const [loginFormData, setLoginFormData] = useState({
    userid: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateofbirth: "",
    password: "",
    confirmPassword: ""
  });

  const [loginErrors, setLoginErrors] = useState({});

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const validateLoginForm = () => {
    const newErrors = {};

    if (!loginFormData.userid.trim()) newErrors.userid = "User ID is required.";
    if (!loginFormData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!loginFormData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!loginFormData.email) newErrors.email = "Email is required.";
    if (!loginFormData.phone) newErrors.phone = "Phone number is required.";
    if (!loginFormData.dateofbirth) newErrors.dateofbirth = "Date of birth is required.";
    if (!loginFormData.password) newErrors.password = "Password is required.";
    if (loginFormData.password !== loginFormData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    return newErrors;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm();
    if (Object.keys(validationErrors).length > 0) {
      setLoginErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/auth/register-user`, loginFormData);
      console.log(response.data);
      navigate("/login-page"); // Redirect based on user role or dashboard
    } catch (error) {
      console.error("Error during login:", error.response?.data?.message || "signup as failed");
      setLoginErrors({ submit: error.response?.data?.message || "signup as failed" });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${require('assets/img/bg11.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        height: '120vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <Components.Container>
        {/* Sign Up Form */}
        <Components.SignUpContainer signinIn={isSignIn} style={{ display: isSignIn ? 'none' : 'block' }}>
          <Components.Form onSubmit={handleSubmit}>
            <h3 style={{ paddingTop: '20px' }}><b>SignIn@Technician</b></h3>
            <Components.Input
              name="techid"
              placeholder="Tech ID"
              type="text"
              value={formData.techid}
              onChange={handleChange}
            />
            {errors.techid && <div className="text-danger">{errors.techid}</div>}

            <Components.Input
              name="Name"
              placeholder="Name"
              type="text"
              value={formData.Name}
              onChange={handleChange}
            />
            {errors.Name && <div className="text-danger">{errors.Name}</div>}

            <Components.Input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}

            <Components.Input
              name="phone"
              placeholder="Phone Number"
              type="text"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="text-danger">{errors.phone}</div>}

            <Components.Input
              name="adharnumber"
              placeholder="Adhar Number"
              type="text"
              value={formData.adharnumber}
              onChange={handleChange}
            />
            {errors.adharnumber && <div className="text-danger">{errors.adharnumber}</div>}

            <Components.Input
              name="pancard"
              placeholder="Pan Card"
              type="text"
              value={formData.pancard}
              onChange={handleChange}
            />
            {errors.pancard && <div className="text-danger">{errors.pancard}</div>}

            <Components.Input
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}

            <Components.Input
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
            <br />
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        {/* Sign In Form */}
        <Components.SignInContainer signinIn={isSignIn} style={{ display: isSignIn ? 'block' : 'none' }}>
          <Components.Form onSubmit={handleLoginSubmit}>
            <h3 style={{ paddingTop: '20px' }}><b>SignUp@User</b></h3>

            <Components.Input
              name="userid"
              placeholder="User ID"
              type="text"
              value={loginFormData.userid}
              onChange={handleLoginChange}
            />
            {loginErrors.userid && <div className="text-danger">{loginErrors.userid}</div>}

            <Components.Input
              name="firstName"
              placeholder="First Name"
              type="text"
              value={loginFormData.firstName}
              onChange={handleLoginChange}
            />
            {loginErrors.firstName && <div className="text-danger">{loginErrors.firstName}</div>}

            <Components.Input
              name="lastName"
              placeholder="Last Name"
              type="text"
              value={loginFormData.lastName}
              onChange={handleLoginChange}
            />
            {loginErrors.lastName && <div className="text-danger">{loginErrors.lastName}</div>}

            <Components.Input
              name="email"
              placeholder="Email"
              type="email"
              value={loginFormData.email}
              onChange={handleLoginChange}
            />
            {loginErrors.email && <div className="text-danger">{loginErrors.email}</div>}

            <Components.Input
              name="phone"
              placeholder="Phone Number"
              type="text"
              value={loginFormData.phone}
              onChange={handleLoginChange}
            />
            {loginErrors.phone && <div className="text-danger">{loginErrors.phone}</div>}

            <Components.Input
              name="dateofbirth"
              placeholder="Date of Birth"
              type="date"
              value={loginFormData.dateofbirth}
              onChange={handleLoginChange}
            />
            {loginErrors.dateofbirth && <div className="text-danger">{loginErrors.dateofbirth}</div>}

            <Components.Input
              name="password"
              placeholder="Password"
              type="password"
              value={loginFormData.password}
              onChange={handleLoginChange}
            />
            {loginErrors.password && <div className="text-danger">{loginErrors.password}</div>}

            <Components.Input
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={loginFormData.confirmPassword}
              onChange={handleLoginChange}
            />
            {loginErrors.confirmPassword && <div className="text-danger">{loginErrors.confirmPassword}</div>}
            <br />
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={isSignIn}>
          <Components.Overlay signinIn={isSignIn}>
            <Components.LeftOverlayPanel signinIn={isSignIn}>
              <Components.Title>Hello, Technician!</Components.Title>
              <Components.Paragraph>
                Enter your personal details to work  with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setIsSignIn(true)}>
                Sign Up as User
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={isSignIn}>
              <Components.Title>Hello, User!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start your journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setIsSignIn(false)}>
                Sign Up as Technician
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default SignUp;