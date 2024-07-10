

// // import React, { useState, useEffect } from "react";
// // import { Link, Navigate } from "react-router-dom";

// // const Profile = () => {
// //   const [user, setUser] = useState(null); // State to hold user data

// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       try {
// //         const email = localStorage.getItem("email");
// //         const password = localStorage.getItem("password");

// //         if (!email || !password) {
// //           console.error("Email or password not found in localStorage");
// //           return;
// //         }

// //         // Fetch user data from backend using stored email and password
// //         const response = await fetch(`http://localhost:3000/login`, {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({ email, password })
// //         });

// //         if (response.ok) {
// //           const userData = await response.json();
// //           setUser(userData);
// //         } else {
// //           console.error("Failed to fetch user data");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching user data:", error);
// //       }
// //     };

// //     fetchUserData();
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("email");
// //     localStorage.removeItem("password");
// //     window.location.href = "/login";
// //   };

// //   if (!localStorage.getItem("user")) {
// //     return <Navigate to="/login" replace />;
// //   }

// //   return (
// //     <div className="container mt-5" >
// //       <div className="row justify-content-center">
// //         <div className="col-md-6" >
// //           <div className="card" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
// //             <div className="card-body"style={{background:'grey',borderRadius:'20px',color:'black',fontWeight:'bold'}}>
// //               <h2 className="card-title text-center mb-4">User Profile</h2>
// //               {user && (
// //                 <div>
// //                   <div className="mb-3">
// //                     <label htmlFor="userName" className="form-label">Name:</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       id="userName"
// //                       value={user.userName}
// //                       disabled
// //                     />
// //                   </div>
// //                   <div className="mb-3">
// //                     <label htmlFor="email" className="form-label">Email:</label>
// //                     <input
// //                       type="email"
// //                       className="form-control"
// //                       id="email"
// //                       value={user.email}
// //                       disabled
// //                     />
// //                   </div>
// //                   <div className="mb-3">
// //                     <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       id="phoneNumber"
// //                       value={user.phoneNumber}
// //                       disabled
// //                     />
// //                   </div>
// //                   <div className="mb-3">
// //                     <label htmlFor="role" className="form-label">Role:</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       id="role"
// //                       value={user.role}
// //                       disabled
// //                     />
// //                   </div>
// //                   <div className="mb-3">
// //                     <label htmlFor="gender" className="form-label">Gender:</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       id="gender"
// //                       value={user.gender}
// //                       disabled
// //                     />
// //                   </div>
// //                   <div className="mb-3">
// //                     <label htmlFor="age" className="form-label">Age:</label>
// //                     <input
// //                       type="number"
// //                       className="form-control"
// //                       id="age"
// //                       value={user.age}
// //                       disabled
// //                     />
// //                   </div>
// //                 </div>
// //               )}
// //               <div className="d-grid mb-3">
// //                 <button onClick={handleLogout} className="btn btn-danger">Logout</button>
// //               </div>
// //               <div className="d-grid">
// //                 <Link to="/" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Back to Home</Link>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;
// import React, { useState, useEffect } from "react";
// import { Link, Navigate } from "react-router-dom";

// const Profile = () => {
//   const [user, setUser] = useState(null); // State to hold user data

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const email = localStorage.getItem("email");
//         const password = localStorage.getItem("password");

//         if (!email || !password) {
//           console.error("Email or password not found in localStorage");
//           return;
//         }

//         // Fetch user data from backend using stored email and password
//         const response = await fetch(`http://localhost:3000/login`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ email, password })
//         });

//         if (response.ok) {
//           const userData = await response.json();
//           setUser(userData);
//         } else {
//           console.error("Failed to fetch user data");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("email");
//     localStorage.removeItem("password");
//     window.location.href = "/login";
//   };

