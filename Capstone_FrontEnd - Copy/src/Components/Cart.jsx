

import React, { useContext, useState } from 'react';
import cartContext from '../context/cartContext';
import { Button, Form } from 'react-bootstrap';
import jsPDF from 'jspdf';
import '../App.css'

const Cart = () => {
    const { cartItems, removeItem, incrementItem, decrementItem } = useContext(cartContext);
    const [customerId, setCustomerId] = useState('65e758dbe54394af494031d2');
    const [customerDetails, setCustomerDetails] = useState(null);
    const [discount, setDiscount] = useState(0);

    const handleCustomerIdChange = (e) => {
        setCustomerId(e.target.value);
    };

    const fetchCustomerDetails = async () => {
        try {
            const response = await fetch(`https://capstone-project-qh3r.onrender.com/api/customers/${customerId}`);
            const data = await response.json();
            setCustomerDetails(data);
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }
    };

    const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const cartSubtotal = cartItems.reduce((total, item) => {
        const itemPrice = typeof item.price === 'number' ? item.price : 0;
        const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 0;
        return total + itemPrice * itemQuantity;
    }, 0);

    const discountAmount = cartSubtotal * (discount / 100);
    const cartTotalBeforeGST = cartSubtotal - discountAmount;
    const GST = cartTotalBeforeGST * 0.05;
    const cartTotal = cartTotalBeforeGST + GST;

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Cart Details</title>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                    <style>
                        .cart_items {
                            display: flex;
                            align-items: center;
                            margin-bottom: 20px;
                        }
                        .cart_items_img {
                            flex: 0 0 auto;
                            margin-right: 20px;
                        }
                        .cart_items_info {
                            flex: 1;
                        }
                        .cart_items_info h4 {
                            text-align: right;
                        }
                        .cart_items_info .price {
                            text-align: right;
                        }
                        .quantity {
                            text-align: right;
                        }
                        .Total{
                            text-align:right;
                        }
                        .Subtotal{
                            text-align:right;
                        }
                        .Discount{

                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>Cart Details</h2>
                        <hr/>
                        ${customerDetails ? `
                            <div>
                                <h3>Customer Details:</h3>
                                <p><strong>Name:</strong> ${customerDetails.name}</p>
                                <p><strong>Phone Number:</strong> ${customerDetails.phoneNumber}</p>
                                <p><strong>Email:</strong> ${customerDetails.email}</p>
                                <p><strong>Address:</strong> ${customerDetails.address}</p>
                                <hr/>
                            </div>
                        ` : ''}
                        <div>
                            <h3>Cart Items:</h3>
                            ${cartItems.map(item => `
                                <div class="cart_items">
                                    <div class="cart_items_img">
                                        <img src="${item.imageUrl}" alt="product-img" width="100">
                                    </div>
                                    <div class="cart_items_info">
                                        <h4>${item.name}</h4>
                                        <p class="price">₹ ${item.price.toLocaleString()}</p>
                                        <p class="quantity">Quantity: ${item.quantity}</p> <!-- Align quantity to left -->
                                    </div>
                                </div>
                                <hr/>
                            `).join('')}
                            <h3 class="Total">Subtotal: ₹ ${cartSubtotal.toLocaleString()}</h3>
                            <h3 class="Total">Discount: ₹ ${discountAmount.toLocaleString()}</h3>
                            <h3 class="Total">GST (5%): ₹ ${GST.toLocaleString()}</h3>
                            <h6 class="Total">-------------------------------------------</h6>
                            <h2 class="Total">Total: ₹ ${cartTotal.toLocaleString()}</h2>
                        </div>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        
    };
    
    const handleDownload = () => {
        // PDF download functionality
    };

    return (
        <div className="container">
            <h2>Cart Details</h2>
            <hr />
            <Form.Group controlId="customerId">
                <Form.Label>Customer ID</Form.Label>
                <Form.Control type="text" value={customerId} onChange={handleCustomerIdChange} />
                <Button variant="primary" onClick={fetchCustomerDetails} style={{ marginTop: '10px' }}>Fetch Customer Details</Button>
            </Form.Group>

            {customerDetails && (
                <div>
                    <h4>Customer Name: {customerDetails.name}</h4>
                    <p>Phone Number: {customerDetails.phoneNumber}</p>
                    <p>Email: {customerDetails.email}</p>
                    <p>Address: {customerDetails.address}</p>
                </div>
            )}
            <hr />
            {cartQuantity === 0 ? (
                <h2>Cart is empty</h2>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div className="cart_item" key={item.id}>
                            <div className="item_left">
                                <img src={item.imageUrl} alt="product-img" />
                            </div>
                            <div className="item_right">
                                <div className="item_details">
                                    <h4>{item.name}</h4>
                                    <p className="price">₹ {item.price.toLocaleString()}</p>
                                </div>
                                <div className="item_actions">
                                    <Button variant="outline-primary" onClick={() => decrementItem(item.id)}>-</Button>
                                    <span>{item.quantity}</span>
                                    <Button variant="outline-primary" onClick={() => incrementItem(item.id)}>+</Button>
                                    <Button variant="danger" onClick={() => removeItem(item.id)}>Remove</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <hr />
            <div className="cart_summary">
   
    <div className="button_container">
    
        <Button variant="secondary" onClick={handlePrint}>Print</Button>
        <Button variant="primary" disabled={cartQuantity === 0}>Checkout</Button>
        <label htmlFor="discount">Discount (%):</label>
        <input type="number" id="discount" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value))} />
    </div>


                <div className="totals">
                    <h3>Subtotal: ₹ {cartSubtotal.toLocaleString()}</h3>
                    <h3>Discount: ₹ {discountAmount.toLocaleString()}</h3>
                    <h3>GST (5%): ₹ {GST.toLocaleString()}</h3>
                    <h6 class="Total">-------------------------------------------</h6>
                    <h2>Total: ₹ {cartTotal.toLocaleString()}</h2>
                </div>
            </div>
        </div>
    );
};

export default Cart;
