

import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Login.css';

export const Login = ({ onLoginSuccess }) => {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false); // State to track successful login

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login data being sent:', login); // Debug log
        try {
            const response = await fetch(`http://localhost:3000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });
            console.log('Login response status:', response.status); // Debug log
            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || 'Login failed');
            }
            const userData = await response.json();
            console.log('User data received:', userData); // Debug log
            localStorage.setItem('user', JSON.stringify(userData)); // Store user data
            localStorage.setItem('email', login.email); // Store user email
            localStorage.setItem('password', login.password); // Store user password
            onLoginSuccess(userData.role); // Pass role to parent
            setLoginSuccess(true); // Set login success state
        } catch (error) {
            console.error('Login error:', error.message);
            setError(error.message);
        } finally {
            setLogin({ email: '', password: '' });
        }
    };

    // Redirect to homepage if user is logged in
    if (localStorage.getItem('user')) {
        return <Navigate to="/" replace />;
    }

    // Render login form
    return (
        <div style={{
            backgroundImage: 'url("/highway.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            backgroundColor: '#D1E0E0',
        }}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ position: 'fixed', top: '0', width: '100%', zIndex: '1000' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src="\mybuslogo-removebg-preview.png" alt="JourneyJet Logo" width="30" height="30" className="d-inline-block align-text-top" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto">
                            <div style={{ color: 'orange', fontWeight: '', fontSize: '30px', fontFamily: 'times roman' }}>Journey into your next adventure</div>
                        </ul>
                        <div className="ml-auto d-flex">
                            <Link to='/login' className="btn" style={{ color: 'orange', backgroundColor: 'transparent', border: '1px solid orange', marginRight: '10px' }}>Log In</Link>
                            <Link to='/register' className="btn" style={{ color: 'orange', backgroundColor: 'transparent', border: '1px solid orange' }}>Sign Up</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="background-container" style={{ paddingTop: '110px' }}>
                <div className="container mt-5" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="col-md-6">
                        <div className="card" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'orange', borderRadius: '19px', border: '2px solid black', marginLeft: '110px', marginRight: '50px' }}>
                            <h1 className="lk" style={{ color: 'orange', fontFamily: 'times roman' }}>Welcome To MyBus</h1>
                            <div className="card-body">
                                <h4 className="card-title text-center mb-4" style={{ color: 'grey', fontWeight: 'bold' }}>Log In</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" style={{ color: 'orange', fontWeight: 'bold' }}>Email:</label>
                                        <input type="email" className="form-control" id="email" name="email" value={login.email} onChange={handleChange} required style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'orange' }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" style={{ color: 'orange', fontWeight: 'bold' }}>Password:</label>
                                        <input type="password" className="form-control" id="password" name="password" value={login.password} onChange={handleChange} required style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'orange' }} />
                                    </div>
                                    <div className="mb-3">
                                        <Link to='/forgot' style={{ color: 'grey', fontWeight: 'bold' }}>Forgot Password?</Link>
                                        &nbsp;&nbsp;&nbsp;
                                        <Link to='/reset' style={{ color: 'grey', fontWeight: 'bold' }}>Reset?</Link>
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'orange', color: 'white', border: 'none', fontWeight: 'bold' }}>Submit</button>
                                    </div>
                                    <div className="text-center mt-3">
                                        <Link to="/register" className="text-decoration-none" style={{ color: 'grey', fontWeight: 'bold' }}>Register ? New account</Link>
                                    </div>
                                    {error && <div className="text-danger text-center mt-3">{error}</div>}
                                    {loginSuccess && (
                                        <div className="text-success text-center mt-3">Successfully logged in. Redirecting in 30 seconds...</div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="container text-center">
                        {/* <span className="text-muted">© 2024 JourneyJet. All rights reserved.</span> */}
                        {/* <div>
                            <a href="/about" className="text-decoration-none mx-2">About</a>
                            <a href="/contact" className="text-decoration-none mx-2">Contact</a>
                        </div> */}
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Login;
