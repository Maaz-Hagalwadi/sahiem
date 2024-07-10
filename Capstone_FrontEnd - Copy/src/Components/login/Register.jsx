
  import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import '../../App.css';

const Register = () => {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [otpData, setOtpData] = useState({
    otp: "",
    role: "",
    age: "",
    gender: "",
  });

  const [registered, setRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (ele) => {
    const { name, value } = ele.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleOtpChange = (ele) => {
    const { name, value } = ele.target;
    setOtpData({
      ...otpData,
      [name]: value,
    });
  };

  const handleRegisterSubmit = async (ele) => {
    ele.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 409) {
        setError("User already exists");
      } else {
        setRegistered(true);
      }
    } catch (err) {
      console.log(err);
      setError("Error while registering");
    }
  };

  const handleOtpSubmit = async (ele) => {
    ele.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/register/verifyOtp`, {
        method: "POST",
        body: JSON.stringify({ email: data.email, ...otpData }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setLoggedIn(true);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError("Error while verifying OTP");
    }
  };

  if (loggedIn) {
    return <Navigate to={'/login'} replace />;
  }

  if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div
      style={{
        backgroundImage: 'url("/highway.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        backgroundColor: '#d1e0e0', // Fallback color if image fails to load
      }}
    >
      {/* Header */}
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
      {/* Split Page into Two Columns */}
      <div className="container mt-5">
        <div className="row justify-content-center" style={{ marginTop: '50px' }}>
          {/* Left Column for Logo */}
          <div className="col-md-4 d-flex justify-content-center align-items-center">
          </div>
          {/* Right Column for Registration Form */}
          <div className="col-md-6">
            <div className="card" style={{ border:'2px solid black',borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.7)', marginLeft: '110px',marginRight:'50px' }}>
              <div className="card-body">
                <h1 className="text-center mb-4" style={{ color: '#FFA500', fontFamily: 'times roman' }}>Welcome To JourneyJet</h1>
                <h4 className="card-title text-center mb-4" style={{ color: 'grey', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Sign Up</h4>
                {!registered ? (
                  <form onSubmit={handleRegisterSubmit}>
                    <div className="mb-3">
                      <label htmlFor="userName" className="form-label" style={{ color: '#FFA500' }}>Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        value={data.userName}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'orange' }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label" style={{ color: '#FFA500' }}>Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'orange' }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label" style={{ color: '#FFA500' }}>Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'orange' }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phoneNumber" className="form-label" style={{ color: '#FFA500' }}>Phone Number:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={data.phoneNumber}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'orange' }}
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'orange',color:'white', border: 'none',fontWeight:'bold' }}>Register</button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleOtpSubmit}>
                    <div className="mb-3">
                      <label htmlFor="otp" className="form-label" style={{ color: '#FFA500' }}>Enter OTP:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="otp"
                        name="otp"
                        value={otpData.otp}
                        onChange={handleOtpChange}
                        required
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#FFA500' }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="role" className="form-label" style={{ color: '#FFA500' }}>Select Role:</label>
                      <select
                        className="form-control"
                        id="role"
                        name="role"
                        value={otpData.role}
                        onChange={handleOtpChange}
                        required
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#FFA500' }}
                      >
                        <option value="" disabled>Select your role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label" style={{ color: '#FFA500' }}>Gender:</label>
                      <select
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={otpData.gender}
                        onChange={handleOtpChange}
                        required
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#FFA500' }}
                      >
                        <option value="" disabled>Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label" style={{ color: '#FFA500' }}>Age:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="age"
                        name="age"
                        value={otpData.age}
                        onChange={handleOtpChange}
                        required
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#FFA500' }}
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'orange', color: 'white', border: 'none' }}>Verify OTP</button>
                    </div>
                  </form>
                )}
                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
