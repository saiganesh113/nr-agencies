import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'assets/css/bootstrap.min.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://sree-teq-project-api.onrender.com/api/superadmin/login', {
        email,
        password,
      });
      const { token, role } = response.data;

      // Store token and role in localStorage
      localStorage.setItem('superAdminToken', token);
      localStorage.setItem('role', role);

      // Redirect to the Admin Dashboard
      navigate('/Sreeteq/kingdev376/superadmin/admin-dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <form onSubmit={handleLogin}>
          <h2 className="text-center mb-4">Super Admin Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/superadmin-signup">Signup here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;