import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Toast, Spinner } from 'react-bootstrap';

function BusDelete() {
    const [buses, setBuses] = useState([]);
    const [selectedBusId, setSelectedBusId] = useState('');
    const [selectedBusName, setSelectedBusName] = useState('');
    const [selectedBusCapacity, setSelectedBusCapacity] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBuses();
    }, []);

    const fetchBuses = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3000/bus');
            setBuses(response.data);
        } catch (error) {
            setError('Error fetching buses.');
            console.error('Error fetching buses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBusSelectChange = async (e) => {
        const busId = e.target.value;
        setSelectedBusId(busId);

        if (busId !== 'manual') {
            try {
                const response = await axios.get(`http://localhost:3000/bus/${busId}`);
                setSelectedBusName(response.data.busName);
                setSelectedBusCapacity(response.data.capacity);
            } catch (error) {
                console.error('Error fetching bus:', error);
            }
        } else {
            setSelectedBusName('');
            setSelectedBusCapacity('');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!selectedBusId) {
            alert('Please select a bus.');
            return;
        }

        const confirmDelete = window.confirm('Are you sure you want to delete the bus?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3000/bus/${selectedBusId}`);
            setShowToast(true);
            setSelectedBusId('');
            setSelectedBusName('');
            setSelectedBusCapacity('');
            // Remove the deleted bus from the buses array
            setBuses(buses.filter(bus => bus.id !== parseInt(selectedBusId)));
        } catch (error) {
            console.error('Error deleting bus:', error);
            // Display error message or handle it as needed
        }
    };

    return (
        <Container fluid>
            <h1 style={{textAlign:'center',color:'orange'}}>Remove a Bus</h1>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <Form onSubmit={handleFormSubmit}style={{ maxWidth: '400px', margin: 'auto' }}>
                    <Form.Group className="mb-3" controlId="busId">
                        <Form.Control as="select"  style={{color:'black'}} value={selectedBusId} onChange={handleBusSelectChange}>
                            <option value="">Select Bus ID</option>
                            {buses.map(bus => (
                                <option key={bus.id} value={bus.id}>{bus.id}</option>
                            ))}
                            <option value="manual">Enter ID Manually</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="busName">
                        <Form.Label> Name</Form.Label>
                        <Form.Control type="text" value={selectedBusName} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="busCapacity">
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control type="number" value={selectedBusCapacity} readOnly />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{backgroundColor:'orange',margin:'auto',width:'3x0%'}}>
                        Delete
                    </Button>
                </Form>
            )}

            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <strong className="me-auto">Delete Bus</strong>
                        <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
                    </Toast.Header>
                    <Toast.Body>Bus deleted successfully!</Toast.Body>
                </Toast>
            </div>
        </Container>
    );
}

export default BusDelete;
