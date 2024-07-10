import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export const Reset = () => {
  const [data, setData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isReset, setIsReset] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    const response = await fetch(`https://billing-l50y.onrender.com/resetPassword`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setIsReset(true);
    }
  };

  if (isReset) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: 'url("/highway.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="login-form-container">
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
       
        {/* Reset Form */}
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card transparent-form" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid black', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', marginLeft: '100px', marginRight: '50px', marginTop: '40px', marginBottom: '50px', bottom: '0px', left: '250px' }}>
                <h1 className="lk" style={{ color: '#1f2e2e' }}>Welcome To JourneyJet</h1>
                <div className="card-body">
                  <h4 className="card-title text-center mb-4">Password Reset Form</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" style={{ color: 'orange' }}>Email:</label>
                      <input type="email" className="form-control" id="email" name="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required placeholder="Email" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'orange', border: '1px solid white' }} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="oldPassword" style={{ color: 'orange' }}>Old Password:</label>
                      <input type="password" className="form-control" id="oldPassword" name="oldPassword" value={data.oldPassword} onChange={(e) => setData({ ...data, oldPassword: e.target.value })} required placeholder="Old Password" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'orange', border: '1px solid white' }} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="newPassword" style={{ color: 'orange' }}>New Password:</label>
                      <input type="password" className="form-control" id="newPassword" name="newPassword" value={data.newPassword} onChange={(e) => setData({ ...data, newPassword: e.target.value })} required placeholder="New Password" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'orange', border: '1px solid white' }} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" style={{ color: 'orange' }}>Confirm New Password:</label>
                      <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} required placeholder="Confirm New Password" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'orange', border: '1px solid white' }} />
                      {!passwordsMatch && <p className="text-danger">Passwords do not match!</p>}
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none', marginTop: '10px' }}>Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
