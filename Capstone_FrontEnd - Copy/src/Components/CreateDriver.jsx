import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function CreateDriver() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        license_no: '',
        bus_id: ''
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
            const response = await axios.post('https://your-api-endpoint.com/api/drivers/', formData);
            setMessage('Driver created successfully!');
            setError('');
            clearForm();
        } catch (error) {
            setMessage('');
            setError('Error creating driver. Please try again.');
        }
    };

    const clearForm = () => {
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            license_no: '',
            bus_id: ''
        });
    };

    return (
        <Container fluid>
            <h1>Create a New Driver</h1>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Enter first name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="last_name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Enter last name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="license_no">
                    <Form.Label>License Number</Form.Label>
                    <Form.Control type="text" name="license_no" value={formData.license_no} onChange={handleChange} placeholder="Enter license number" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="bus_id">
                    <Form.Label>Bus ID</Form.Label>
                    <Form.Control type="text" name="bus_id" value={formData.bus_id} onChange={handleChange} placeholder="Enter bus ID (optional)" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Driver
                </Button>
            </Form>
        </Container>
    );
}

export default CreateDriver;