//   if (!localStorage.getItem("user")) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div style={{ marginTop: '50px', textAlign: 'center' }}>
//       <div style={{ display: 'inline-block', textAlign: 'left', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', maxWidth: '800px', margin: 'auto', backgroundColor: 'lightgrey' }}>
//         <h2 style={{ marginBottom: '20px', color: '#1f2e2e' }}>User Profile</h2>
//         {user && (
//           <div>
//             <div style={{ marginBottom: '10px', textAlign: 'center' }}>
//               <label style={{ display: 'inline-block', width: '150px', textAlign: 'right', fontWeight: 'bold', marginRight: '10px' }}>Name:</label>
//               <input
//                 type="text"
//                 style={{ padding: '5px', width: 'calc(100% - 180px)', border: '1px solid #ccc', borderRadius: '5px' }}
//                 value={user.userName}
//                 disabled
//               />
//             </div>
//             <div style={{ marginBottom: '10px', textAlign: 'center' }}>
//               <label style={{ display: 'inline-block', width: '150px', textAlign: 'right', fontWeight: 'bold', marginRight: '10px' }}>Email:</label>
//               <input
//                 type="email"
//                 style={{ padding: '5px', width: 'calc(100% - 180px)', border: '1px solid #ccc', borderRadius: '5px' }}
//                 value={user.email}
//                 disabled
//               />
//             </div>
//             <div style={{ marginBottom: '10px', textAlign: 'center' }}>
//               <label style={{ display: 'inline-block', width: '150px', textAlign: 'right', fontWeight: 'bold', marginRight: '10px' }}>Phone Number:</label>
//               <input
//                 type="text"
//                 style={{ padding: '5px', width: 'calc(100% - 180px)', border: '1px solid #ccc', borderRadius: '5px' }}
//                 value={user.phoneNumber}
//                 disabled
//               />
//             </div>
//             <div style={{ marginBottom: '10px', textAlign: 'center' }}>
//               <label style={{ display: 'inline-block', width: '150px', textAlign: 'right', fontWeight: 'bold', marginRight: '10px' }}>Role:</label>
//               <input
//                 type="text"
//                 style={{ padding: '5px', width: 'calc(100% - 180px)', border: '1px solid #ccc', borderRadius: '5px' }}
//                 value={user.role}
//                 disabled
//               />
//             </div>
//             <div style={{ marginBottom: '10px', textAlign: 'center' }}>
//               <label style={{ display: 'inline-block', width: '150px', textAlign: 'right', fontWeight: 'bold', marginRight: '10px' }}>Gender:</label>
//               <input
//                 type="text"
//                 style={{ padding: '5px', width: 'calc(100% - 180px)', border: '1px solid #ccc', borderRadius: '5px' }}
//                 value={user.gender}
//                 disabled
//               />
//             </div>
//             <div style={{ marginBottom: '20px', textAlign: 'center' }}>
//               <label style={{ display: 'inline-block', width: '150px', textAlign: 'right', fontWeight: 'bold', marginRight: '10px' }}>Age:</label>
//               <input
//                 type="number"
//                 style={{ padding: '5px', width: 'calc(100% - 180px)', border: '1px solid #ccc', borderRadius: '5px' }}
//                 value={user.age}
//                 disabled
//               />
//             </div>
//           </div>
//         )}
//         <div style={{ marginBottom: '10px', textAlign: 'center' }}>
//           <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
//         </div>
//         <div style={{ textAlign: 'center' }}>
//           <Link to="/" style={{ padding: '10px 20px', backgroundColor: '#1f2e2e', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Back to Home</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null); // State to hold user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");

        if (!email || !password) {
          console.error("Email or password not found in localStorage");
          return;
        }

        // Fetch user data from backend using stored email and password
        const response = await fetch(`http://localhost:3000/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = "/login";
  };

  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ marginTop: '50px', textAlign: 'center' }}>
      <div style={{ display: 'inline-block', textAlign: 'left', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', maxWidth: '800px', margin: 'auto', backgroundColor: 'lightgrey' }}>
        <h2 style={{ marginBottom: '20px', color: '#dc3545',fontWeight:'bold', textAlign: 'center' }}>User Profile</h2>
        {user && (
          <div>
            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
              <label style={{ display: 'inline-block', width: '150px', textAlign: 'right', fontWeight: 'bold', marginRight: '10px' }}>Name:</label>
              <input
                type="text"
                style={{ padding: '5px', width: 'calc(100% - 180px)', border: '1px solid #ccc', borderRadius: '5px' }}
                value={user.userName}
                disabled
              />
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
              <label style={{ display: 'inline-block', width: '150px', textAlign: 'right', fontWeight: 'bold', marginRight: '10px' }}>Email:</label>
              <input
                type="email"
                style={{ padding: '5px', width: 'calc(100% - 180px)', border: '1px solid #ccc', borderRadius: '5px' }}
                value={user.email}
                disabled
              />
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
              <label style={{ display: 'inline-block', width: '150px', textAlign: 'right', fontWeight: 'bold', marginRight: '10px' }}>Phone:</label>
              <input
                type="text"
                style={{ padding: '5px', width: 'calc(100% - 180px)', border: '1px solid #ccc', borderRadius: '5px' }}
                value={user.phoneNumber}
                disabled
              />
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
              <label style={{ display: 'inline-block', width: '150px', textAlign: 'right', fontWeight: 'bold', marginRight: '10px' }}>Role:</label>
              <input
                type="text"
                style={{ padding: '5px', width: 'calc(100% - 180px)', border: '1px solid #ccc', borderRadius: '5px' }}
                value={user.role}
                disabled
              />
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
              <label style={{ display: 'inline-block', width: '150px', textAlign: 'right', fontWeight: 'bold', marginRight: '10px' }}>Gender:</label>
              <input
                type="text"
                style={{ padding: '5px', width: 'calc(100% - 180px)', border: '1px solid #ccc', borderRadius: '5px' }}
                value={user.gender}
                disabled
              />
            </div>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <label style={{ display: 'inline-block', width: '150px', textAlign: 'right', fontWeight: 'bold', marginRight: '10px' }}>Age:</label>
              <input
                type="number"
                style={{ padding: '5px', width: 'calc(100% - 180px)', border: '1px solid #ccc', borderRadius: '5px' }}
                value={user.age}
                disabled
              />
            </div>
          </div>
        )}
        <div style={{ marginBottom: '10px', textAlign: 'center' }}>
          <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{ padding: '10px 20px', backgroundColor: '#1f2e2e', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
