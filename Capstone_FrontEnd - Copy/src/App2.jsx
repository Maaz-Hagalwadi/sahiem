

// // import React from 'react';
// // import { Link, Routes, Route } from 'react-router-dom';
// // import { Navbar, Container, Nav, Button } from 'react-bootstrap';
// // import { FaUser } from 'react-icons/fa'; // Import the profile icon from react-icons
// // import Bus from './Components/Bus';
// // import Info from './Components/Info';
// // import Payment from './Components/Payment';
// // import Profile from './Components/profile';

// // function App2() {
// //   return (
// //     <div className="container-fluid p-0">
// //       <Navbar expand="lg" variant="dark" style={{ borderBottom: '1px solid #ccc', backgroundColor: ' #334d4d', position: 'fixed', zIndex: '100', top: '0', width: '100%' }}>
// //         <Container fluid>
// //           <Navbar.Brand as={Link} to="/">JourneyJet Bus Booking</Navbar.Brand>
// //           <Navbar.Toggle aria-controls="navbarNavDropdown" />
// //           <Navbar.Collapse id="navbarNavDropdown">
// //             <Nav className="me-auto mb-2 mb-lg-0">
// //               <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
// //               <Nav.Link as={Link} to="/billing" className="nav-link">Invoice</Nav.Link>
        
// //             </Nav>
// //             <Nav>
// //               <Button variant="outline-light" as={Link} to="/profile">
// //                 <FaUser style={{ marginRight: '5px' }} />
// //                 Account
// //               </Button>
// //             </Nav>
// //           </Navbar.Collapse>
// //         </Container>
// //       </Navbar>

// //       {/* Ensure content starts below the fixed Navbar */}
// //       <div style={{ paddingTop: '70px' }}>
// //         <Routes>
// //           <Route path="/" element={<Bus />} />
// //           <Route path="/bus-details" element={<Info />} />
// //           <Route path="/billing" element={<Payment />} />
// //           <Route path="/profile" element={<Profile />} />
// //         </Routes>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App2;
// import React from 'react';
// import { Link, Routes, Route } from 'react-router-dom';
// import { Navbar, Container, Nav, Button } from 'react-bootstrap';
// import { FaUser, FaHome, FaFileInvoice } from 'react-icons/fa';
// import Bus from './Components/Bus';
// import Info from './Components/Info';
// import Payment from './Components/Payment';
// import Profile from './Components/profile';

// function App2() {
//   return (
//     <div className="container-fluid p-0">
//       <Navbar expand="lg" variant="dark" style={{ borderBottom: '1px solid #ccc', backgroundColor: '#334d4d', position: 'fixed', zIndex: '100', top: '0px', height: '100vh' }}>
//         <Container fluid className="d-flex flex-column">
//           <Navbar.Brand as={Link} to="/" className="mb-3" style={{ color: 'orange', fontFamily: 'Times New Roman', fontSize: '44px' }}>
//             My Bus
//           </Navbar.Brand>
//           <Nav className="flex-column flex-grow-1">
//             <Nav.Link as={Link} to="/" className="nav-link d-flex align-items-center" style={{ backgroundColor: 'transparent', color: 'orange' }}>
//               <FaHome style={{ marginRight: '10px' }} />
//               Home
//             </Nav.Link>
//             <Nav.Link as={Link} to="/billing" className="nav-link d-flex align-items-center" style={{ backgroundColor: 'transparent', color: 'orange' }}>
//               <FaFileInvoice style={{ marginRight: '10px' }} />
//               Invoice
//             </Nav.Link>
//           </Nav>
//           <Nav className="mt-auto">
//             <Button variant="outline-light" as={Link} to="/profile" className="mt-3" style={{ color: 'orange', border: '2px solid orange' }}>
//               <FaUser style={{ marginRight: '5px' }} />
//               Profile
//             </Button>
//           </Nav>
//         </Container>
//       </Navbar>

