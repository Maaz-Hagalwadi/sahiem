// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, Form, Button, Alert } from 'react-bootstrap';

// function ProductForm() {
//     const [formData, setFormData] = useState({
//         id: '',
//         name: '',
//         description: '',
//         price: '',
//         stockQuantity: '',
//         imageUrl: ''
//     });
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('https://capstone-project-qh3r.onrender.com/api/products/', formData);
//             setMessage('Product created successfully!');
//             setError('');
//             clearForm();
//         } catch (error) {
//             setMessage('');
//             setError('Error creating product. Please try again.');
//         }
//     };

//     const clearForm = () => {
//         setFormData({
//             id: '',
//             name: '',
//             description: '',
//             price: '',
//             stockQuantity: '',
//             imageUrl: ''
//         });
//     };

//     return (
//         <Container fluid>
//             <h1>Create a New Product</h1>
//             {message && <Alert variant="success">{message}</Alert>}
//             {error && <Alert variant="danger">{error}</Alert>}
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="id">
//                     <Form.Label>ID</Form.Label>
//                     <Form.Control type="number" name="id" value={formData.id} onChange={handleChange} placeholder="Enter ID" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="name">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="description">
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Enter description" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="price">
//                     <Form.Label>Price</Form.Label>
//                     <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Enter price" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="stockQuantity">
//                     <Form.Label>Stock Quantity</Form.Label>
//                     <Form.Control type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} placeholder="Enter stock quantity" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="imageUrl">
//                     <Form.Label>Image URL</Form.Label>
//                     <Form.Control type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Enter image URL" required />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">
//                     Create Product
//                 </Button>
//             </Form>
//         </Container>
//     );
// }

// export default ProductForm;

import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function ProductForm() {
    const [formData, setFormData] = useState({
        busName: '',
        busNumber: '',
        capacity: '',
        busType: '',
        numberOfSeats: '',
        contactNumber: '',
        from: '',
        to: '',
        busRoute: [],
        busRouteTimes: [],
        busRouteFares: [],
        numOfSeats: '',
        runsOnDays: [],
        departure: '',
        arrival: '',
        facilities: [],
        fare: '',
        reviews: [],
        datesAvailable: []
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://capstone-project-qh3r.onrender.com/api/buses/', formData);
            setMessage('Bus created successfully!');
            setError('');
            clearForm();
        } catch (error) {
            setMessage('');
            setError('Error creating bus. Please try again.');
        }
    };

    const clearForm = () => {
        setFormData({
            busName: '',
            busNumber: '',
            capacity: '',
            busType: '',
            numberOfSeats: '',
            contactNumber: '',
            from: '',
            to: '',
            busRoute: [],
            busRouteTimes: [],
            busRouteFares: [],
            numOfSeats: '',
            runsOnDays: [],
            departure: '',
            arrival: '',
            facilities: [],
            fare: '',
            reviews: [],
            datesAvailable: []
        });
    };

    return (
        <Container fluid>
            <h1>Create a New Bus</h1>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="busName">
                    <Form.Label>Bus Name</Form.Label>
                    <Form.Control type="text" name="busName" value={formData.busName} onChange={handleChange} placeholder="Enter bus name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busNumber">
                    <Form.Label>Bus Number</Form.Label>
                    <Form.Control type="text" name="busNumber" value={formData.busNumber} onChange={handleChange} placeholder="Enter bus number" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="capacity">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Enter capacity" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busType">
                    <Form.Label>Bus Type</Form.Label>
                    <Form.Control type="text" name="busType" value={formData.busType} onChange={handleChange} placeholder="Enter bus type" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfSeats">
                    <Form.Label>Number of Seats</Form.Label>
                    <Form.Control type="number" name="numberOfSeats" value={formData.numberOfSeats} onChange={handleChange} placeholder="Enter number of seats" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" name="contactNumber" value={formData.contactNumber} onChange={
handleChange} placeholder="Enter contact number" required />
</Form.Group>

<Form.Group className="mb-3" controlId="from">
    <Form.Label>From</Form.Label>
    <Form.Control type="text" name="from" value={formData.from} onChange={handleChange} placeholder="Enter departure location" required />
</Form.Group>

<Form.Group className="mb-3" controlId="to">
    <Form.Label>To</Form.Label>
    <Form.Control type="text" name="to" value={formData.to} onChange={handleChange} placeholder="Enter arrival location" required />
</Form.Group>

{/* Add other form controls for busRoute, busRouteTimes, busRouteFares, runsOnDays, departure, arrival, facilities, fare, reviews, datesAvailable */}

<Button variant="primary" type="submit">
    Create Bus
</Button>
</Form>
</Container>
);
}

export default ProductForm;
