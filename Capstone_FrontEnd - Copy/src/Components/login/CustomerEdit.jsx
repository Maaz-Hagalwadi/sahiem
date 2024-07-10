// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Form, Button, Toast } from 'react-bootstrap';

// function Update() {
//     const [users, setUsers] = useState([]);
//     const [selectedUserId, setSelectedUserId] = useState('');
//     const [selectedUserName, setSelectedUserName] = useState('');
//     const [selectedUserEmail, setSelectedUserEmail] = useState('');
//     const [selectedUserPhone, setSelectedUserPhone] = useState('');
//     const [selectedUserAddress, setSelectedUserAddress] = useState('');
//     const [showToast, setShowToast] = useState(false);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('https://capstone-project-qh3r.onrender.com/api/customers/');
//             setUsers(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const handleUserSelectChange = async (e) => {
//         const userId = e.target.value;
//         setSelectedUserId(userId);

//         try {
//             const response = await axios.get(`https://capstone-project-qh3r.onrender.com/api/customers/${userId}`);
//             const userData = response.data;
//             setSelectedUserName(userData.name);
//             setSelectedUserEmail(userData.email);
//             setSelectedUserPhone(userData.phoneNumber);
//             setSelectedUserAddress(userData.address);
//         } catch (error) {
//             console.error('Error fetching user:', error);
//         }
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         if (!selectedUserId) {
//             alert('Please select a user.');
//             return;
//         }

//         try {
//             await axios.put(`https://capstone-project-qh3r.onrender.com/api/customers/${selectedUserId}`, {
//                 name: selectedUserName,
//                 email: selectedUserEmail,
//                 phoneNumber: selectedUserPhone,
//                 address: selectedUserAddress
//             });
//             setShowToast(true);
//             fetchUsers();
//         } catch (error) {
//             console.error('Error updating user:', error);
//         }
//     };

//     return (
//         <Container fluid>
//             <h1>Edit/Update a User</h1>
//             <Form id="updateForm" onSubmit={handleFormSubmit}>
//                 <Form.Group className="mb-3" controlId="userId">
//                     <Form.Label>Select User ID</Form.Label>
//                     <Form.Control as="select" value={selectedUserId} onChange={handleUserSelectChange}>
//                         <option value="">Select User ID</option>
//                         {users.map(user => (
//                             <option key={user._id} value={user._id}>{user._id}</option>
//                         ))}
//                     </Form.Control>
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="name">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control type="text" placeholder="Enter name" value={selectedUserName} onChange={(e) => setSelectedUserName(e.target.value)} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="email">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control type="email" placeholder="Enter email" value={selectedUserEmail} onChange={(e) => setSelectedUserEmail(e.target.value)} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="phone">
//                     <Form.Label>Phone</Form.Label>
//                     <Form.Control type="text" placeholder="Enter phone number" value={selectedUserPhone} onChange={(e) => setSelectedUserPhone(e.target.value)} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="address">
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control type="text" placeholder="Enter address" value={selectedUserAddress} onChange={(e) => setSelectedUserAddress(e.target.value)} />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">
//                     Update
//                 </Button>
//             </Form>

//             <div className="toast-container position-fixed bottom-0 end-0 p-3">
//                 <Toast show={showToast} onClose={() => setShowToast(false)}>
//                     <Toast.Header>
//                         <strong className="me-auto">Update User</strong>
//                         <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
//                     </Toast.Header>
//                     <Toast.Body>User updated successfully!</Toast.Body>
//                 </Toast>
//             </div>
//         </Container>
//     );
// }

// export default Update;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Form, Button, Toast } from 'react-bootstrap';

// function Update() {
//     const [users, setUsers] = useState([]);
//     const [selectedUserId, setSelectedUserId] = useState('');
//     const [selectedUserName, setSelectedUserName] = useState('');
//     const [selectedUserEmail, setSelectedUserEmail] = useState('');
//     const [selectedUserPhone, setSelectedUserPhone] = useState('');
//     const [selectedUserAddress, setSelectedUserAddress] = useState('');
//     const [showToast, setShowToast] = useState(false);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('https://capstone-project-qh3r.onrender.com/api/customers/');
//             setUsers(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const handleUserSelectChange = async (e) => {
//         const userId = e.target.value;
//         setSelectedUserId(userId);

//         try {
//             const response = await axios.get(`https://capstone-project-qh3r.onrender.com/api/customers/${userId}`);
//             const userData = response.data;
//             setSelectedUserName(userData.name);
//             setSelectedUserEmail(userData.email);
//             setSelectedUserPhone(userData.phoneNumber);
//             setSelectedUserAddress(userData.address);
//         } catch (error) {
//             console.error('Error fetching user:', error);
//         }
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         if (!selectedUserId) {
//             alert('Please select a user.');
//             return;
//         }

//         try {
//             await axios.put(`https://capstone-project-qh3r.onrender.com/api/customers/${selectedUserId}`, {
//                 name: selectedUserName,
//                 email: selectedUserEmail,
//                 phoneNumber: selectedUserPhone,
//                 address: selectedUserAddress
//             });
//             setShowToast(true);
//             fetchUsers();
//         } catch (error) {
//             console.error('Error updating user:', error);
//         }
//     };

//     return (
//         <Container fluid>
//             <h1 style={{ color: 'orange', textAlign: 'center', marginBottom: '20px' }}>Edit/Update a User</h1>
//             <Form id="updateForm" onSubmit={handleFormSubmit} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
//                 <Form.Group className="mb-3" controlId="userId">
//                     <Form.Label style={{ color: 'white' }}>Select User ID</Form.Label>
//                     <Form.Control as="select" value={selectedUserId} onChange={handleUserSelectChange} style={{ color: 'white' }}>
//                         <option value="">Select User ID</option>
//                         {users.map(user => (
//                             <option key={user._id} value={user._id}>{user._id}</option>
//                         ))}
//                     </Form.Control>
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="name">
//                     <Form.Label style={{ color: 'white' }}>Name</Form.Label>
//                     <Form.Control type="text" placeholder="Enter name" value={selectedUserName} onChange={(e) => setSelectedUserName(e.target.value)} style={{ color: 'white' }} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="email">
//                     <Form.Label style={{ color: 'white' }}>Email</Form.Label>
//                     <Form.Control type="email" placeholder="Enter email" value={selectedUserEmail} onChange={(e) => setSelectedUserEmail(e.target.value)} style={{ color: 'white' }} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="phone">
//                     <Form.Label style={{ color: 'white' }}>Phone</Form.Label>
//                     <Form.Control type="text" placeholder="Enter phone number" value={selectedUserPhone} onChange={(e) => setSelectedUserPhone(e.target.value)} style={{ color: 'white' }} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="address">
//                     <Form.Label style={{ color: 'white' }}>Address</Form.Label>
//                     <Form.Control type="text" placeholder="Enter address" value={selectedUserAddress} onChange={(e) => setSelectedUserAddress(e.target.value)} style={{ color: 'white' }} />
//                 </Form.Group>

//                 <Button variant="primary" type="submit" style={{ width: '100%' }}>
//                     Update
//                 </Button>
//             </Form>

//             <div className="toast-container position-fixed bottom-0 end-0 p-3">
//                 <Toast show={showToast} onClose={() => setShowToast(false)} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }}>
//                     <Toast.Header>
//                         <strong className="me-auto">Update User</strong>
//                         <button type="button" className="btn-close" onClick={() => setShowToast(false)} style={{ color: 'white' }}></button>
//                     </Toast.Header>
//                     <Toast.Body>User updated successfully!</Toast.Body>
//                 </Toast>
//             </div>
//         </Container>
//     );
// }

// export default Update;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Toast } from 'react-bootstrap';

function Update() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedUserName, setSelectedUserName] = useState('');
    const [selectedUserEmail, setSelectedUserEmail] = useState('');
    const [selectedUserPhone, setSelectedUserPhone] = useState('');
    const [selectedUserAddress, setSelectedUserAddress] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://capstone-project-qh3r.onrender.com/api/customers/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUserSelectChange = async (e) => {
        const userId = e.target.value;
        setSelectedUserId(userId);

        try {
            const response = await axios.get(`https://capstone-project-qh3r.onrender.com/api/customers/${userId}`);
            const userData = response.data;
            setSelectedUserName(userData.name);
            setSelectedUserEmail(userData.email);
            setSelectedUserPhone(userData.phoneNumber);
            setSelectedUserAddress(userData.address);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!selectedUserId) {
            alert('Please select a user.');
            return;
        }

        try {
            await axios.put(`https://capstone-project-qh3r.onrender.com/api/customers/${selectedUserId}`, {
                name: selectedUserName,
                email: selectedUserEmail,
                phoneNumber: selectedUserPhone,
                address: selectedUserAddress
            });
            setShowToast(true);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (


        
        <Container fluid style={{ backgroundColor: '#333', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '10px', maxWidth: '600px', width: '100%' }}>
                <h1 style={{ color: 'orange', textAlign: 'center', marginBottom: '20px' }}>Update a User</h1>
                <Form id="updateForm" onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="userId">
                        <Form.Label style={{ color: 'white' }}>Select User ID</Form.Label>
                        <Form.Control as="select" value={selectedUserId} onChange={handleUserSelectChange} style={{ color: 'black' }}>
                            <option value="">Select User ID</option>
                            {users.map(user => (
                                <option key={user._id} value={user._id}>{user._id}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label style={{ color: 'white' }}>Name</Form.Label>
                        <Form.Control type="text" value={selectedUserName} onChange={(e) => setSelectedUserName(e.target.value)} style={{ color: 'black' }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label style={{ color: 'white' }}>Email</Form.Label>
                        <Form.Control type="email"  value={selectedUserEmail} onChange={(e) => setSelectedUserEmail(e.target.value)} style={{ color: 'black' }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label style={{ color: 'white' }}>Phone</Form.Label>
                        <Form.Control type="text"  value={selectedUserPhone} onChange={(e) => setSelectedUserPhone(e.target.value)} style={{ color: 'black' }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label style={{ color: 'white' }}>Address</Form.Label>
                        <Form.Control type="text"  value={selectedUserAddress} onChange={(e) => setSelectedUserAddress(e.target.value)} style={{ color: 'black' }} />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ width: '100%' }}>
                        Update
                    </Button>
                </Form>

                <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: '1050' }}>
                    <Toast show={showToast} onClose={() => setShowToast(false)} style={{ backgroundColor: '#007BFF', color: 'white' }}>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">Update User</strong>
                        </Toast.Header>
                        <Toast.Body>User updated successfully!</Toast.Body>
                    </Toast>
                </div>
            </div>
        </Container>
    );
}

export default Update;
