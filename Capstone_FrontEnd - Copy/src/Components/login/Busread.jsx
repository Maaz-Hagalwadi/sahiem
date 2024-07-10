// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Table } from 'react-bootstrap';

// function Busread() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/bus');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   return (
//     <>
//       <Container fluid>
//         <h1>Productsss</h1>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Bus Id</th>
//               <th>Bus Name</th>
//               <th>Bus Number</th>
//               <th>Capacity</th>
//               <th>From</th>
//               <th>To</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(bus => (
//               <tr key={bus.busId}>
//                 <td>{bus.busId}</td>
//                 <td>{bus.busName ? bus.busName : 'N/A'}</td>
//                 <td>{bus.busNumber ? bus.busNumber : 'N/A'}</td>
//                 <td>{bus.capacity ? bus.capacity : 'N/A'}</td>  
//                 <td>{bus.from ? bus.from : 'N/A'}</td>  
//                 <td>{bus.to ? bus.to : 'N/A'}</td>  
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Container>
//     </>
//   );
// }

// export default Busread;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Table } from 'react-bootstrap';

// function Busread() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/bus');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   return (
//     <>
//       <Container fluid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//         <div style={{ width: '80%' }}>
//           <h1 style={{ textAlign: 'center',color:'orange' }}>Bus Details</h1>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Bus Id</th>
//                 <th>Bus Name</th>
//                 <th>Bus Number</th>
//                 <th>Capacity</th>
//                 <th>From</th>
//                 <th>To</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map(bus => (
//                 <tr key={bus.busId}>
//                   <td>{bus.busId}</td>
//                   <td>{bus.busName ? bus.busName : 'N/A'}</td>
//                   <td>{bus.busNumber ? bus.busNumber : 'N/A'}</td>
//                   <td>{bus.capacity ? bus.capacity : 'N/A'}</td>
//                   <td>{bus.from ? bus.from : 'N/A'}</td>
//                   <td>{bus.to ? bus.to : 'N/A'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </Container>
//     </>
//   );
// }

// export default Busread;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Table } from 'react-bootstrap';

// function Busread() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/bus');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   return (
//     <>
//       <Container fluid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
//         <div style={{ width: '90%', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
//           <h1 style={{ textAlign: 'center', color: 'orange', marginBottom: '20px' }}>Bus Details</h1>
//           <Table striped bordered hover style={{ borderRadius: '10px', overflow: 'hidden' }}>
//             <thead style={{ backgroundColor: '#343a40', color: '#fff' }}>
//               <tr>
//                 <th>Bus Id</th>
//                 <th>Bus Name</th>
//                 <th>Bus Number</th>
//                 <th>Capacity</th>
//                 <th>From</th>
//                 <th>To</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map(bus => (
//                 <tr key={bus.busId}>
//                   <td>{bus.busId}</td>
//                   <td>{bus.busName ? bus.busName : 'N/A'}</td>
//                   <td>{bus.busNumber ? bus.busNumber : 'N/A'}</td>
//                   <td>{bus.capacity ? bus.capacity : 'N/A'}</td>
//                   <td>{bus.from ? bus.from : 'N/A'}</td>
//                   <td>{bus.to ? bus.to : 'N/A'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </Container>
//     </>
//   );
// }

// export default Busread;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

function Busread() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/bus');
      console.log(response.data); // Log data to debug
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <>
      <Container fluid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <div style={{ width: '90%', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h1 style={{ textAlign: 'center', color: 'orange', marginBottom: '20px' }}>Bus Details</h1>
          <Table striped bordered hover style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <thead style={{ backgroundColor: '#343a40', color: '#fff' }}>
              <tr>
                <th>Bus Id</th>
                <th>Bus Name</th>
                <th>Bus Number</th>
                <th>Capacity</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {users.map(bus => (
                <tr key={bus.busId}>
                  <td>{bus.busId}</td>
                  <td>{bus.busName ? bus.busName : 'N/A'}</td>
                  <td>{bus.busNumber ? bus.busNumber : 'N/A'}</td>
                  <td>{bus.capacity ? bus.capacity : 'N/A'}</td>
                  <td>{bus.from ? bus.from : 'N/A'}</td>
                  <td>{bus.to ? bus.to : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default Busread;
