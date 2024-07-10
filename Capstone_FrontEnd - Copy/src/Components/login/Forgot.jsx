
// import { useState } from "react";
// import { Link } from "react-router-dom";

// export const Forgot = () => {
//   const [data, setData] = useState({
//     email: "",
//   });
//   const [hold, setHold] = useState(false);

//   const handleChange = (ele) => {
//     const { name, value } = ele.target;
//     setData({
//       ...data,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (ele) => {
//     ele.preventDefault();
//     setHold(true);
//     const response = await fetch(`https://giridharan-5.onrender.com/forgotPassword`, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (response.status === 401) {
//       alert("Invalid email");
//     } else {
//       setHold(false);
//       alert("Verify your email, please check your email");
//     }
//     setData({
//       email: "",
//     });
//   };

//   return (
//     <div
//       className="background-container"
//       style={{
//         backgroundImage: 'url("/highway.jpg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         minHeight: '100vh',
//       }}
//     >
//       <div className="login-form-container">
//         {/* Header */}
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ position: 'fixed', top: '0', width: '100%', zIndex: '1000' }}>
//           <div className="container-fluid">
//             <Link className="navbar-brand" to="/">
//               <img src="\mybuslogo-removebg-preview.png" alt="JourneyJet Logo" width="30" height="30" className="d-inline-block align-text-top" />
//             </Link>
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//               <ul className="navbar-nav mx-auto">
//                 <div style={{ color: 'orange', fontWeight: '', fontSize: '30px', fontFamily: 'times roman' }}>Journey into your next adventure</div>
//               </ul>
//               <div className="ml-auto d-flex">
//                 <Link to='/login' className="btn" style={{ color: 'orange', backgroundColor: 'transparent', border: '1px solid orange', marginRight: '10px' }}>Log In</Link>
//                 <Link to='/register' className="btn" style={{ color: 'orange', backgroundColor: 'transparent', border: '1px solid orange' }}>Sign Up</Link>
//               </div>
//             </div>
//           </div>
//         </nav>
       
//         {/* Forgot Password Form */}
//         <div className="container mt-5">
//           <div className="row justify-content-center">
//             <div className="col-md-6">
//               <div className="card transparent-form">
//                 <h1 className="lk" style={{ color: '#1f2e2e' }}>Welcome To JourneyJet</h1>
//                 <div className="card-body">
//                   <h4 className="card-title text-center mb-4">Forgot Password Form</h4>
//                   <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                       <label htmlFor="email">Email:</label>
//                       <input type="email" className="form-control" id="email" name="email" value={data.email} onChange={handleChange} required />
//                     </div>
//                     <div className="d-grid">
//                       <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Submit</button>
//                     </div>
//                   </form>
//                   {hold && <p className="text-center mt-3">Hold tight, we are sending email to you</p>}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useState } from "react";
import { Link } from "react-router-dom";

export const Forgot = () => {
  const [data, setData] = useState({
    email: "",
  });
  const [hold, setHold] = useState(false);

  const handleChange = (ele) => {
    const { name, value } = ele.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (ele) => {
    ele.preventDefault();
    setHold(true);
    const response = await fetch(`https://giridharan-5.onrender.com/forgotPassword`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 401) {
      alert("Invalid email");
    } else {
      setHold(false);
      alert("Verify your email, please check your email");
    }
    setData({
      email: "",
    });
  };

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
       
        {/* Forgot Password Form */}
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card transparent-form" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid black', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',marginLeft: '100px',marginRight:'50px',marginTop:'200px',marginBottom:'90px',bottom:'40px',left:'250px'}}>
                <h1 className="lk" style={{ color: '#FFA500',fontFamily:'times roman' }}>Welcome To MyBus</h1>
                <div className="card-body">
                  <h4 className="card-title text-center mb-4" >Forgot password</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" style={{ color: '#FFA500' }}>Email:</label>
                      <input type="email" className="form-control" id="email" name="email" value={data.email} onChange={handleChange} required style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#FFA500',border:'2px solid white' }} />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'orange',color:'white', border: 'none',fontWeight:'bold' }}>Submit</button>
                    </div>
                  </form>
                  {hold && <p className="text-center mt-3" style={{ color: '#FFA500' }}>Hold tight, we are sending email to you</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