//       {/* Ensure content starts below the fixed Navbar */}
//       <div style={{ marginLeft: '250px', paddingTop: '70px' }}>
//         <Routes>
//           <Route path="/" element={<Bus />} />
//           <Route path="/bus-details" element={<Info />} />
//           <Route path="/billing" element={<Payment />} />
//           <Route path="/profile" element={<Profile />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App2;
// import React from 'react';
// import { Link, Routes, Route } from 'react-router-dom';
// import { Navbar, Container, Nav, Button } from 'react-bootstrap';
// import { FaUser, FaHome, FaFileInvoice } from 'react-icons/fa';
// import Bus from './Components/Bus';
// import Info from './Components/Info';
// import Payment from './Components/Payment';
// import Profile from './Components/profile';

// function App2() {
//   return (
//     <div className="container-fluid p-0">
//       <Navbar expand="lg" variant="dark" style={{ borderBottom: '1px solid #ccc', backgroundColor: '#334d4d', position: 'fixed', zIndex: '100', top: '0px', height: '100vh' }}>
//         <Container fluid className="d-flex flex-column">
//           <Navbar.Brand as={Link} to="/" className="mb-3" style={{ color: 'orange', fontFamily: 'Times New Roman', fontSize: '44px' }}>
//             My Bus
//           </Navbar.Brand>
//           <Nav className="flex-column flex-grow-1">
//             <Nav.Link as={Link} to="/" className="nav-link d-flex align-items-center" style={{ backgroundColor: 'transparent', color: 'orange' }}>
//               <FaHome style={{ marginRight: '10px' }} />
//               Home
//             </Nav.Link>
//             <Nav.Link as={Link} to="/billing" className="nav-link d-flex align-items-center" style={{ backgroundColor: 'transparent', color: 'orange' }}>
//               <FaFileInvoice style={{ marginRight: '10px' }} />
//               Invoice
//             </Nav.Link>
//           </Nav>
//           <Nav className="mt-auto">
//             <Button variant="outline-light" as={Link} to="/profile" className="mt-3" style={{ color: 'orange', border: '2px solid orange' }}>
//               <FaUser style={{ marginRight: '5px' }} />
//               Profile
//             </Button>
//           </Nav>
//         </Container>
//       </Navbar>

//       {/* Ensure content starts below the fixed Navbar */}
//       <div style={{ marginLeft: '250px', paddingTop: '70px' }}>
//         <Routes>
//           <Route path="/" element={<Bus />} />
//           <Route path="/bus-details" element={<Info />} />
//           <Route path="/billing" element={<Payment />} />
//           <Route path="/profile" element={<Profile />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App2;
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FaUser, FaHome, FaFileInvoice } from 'react-icons/fa';
import Bus from './Components/Bus';
import Info from './Components/Info';
import Payment from './Components/Payment';
import Profile from './Components/profile';

function App2() {
  return (
    <div className="container-fluid p-0">
      <Navbar bg="dark" variant="dark" className="flex-column p-3" style={{ width: '250px', height: '100vh', position: 'fixed' }}>
        <Container fluid className="d-flex flex-column">
          {/* Navbar Brand at the top */}
          <Navbar.Brand as={Link} to="/" className="mb-3 mt-3" style={{ color: 'orange', fontFamily: 'Times New Roman', fontSize: '44px' }}>
            My Bus
          </Navbar.Brand>
          {/* Navigation links */}
          <Nav className="flex-column flex-grow-1 mt-3">
            <Nav.Link as={Link} to="/" className="nav-link d-flex align-items-center" style={{ backgroundColor: 'transparent', color: 'orange' }}>
              <FaHome style={{ marginRight: '10px' }} />
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/billing" className="nav-link d-flex align-items-center" style={{ backgroundColor: 'transparent', color: 'orange' }}>
              <FaFileInvoice style={{ marginRight: '10px' }} />
              Invoice
            </Nav.Link>
          </Nav>
          {/* Profile button at the bottom */}
          <Nav className="mt-auto">
            <Button variant="outline-light" as={Link} to="/profile" className="mt-3" style={{ color: 'orange', border: '2px solid orange' }}>
              <FaUser style={{ marginRight: '5px' }} />
              Profile
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Ensure content starts below the fixed Navbar */}
      <div style={{ marginLeft: '250px', paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<Bus />} />
          <Route path="/bus-details" element={<Info />} />
          <Route path="/billing" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App2;
