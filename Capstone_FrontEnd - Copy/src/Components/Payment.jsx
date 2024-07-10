
// // // // // import React, { useState } from 'react';
// // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // import jsPDF from 'jspdf';
// // // // // import 'jspdf-autotable';

// // // // // const Payment = () => {
// // // // //   const location = useLocation();
// // // // //   const navigate = useNavigate();
// // // // //   const { bookingDetails, customerDetails } = location.state || {};

// // // // //   const {
// // // // //     selectedSeats,
// // // // //     bus,
// // // // //     numPassengers,
// // // // //     discountAmount,
// // // // //     GST,
// // // // //     cartTotal,
// // // // //     from,
// // // // //     to,
// // // // //     fare,
// // // // //     bookingDate,
// // // // //   } = bookingDetails || {};

// // // // //   const [passengerDetails, setPassengerDetails] = useState(
// // // // //     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
// // // // //   );

// // // // //   const handlePassengerChange = (index, field, value) => {
// // // // //     const updatedDetails = passengerDetails.map((passenger, i) =>
// // // // //       i === index ? { ...passenger, [field]: value } : passenger
// // // // //     );
// // // // //     setPassengerDetails(updatedDetails);
// // // // //   };

// // // // //   const validatePassengerDetails = () => {
// // // // //     for (const passenger of passengerDetails) {
// // // // //       if (!passenger.name || !passenger.age || !passenger.gender) {
// // // // //         return false;
// // // // //       }
// // // // //     }
// // // // //     return true;
// // // // //   };

// // // // //   const handleConfirmBooking = async () => {
// // // // //     if (!validatePassengerDetails()) {
// // // // //       alert('Please fill in all passenger details.');
// // // // //       return;
// // // // //     }

// // // // //     const bookingData = {
// // // // //       customerName: customerDetails?.name || 'N/A',
// // // // //       phoneNumber: customerDetails?.phoneNumber || 'N/A',
// // // // //       email: customerDetails?.email || 'N/A',
// // // // //       address: customerDetails?.address || 'N/A',
// // // // //       busId: bus?.busId || 'N/A',
// // // // //       selectedSeats: selectedSeats || [],
// // // // //       passenger_details: passengerDetails,
// // // // //       discountAmount: discountAmount || 0,
// // // // //       GST: GST || 0,
// // // // //       cartTotal: cartTotal || 0,
// // // // //       from,
// // // // //       to,
// // // // //       fare,
// // // // //       busType: bus?.busType || 'N/A',
// // // // //       bookingDate: bookingDate || 'N/A',
// // // // //     };

// // // // //     const seatData = {
// // // // //       busId: bus?.busId || 'N/A',
// // // // //       from,
// // // // //       to,
// // // // //       selectedSeats: selectedSeats.map((seat) => seat + 1) || [],
// // // // //       bookingDate: bookingDate || 'N/A',
// // // // //     };

// // // // //     try {
// // // // //       const bookingResponse = await fetch('http://localhost:3000/booking', {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify(bookingData),
// // // // //       });

// // // // //       if (bookingResponse.ok) {
// // // // //         const bookingResult = await bookingResponse.json();
// // // // //         console.log('Booking confirmed:', bookingResult);

// // // // //         try {
// // // // //           const seatResponse = await fetch('http://localhost:3000/seat', {
// // // // //             method: 'POST',
// // // // //             headers: {
// // // // //               'Content-Type': 'application/json',
// // // // //             },
// // // // //             body: JSON.stringify(seatData),
// // // // //           });

// // // // //           if (seatResponse.ok) {
// // // // //             console.log('Seats booked successfully.');
// // // // //           } else {
// // // // //             const seatErrorData = await seatResponse.json();
// // // // //             console.error('Seat booking error:', seatErrorData);
// // // // //             alert('Failed to book seats. Please try again.');
// // // // //           }
// // // // //         } catch (seatError) {
// // // // //           console.error('Error booking seats:', seatError);
// // // // //           alert('An error occurred while booking the seats. Please try again.');
// // // // //         }

// // // // //         generatePDF(bookingData);
// // // // //         alert('Booking confirmed successfully!');
// // // // //         navigate('/');
// // // // //       } else {
// // // // //         const bookingErrorData = await bookingResponse.json();
// // // // //         console.error('Booking error:', bookingErrorData);
// // // // //         alert('Failed to confirm booking. Please try again.');
// // // // //       }
// // // // //     } catch (bookingError) {
// // // // //       console.error('Error:', bookingError);
// // // // //       alert('An error occurred while confirming the booking. Please try again.');
// // // // //     }
// // // // //   };

// // // // //   const generatePDF = (bookingData) => {
// // // // //     const doc = new jsPDF();
// // // // //     doc.setFontSize(22);
// // // // //     doc.text('Journey -Jet', 105, 20, 'center');
// // // // //     doc.setFontSize(18);
// // // // //     doc.text('Invoice', 105, 35, 'center');

// // // // //     // Bus details section
// // // // //     doc.text('Bus Details:', 20, 100);
// // // // //     doc.autoTable({
// // // // //       startY: 105,
// // // // //       head: [['Attribute', 'Value']],
// // // // //       body: [
// // // // //         ['Bus Name', bus.busName],
// // // // //         ['Bus Number', bus.busNumber],
// // // // //         ['From', bookingData.from],
// // // // //         ['To', bookingData.to],
// // // // //         ['Type', bus.busType],
// // // // //         ['Departure', new Date(bus.departure).toLocaleString()],
// // // // //         ['Arrival', new Date(bus.arrival).toLocaleString()],
// // // // //         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
// // // // //         ['Selected Seats', bookingData.selectedSeats.join(', ')],
// // // // //         ['Number of Passengers', bookingData.passenger_details.length.toString()],
// // // // //         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
// // // // //       ],
// // // // //       didDrawPage: (data) => {
// // // // //         // Add page numbers
// // // // //         doc.setFontSize(12);
// // // // //         doc.text(
// // // // //           'Page ' + doc.internal.getNumberOfPages(),
// // // // //           data.settings.margin.left,
// // // // //           doc.internal.pageSize.height - 10
// // // // //         );
// // // // //       },
// // // // //     });

// // // // //     // Totals section
// // // // //     doc.setFontSize(16);
// // // // //     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
// // // // //     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
// // // // //     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

// // // // //     // Save PDF with a professional filename
// // // // //     doc.save(`Ticket_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
// // // // //   };

// // // // //   return (
// // // // //     <div
// // // // //       className="container"
// // // // //       style={{
// // // // //         textAlign: 'center',
// // // // //         maxWidth: '600px',
// // // // //         margin: 'auto',
// // // // //         backgroundColor: 'rgba(0, 0, 0, 0.05)',
// // // // //         padding: '20px',
// // // // //         borderRadius: '10px',
// // // // //         boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
// // // // //       }}
// // // // //     >
// // // // //       <h2 className="mb-4" style={{ color: 'orange' }}>
// // // // //         Booking Confirmation
// // // // //       </h2>

// // // // //       {customerDetails && (
// // // // //         <div className="mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
// // // // //           <h4>Customer Details:</h4>
// // // // //           <p>
// // // // //             <strong>Name:</strong> {customerDetails.name}
// // // // //           </p>
// // // // //           <p>
// // // // //             <strong>Phone Number:</strong> {customerDetails.phoneNumber}
// // // // //           </p>
// // // // //           <p>
// // // // //             <strong>Email:</strong> {customerDetails.email}
// // // // //           </p>
// // // // //           <p>
// // // // //             <strong>Address:</strong> {customerDetails.address}
// // // // //           </p>
// // // // //         </div>
// // // // //       )}

// // // // //       {bus && (
// // // // //         <div className="mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
// // // // //           <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Bus Details:</h4>
// // // // //           <table className="table table-bordered" style={{  color: 'black' }}>
// // // // //             <tbody>
// // // // //               <tr>
// // // // //                 <th>Bus Name</th>
// // // // //                 <td>{bus.busName}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>Bus Number</th>
// // // // //                 <td>{bus.busNumber}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>From</th>
// // // // //                 <td>{from}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>To</th>
// // // // //                 <td>{to}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>Type</th>
// // // // //                 <td>{bus.busType}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>Departure</th>
// // // // //                 <td>{bus.Route.departure}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>Arrival</th>
// // // // //                 <td>{bus.Route.arrival}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>Fare</th>
// // // // //                 <td>₹ {fare.toLocaleString()}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>Selected Seats</th>
// // // // //                 <td>{selectedSeats.map((seat) => seat + 1).join(', ')}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>Number of Passengers</th>
// // // // //                 <td>{numPassengers}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>Booking Date</th>
// // // // //                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
// // // // //               </tr>
// // // // //             </tbody>
// // // // //           </table>
// // // // //         </div>
// // // // //       )}

// // // // //       <div className="mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
// // // // //         <h4 style={{ color: 'orange' }}>Passenger Details:</h4>
// // // // //         {passengerDetails.map((passenger, index) => (
// // // // //           <div key={index} className="mb-3">
// // // // //             <h5 style={{ color: 'grey' }}>Passenger {index + 1}</h5>
// // // // //             <div className="row">
// // // // //               <div className="col-md-4">
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   className="form-control"
// // // // //                   placeholder="Name"
// // // // //                   value={passenger.name}
// // // // //                   onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="col-md-4">
// // // // //                 <input
// // // // //                   type="number"
// // // // //                   className="form-control"
// // // // //                   placeholder="Age"
// // // // //                   value={passenger.age}
// // // // //                   onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="col-md-4">
// // // // //                 <select
// // // // //                   className="form-control"
// // // // //                   value={passenger.gender}
// // // // //                   onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
// // // // //                 >
// // // // //                   <option value="">Select Gender</option>
// // // // //                   <option value="Male">Male</option>
// // // // //                   <option value="Female">Female</option>
// // // // //                   <option value="Other">Other</option>
// // // // //                 </select>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>

// // // // //       <button className="btn btn-primary" onClick={handleConfirmBooking}>
// // // // //         Confirm Booking
// // // // //       </button>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Payment;

// // // // // // // // import React, { useState } from 'react';
// // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // import PaymentModal from './PaymentModal'; // Import PaymentModal
// // // // // // // // import jsPDF from 'jspdf';
// // // // // // // // import 'jspdf-autotable';

// // // // // // // // const Payment = () => {
// // // // // // // //   const location = useLocation();
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const { bookingDetails, customerDetails } = location.state || {};

// // // // // // // //   const {
// // // // // // // //     selectedSeats,
// // // // // // // //     bus,
// // // // // // // //     numPassengers,
// // // // // // // //     discountAmount,
// // // // // // // //     GST,
// // // // // // // //     cartTotal,
// // // // // // // //     from,
// // // // // // // //     to,
// // // // // // // //     fare,
// // // // // // // //     bookingDate,
// // // // // // // //   } = bookingDetails || {};

// // // // // // // //   const [passengerDetails, setPassengerDetails] = useState(
// // // // // // // //     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
// // // // // // // //   );

// // // // // // // //   const [showModal, setShowModal] = useState(false);

// // // // // // // //   const handlePassengerChange = (index, field, value) => {
// // // // // // // //     const updatedDetails = passengerDetails.map((passenger, i) =>
// // // // // // // //       i === index ? { ...passenger, [field]: value } : passenger
// // // // // // // //     );
// // // // // // // //     setPassengerDetails(updatedDetails);
// // // // // // // //   };

// // // // // // // //   const validatePassengerDetails = () => {
// // // // // // // //     for (const passenger of passengerDetails) {
// // // // // // // //       if (!passenger.name || !passenger.age || !passenger.gender) {
// // // // // // // //         return false;
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //     return true;
// // // // // // // //   };

// // // // // // // //   const handleConfirmBooking = () => {
// // // // // // // //     if (!validatePassengerDetails()) {
// // // // // // // //       alert('Please fill in all passenger details.');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setShowModal(true); // Show the payment modal
// // // // // // // //   };

// // // // // // // //   const handlePaymentSuccess = async () => {
// // // // // // // //     const bookingData = {
// // // // // // // //       customerName: customerDetails?.name || 'N/A',
// // // // // // // //       phoneNumber: customerDetails?.phoneNumber || 'N/A',
// // // // // // // //       email: customerDetails?.email || 'N/A',
// // // // // // // //       address: customerDetails?.address || 'N/A',
// // // // // // // //       busId: bus?.busId || 'N/A',
// // // // // // // //       selectedSeats: selectedSeats || [],
// // // // // // // //       passenger_details: passengerDetails,
// // // // // // // //       discountAmount: discountAmount || 0,
// // // // // // // //       GST: GST || 0,
// // // // // // // //       cartTotal: cartTotal || 0,
// // // // // // // //       from,
// // // // // // // //       to,
// // // // // // // //       fare,
// // // // // // // //       busType: bus?.busType || 'N/A',
// // // // // // // //       bookingDate: bookingDate || 'N/A',
// // // // // // // //     };

// // // // // // // //     const seatData = {
// // // // // // // //       busId: bus?.busId || 'N/A',
// // // // // // // //       from,
// // // // // // // //       to,
// // // // // // // //       selectedSeats: selectedSeats.map((seat) => seat + 1) || [],
// // // // // // // //       bookingDate: bookingDate || 'N/A',
// // // // // // // //     };

// // // // // // // //     try {
// // // // // // // //       const bookingResponse = await fetch('http://localhost:3000/booking', {
// // // // // // // //         method: 'POST',
// // // // // // // //         headers: {
// // // // // // // //           'Content-Type': 'application/json',
// // // // // // // //         },
// // // // // // // //         body: JSON.stringify(bookingData),
// // // // // // // //       });

// // // // // // // //       if (bookingResponse.ok) {
// // // // // // // //         const bookingResult = await bookingResponse.json();
// // // // // // // //         console.log('Booking confirmed:', bookingResult);

// // // // // // // //         try {
// // // // // // // //           const seatResponse = await fetch('http://localhost:3000/seat', {
// // // // // // // //             method: 'POST',
// // // // // // // //             headers: {
// // // // // // // //               'Content-Type': 'application/json',
// // // // // // // //             },
// // // // // // // //             body: JSON.stringify(seatData),
// // // // // // // //           });

// // // // // // // //           if (seatResponse.ok) {
// // // // // // // //             console.log('Seats booked successfully.');
// // // // // // // //           } else {
// // // // // // // //             const seatErrorData = await seatResponse.json();
// // // // // // // //             console.error('Seat booking error:', seatErrorData);
// // // // // // // //             alert('Failed to book seats. Please try again.');
// // // // // // // //           }
// // // // // // // //         } catch (seatError) {
// // // // // // // //           console.error('Error booking seats:', seatError);
// // // // // // // //           alert('An error occurred while booking the seats. Please try again.');
// // // // // // // //         }

// // // // // // // //         generatePDF(bookingData);
// // // // // // // //         alert('Booking confirmed successfully!');
// // // // // // // //         navigate('/');
// // // // // // // //       } else {
// // // // // // // //         const bookingErrorData = await bookingResponse.json();
// // // // // // // //         console.error('Booking error:', bookingErrorData);
// // // // // // // //         alert('Failed to confirm booking. Please try again.');
// // // // // // // //       }
// // // // // // // //     } catch (bookingError) {
// // // // // // // //       console.error('Error:', bookingError);
// // // // // // // //       alert('An error occurred while confirming the booking. Please try again.');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const generatePDF = (bookingData) => {
// // // // // // // //     const doc = new jsPDF();
// // // // // // // //     doc.setFontSize(22);
// // // // // // // //     doc.text('Journey -Jet', 105, 20, 'center');
// // // // // // // //     doc.setFontSize(18);
// // // // // // // //     doc.text('Invoice', 105, 35, 'center');

// // // // // // // //     // Bus details section
// // // // // // // //     doc.text('Bus Details:', 20, 100);
// // // // // // // //     doc.autoTable({
// // // // // // // //       startY: 105,
// // // // // // // //       head: [['Attribute', 'Value']],
// // // // // // // //       body: [
// // // // // // // //         ['Bus Name', bus.busName],
// // // // // // // //         ['Bus Number', bus.busNumber],
// // // // // // // //         ['From', bookingData.from],
// // // // // // // //         ['To', bookingData.to],
// // // // // // // //         ['Type', bus.busType],
// // // // // // // //         ['Departure', new Date(bus.departure).toLocaleString()],
// // // // // // // //         ['Arrival', new Date(bus.arrival).toLocaleString()],
// // // // // // // //         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
// // // // // // // //         ['Selected Seats', bookingData.selectedSeats.join(', ')],
// // // // // // // //         ['Number of Passengers', bookingData.passenger_details.length.toString()],
// // // // // // // //         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
// // // // // // // //       ],
// // // // // // // //       didDrawPage: (data) => {
// // // // // // // //         // Add page numbers
// // // // // // // //         doc.setFontSize(12);
// // // // // // // //         doc.text(
// // // // // // // //           'Page ' + doc.internal.getNumberOfPages(),
// // // // // // // //           data.settings.margin.left,
// // // // // // // //           doc.internal.pageSize.height - 10
// // // // // // // //         );
// // // // // // // //       },
// // // // // // // //     });

// // // // // // // //     // Totals section
// // // // // // // //     doc.setFontSize(16);
// // // // // // // //     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
// // // // // // // //     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
// // // // // // // //     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

// // // // // // // //     // Save PDF with a professional filename
// // // // // // // //     doc.save(`Ticket_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div
// // // // // // // //       className="container"
// // // // // // // //       style={{
// // // // // // // //         textAlign: 'center',
// // // // // // // //         maxWidth: '600px',
// // // // // // // //         margin: 'auto',
// // // // // // // //         backgroundColor: 'rgba(0, 0, 0, 0.05)',
// // // // // // // //         padding: '20px',
// // // // // // // //         borderRadius: '10px',
// // // // // // // //         boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
// // // // // // // //       }}
// // // // // // // //     >
// // // // // // // //       <h2 className="mb-4" style={{ color: 'orange' }}>
// // // // // // // //         Booking Confirmation
// // // // // // // //       </h2>

// // // // // // // //       {customerDetails && (
// // // // // // // //         <div className="mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
// // // // // // // //           <h4>Customer Details:</h4>
// // // // // // // //           <p>
// // // // // // // //             <strong>Name:</strong> {customerDetails.name}
// // // // // // // //           </p>
// // // // // // // //           <p>
// // // // // // // //             <strong>Phone Number:</strong> {customerDetails.phoneNumber}
// // // // // // // //           </p>
// // // // // // // //           <p>
// // // // // // // //             <strong>Email:</strong> {customerDetails.email}
// // // // // // // //           </p>
// // // // // // // //           <p>
// // // // // // // //             <strong>Address:</strong> {customerDetails.address}
// // // // // // // //           </p>
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //       {bus && (
// // // // // // // //         <div className="mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
// // // // // // // //           <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Bus Details:</h4>
// // // // // // // //           <table className="table table-bordered" style={{ color: 'black' }}>
// // // // // // // //             <tbody>
// // // // // // // //               <tr>
// // // // // // // //                 <th>Bus Name</th>
// // // // // // // //                 <td>{bus.busName}</td>
// // // // // // // //               </tr>
// // // // // // // //               <tr>
// // // // // // // //                 <th>Bus Number</th>
// // // // // // // //                 <td>{bus.busNumber}</td>
// // // // // // // //               </tr>
// // // // // // // //               <tr>
// // // // // // // //                 <th>From</th>
// // // // // // // //                 <td>{from}</td>
// // // // // // // //               </tr>
// // // // // // // //               <tr>
// // // // // // // //                 <th>To</th>
// // // // // // // //                 <td>{to}</td>
// // // // // // // //               </tr>
// // // // // // // //               <tr>
// // // // // // // //                 <th>Type</th>
// // // // // // // //                 <td>{bus.busType}</td>
// // // // // // // //               </tr>
// // // // // // // //               <tr>
// // // // // // // //                 <th>Departure</th>
// // // // // // // //                 <td>{bus.Route.departure}</td>
// // // // // // // //               </tr>
// // // // // // // //               <tr>
// // // // // // // //                 <th>Arrival</th>
// // // // // // // //                 <td>{bus.Route.arrival}</td>
// // // // // // // //               </tr>
// // // // // // // //               <tr>
// // // // // // // //                 <th>Fare</th>
// // // // // // // //                 <td>₹ {fare.toLocaleString()}</td>
// // // // // // // //               </tr>
// // // // // // // //               <tr>
// // // // // // // //                 <th>Selected Seats</th>
// // // // // // // //                 <td>{selectedSeats.map((seat) => seat + 1).join(', ')}</td>
// // // // // // // //               </tr>
// // // // // // // //               <tr>
// // // // // // // //                 <th>Number of Passengers</th>
// // // // // // // //                 <td>{numPassengers}</td>
// // // // // // // //               </tr>
// // // // // // // //               <tr>
// // // // // // // //                 <th>Booking Date</th>
// // // // // // // //                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
// // // // // // // //               </tr>
// // // // // // // //             </tbody>
// // // // // // // //           </table>
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //       <h3>Passenger Details</h3>
// // // // // // // //       {passengerDetails.map((passenger, index) => (
// // // // // // // //         <div key={index} className="mb-3">
// // // // // // // //           <input
// // // // // // // //             type="text"
// // // // // // // //             placeholder={`Passenger ${index + 1} Name`}
// // // // // // // //             value={passenger.name}
// // // // // // // //             onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
// // // // // // // //             style={{
// // // // // // // //               padding: '10px',
// // // // // // // //               marginBottom: '10px',
// // // // // // // //               width: '100%',
// // // // // // // //               boxSizing: 'border-box',
// // // // // // // //               border: '1px solid #ccc',
// // // // // // // //               borderRadius: '5px',
// // // // // // // //             }}
// // // // // // // //           />
// // // // // // // //           <input
// // // // // // // //             type="number"
// // // // // // // //             placeholder={`Passenger ${index + 1} Age`}
// // // // // // // //             value={passenger.age}
// // // // // // // //             onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
// // // // // // // //             style={{
// // // // // // // //               padding: '10px',
// // // // // // // //               marginBottom: '10px',
// // // // // // // //               width: '100%',
// // // // // // // //               boxSizing: 'border-box',
// // // // // // // //               border: '1px solid #ccc',
// // // // // // // //               borderRadius: '5px',
// // // // // // // //             }}
// // // // // // // //           />
// // // // // // // //           <select
// // // // // // // //             value={passenger.gender}
// // // // // // // //             onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
// // // // // // // //             style={{
// // // // // // // //               padding: '10px',
// // // // // // // //               width: '100%',
// // // // // // // //               boxSizing: 'border-box',
// // // // // // // //               border: '1px solid #ccc',
// // // // // // // //               borderRadius: '5px',
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             <option value="">Select Gender</option>
// // // // // // // //             <option value="male">Male</option>
// // // // // // // //             <option value="female">Female</option>
// // // // // // // //           </select>
// // // // // // // //         </div>
// // // // // // // //       ))}

// // // // // // // //       <h3>Summary</h3>
// // // // // // // //       <ul className="list-group mb-3">
// // // // // // // //         <li className="list-group-item">Fare: ₹ {fare.toLocaleString()}</li>
// // // // // // // //         <li className="list-group-item">Discount: ₹ {discountAmount.toLocaleString()}</li>
// // // // // // // //         <li className="list-group-item">GST (5%): ₹ {GST.toLocaleString()}</li>
// // // // // // // //         <li className="list-group-item">Total Amount: ₹ {cartTotal.toLocaleString()}</li>
// // // // // // // //       </ul>

// // // // // // // //       <button
// // // // // // // //         onClick={handleConfirmBooking}
// // // // // // // //         className="btn btn-primary"
// // // // // // // //         style={{
// // // // // // // //           width: '100%',
// // // // // // // //           padding: '10px',
// // // // // // // //           backgroundColor: 'orange',
// // // // // // // //           border: 'none',
// // // // // // // //           borderRadius: '5px',
// // // // // // // //           fontSize: '16px',
// // // // // // // //         }}
// // // // // // // //       >
// // // // // // // //         Confirm Booking
// // // // // // // //       </button>

// // // // // // // //       {showModal && (
// // // // // // // //         <PaymentModal
// // // // // // // //           show={showModal}
// // // // // // // //           handleClose={() => setShowModal(false)}
// // // // // // // //           handlePaymentSuccess={handlePaymentSuccess}
// // // // // // // //           totalAmount={cartTotal} // Pass the total amount to PaymentModal
// // // // // // // //         />
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Payment;



// // // // // // // import React, { useState } from 'react';
// // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // import jsPDF from 'jspdf';
// // // // // // // import 'jspdf-autotable';
// // // // // // // import PaymentModal from './PaymentModal';
 
// // // // // // // const Payment = () => {
// // // // // // //   const location = useLocation();
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const { bookingDetails, customerDetails } = location.state || {};
 
// // // // // // //   const {
// // // // // // //     selectedSeats,
// // // // // // //     bus,
// // // // // // //     numPassengers,
// // // // // // //     discountAmount,
// // // // // // //     GST,
// // // // // // //     cartTotal,
// // // // // // //     from,
// // // // // // //     to,
// // // // // // //     fare,
// // // // // // //     bookingDate,
// // // // // // //   } = bookingDetails || {};
 
// // // // // // //   const [passengerDetails, setPassengerDetails] = useState(
// // // // // // //     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
// // // // // // //   );
 
// // // // // // //   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
// // // // // // //   const [bookingData, setBookingData] = useState(null);
 
// // // // // // //   const handlePassengerChange = (index, field, value) => {
// // // // // // //     const updatedDetails = passengerDetails.map((passenger, i) =>
// // // // // // //       i === index ? { ...passenger, [field]: value } : passenger
// // // // // // //     );
// // // // // // //     setPassengerDetails(updatedDetails);
// // // // // // //   };
 
// // // // // // //   const validatePassengerDetails = () => {
// // // // // // //     for (const passenger of passengerDetails) {
// // // // // // //       if (!passenger.name || !passenger.age || !passenger.gender) {
// // // // // // //         return false;
// // // // // // //       }
// // // // // // //     }
// // // // // // //     return true;
// // // // // // //   };
 
// // // // // // //   const handleConfirmBooking = async () => {
// // // // // // //     if (!validatePassengerDetails()) {
// // // // // // //       alert('Please fill in all passenger details.');
// // // // // // //       return;
// // // // // // //     }
 
// // // // // // //     const bookingData = {
// // // // // // //       customerName: customerDetails?.name || 'N/A',
// // // // // // //       phoneNumber: customerDetails?.phoneNumber || 'N/A',
// // // // // // //       email: customerDetails?.email || 'N/A',
// // // // // // //       address: customerDetails?.address || 'N/A',
// // // // // // //       busId: bus?.busId || 'N/A',
// // // // // // //       selectedSeats: selectedSeats || [],
// // // // // // //       passenger_details: passengerDetails,
// // // // // // //       discountAmount: discountAmount || 0,
// // // // // // //       GST: GST || 0,
// // // // // // //       cartTotal: cartTotal || 0,
// // // // // // //       from,
// // // // // // //       to,
// // // // // // //       fare,
// // // // // // //       busType: bus?.busType || 'N/A',
// // // // // // //       bookingDate: bookingDate || 'N/A',
// // // // // // //     };
 
// // // // // // //     const seatData = {
// // // // // // //       busId: bus?.busId || 'N/A',
// // // // // // //       from,
// // // // // // //       to,
// // // // // // //       selectedSeats: selectedSeats.map(seat => seat + 1) || [],
// // // // // // //       bookingDate: bookingDate || 'N/A'
// // // // // // //     };
 
// // // // // // //     try {
// // // // // // //       const bookingResponse = await fetch('http://localhost:3000/booking', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: {
// // // // // // //           'Content-Type': 'application/json',
// // // // // // //         },
// // // // // // //         body: JSON.stringify(bookingData),
// // // // // // //       });
 
// // // // // // //       if (bookingResponse.ok) {
// // // // // // //         const bookingResult = await bookingResponse.json();
// // // // // // //         console.log('Booking confirmed:', bookingResult);
 
// // // // // // //         try {
// // // // // // //           const seatResponse = await fetch('http://localhost:3000/seat', {
// // // // // // //             method: 'POST',
// // // // // // //             headers: {
// // // // // // //               'Content-Type': 'application/json',
// // // // // // //             },
// // // // // // //             body: JSON.stringify(seatData),
// // // // // // //           });
 
// // // // // // //           if (seatResponse.ok) {
// // // // // // //             console.log('Seats booked successfully.');
// // // // // // //           } else {
// // // // // // //             const seatErrorData = await seatResponse.json();
// // // // // // //             console.error('Seat booking error:', seatErrorData);
// // // // // // //             alert('Failed to book seats. Please try again.');
// // // // // // //           }
// // // // // // //         } catch (seatError) {
// // // // // // //           console.error('Error booking seats:', seatError);
// // // // // // //           alert('An error occurred while booking the seats. Please try again.');
// // // // // // //         }
 
// // // // // // //         // Store the booking data in the state and open the payment modal
// // // // // // //         setBookingData(bookingData);
// // // // // // //         setIsPaymentModalOpen(true);
// // // // // // //       } else {
// // // // // // //         const bookingErrorData = await bookingResponse.json();
// // // // // // //         console.error('Booking error:', bookingErrorData);
// // // // // // //         alert('Failed to confirm booking. Please try again.');
// // // // // // //       }
// // // // // // //     } catch (bookingError) {
// // // // // // //       console.error('Error:', bookingError);
// // // // // // //       alert('An error occurred while confirming the booking. Please try again.');
// // // // // // //     }
// // // // // // //   };
 
// // // // // // //   const generatePDF = (bookingData) => {
// // // // // // //     const doc = new jsPDF();
// // // // // // //     doc.setFontSize(22);
// // // // // // //     doc.text('Journey - Jet', 105, 20, 'center');
// // // // // // //     doc.setFontSize(18);
// // // // // // //     doc.text('Invoice', 105, 35, 'center');
 
// // // // // // //     // Bus details section
// // // // // // //     doc.text('Bus Details:', 20, 100);
// // // // // // //     doc.autoTable({
// // // // // // //       startY: 105,
// // // // // // //       head: [['Attribute', 'Value']],
// // // // // // //       body: [
// // // // // // //         ['Bus Name', bus.busName],
// // // // // // //         ['Bus Number', bus.busNumber],
// // // // // // //         ['From', bookingData.from],
// // // // // // //         ['To', bookingData.to],
// // // // // // //         ['Type', bus.busType],
// // // // // // //         ['Departure', new Date(bus.departure).toLocaleString()],
// // // // // // //         ['Arrival', new Date(bus.arrival).toLocaleString()],
// // // // // // //         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
// // // // // // //         ['Selected Seats', bookingData.selectedSeats.join(', ')],
// // // // // // //         ['Number of Passengers', bookingData.passenger_details.length.toString()],
// // // // // // //         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()],
// // // // // // //       ],
// // // // // // //       didDrawPage: (data) => {
// // // // // // //         doc.setFontSize(12);
// // // // // // //         doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
// // // // // // //       },
// // // // // // //     });
 
// // // // // // //     doc.setFontSize(16);
// // // // // // //     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
// // // // // // //     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
// // // // // // //     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);
 
// // // // // // //     doc.save(`JourneyJet_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
 
// // // // // // //     // After generating PDF, send email
// // // // // // //     sendEmail(bookingData);
// // // // // // //   };
 
// // // // // // //   const sendEmail = async (bookingData) => {
// // // // // // //     try {
// // // // // // //       const emailResponse = await fetch('http://localhost:3000/email', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: {
// // // // // // //           'Content-Type': 'application/json',
// // // // // // //         },
// // // // // // //         body: JSON.stringify({
// // // // // // //           recipientEmail: bookingData.email,
// // // // // // //           bookingData: bookingData,
// // // // // // //         }),
// // // // // // //       });
 
// // // // // // //       if (emailResponse.ok) {
// // // // // // //         console.log('Email sent successfully.');
// // // // // // //       } else {
// // // // // // //         const emailErrorData = await emailResponse.json();
// // // // // // //         console.error('Email sending error:', emailErrorData);
// // // // // // //         alert('Failed to send email. Please check your internet connection and try again.');
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error sending email:', error);
// // // // // // //       alert('An error occurred while sending the email. Please try again.');
// // // // // // //     }
// // // // // // //   };
 
// // // // // // //   return (
// // // // // // //     <div className="container">
// // // // // // //       <h2 className="mb-4">Booking Confirmation</h2>
 
// // // // // // //       {customerDetails && (
// // // // // // //         <div className="mb-4">
// // // // // // //           <h4>Customer Details:</h4>
// // // // // // //           <p><strong>Name:</strong> {customerDetails.name}</p>
// // // // // // //           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
// // // // // // //           <p><strong>Email:</strong> {customerDetails.email}</p>
// // // // // // //           <p><strong>Address:</strong> {customerDetails.address}</p>
// // // // // // //         </div>
// // // // // // //       )}
 
// // // // // // //       {bus && (
// // // // // // //         <div className="mb-4">
// // // // // // //           <h4>Bus Details:</h4>
// // // // // // //           <table className="table table-bordered">
// // // // // // //             <tbody>
// // // // // // //               <tr>
// // // // // // //                 <th>Bus Name</th>
// // // // // // //                 <td>{bus.busName}</td>
// // // // // // //               </tr>
// // // // // // //               <tr>
// // // // // // //                 <th>Bus Number</th>
// // // // // // //                 <td>{bus.busNumber}</td>
// // // // // // //               </tr>
// // // // // // //               <tr>
// // // // // // //                 <th>From</th>
// // // // // // //                 <td>{from}</td>
// // // // // // //               </tr>
// // // // // // //               <tr>
// // // // // // //                 <th>To</th>
// // // // // // //                 <td>{to}</td>
// // // // // // //               </tr>
// // // // // // //               <tr>
// // // // // // //                 <th>Type</th>
// // // // // // //                 <td>{bus.busType}</td>
// // // // // // //               </tr>
// // // // // // //               <tr>
// // // // // // //                 <th>Departure</th>
// // // // // // //                 <td>{bus.Route.departure}</td>
// // // // // // //               </tr>
// // // // // // //               <tr>
// // // // // // //                 <th>Arrival</th>
// // // // // // //                 <td>{bus.Route.arrival}</td>
// // // // // // //               </tr>
// // // // // // //               <tr>
// // // // // // //                 <th>Fare</th>
// // // // // // //                 <td>₹ {fare.toLocaleString()}</td>
// // // // // // //               </tr>
// // // // // // //               <tr>
// // // // // // //                 <th>Selected Seats</th>
// // // // // // //                 <td>{selectedSeats.map(seat => seat + 1).join(', ')}</td>
// // // // // // //               </tr>
// // // // // // //               <tr>
// // // // // // //                 <th>Number of Passengers</th>
// // // // // // //                 <td>{numPassengers}</td>
// // // // // // //               </tr>
// // // // // // //               <tr>
// // // // // // //                 <th>Booking Date</th>
// // // // // // //                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
// // // // // // //               </tr>
// // // // // // //             </tbody>
// // // // // // //           </table>
// // // // // // //         </div>
// // // // // // //       )}
 
// // // // // // //       <div className="mb-4">
// // // // // // //         <h4>Passenger Details:</h4>
// // // // // // //         <table className="table passenger-table">
// // // // // // //           <thead>
// // // // // // //             <tr>
// // // // // // //               <th>#</th>
// // // // // // //               <th>Name</th>
// // // // // // //               <th>Age</th>
// // // // // // //               <th>Gender</th>
// // // // // // //             </tr>
// // // // // // //           </thead>
// // // // // // //           <tbody>
// // // // // // //             {passengerDetails.map((passenger, index) => (
// // // // // // //               <tr key={index}>
// // // // // // //                 <td>{index + 1}</td>
// // // // // // //                 <td>
// // // // // // //                   <input
// // // // // // //                     type="text"
// // // // // // //                     className="form-control"
// // // // // // //                     value={passenger.name}
// // // // // // //                     onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
// // // // // // //                     placeholder="Enter Name"
// // // // // // //                   />
// // // // // // //                 </td>
// // // // // // //                 <td>
// // // // // // //                   <input
// // // // // // //                     type="number"
// // // // // // //                     className="form-control"
// // // // // // //                     value={passenger.age}
// // // // // // //                     onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
// // // // // // //                     placeholder="Enter Age"
// // // // // // //                   />
// // // // // // //                 </td>
// // // // // // //                 <td>
// // // // // // //                   <select
// // // // // // //                     className="form-control"
// // // // // // //                     value={passenger.gender}
// // // // // // //                     onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
// // // // // // //                   >
// // // // // // //                     <option value="">Select Gender</option>
// // // // // // //                     <option value="Male">Male</option>
// // // // // // //                     <option value="Female">Female</option>
// // // // // // //                     <option value="Other">Other</option>
// // // // // // //                   </select>
// // // // // // //                 </td>
// // // // // // //               </tr>
// // // // // // //             ))}
// // // // // // //           </tbody>
// // // // // // //         </table>
// // // // // // //       </div>
 
// // // // // // //       <div className="mb-4">
// // // // // // //         <h4>Billing Summary:</h4>
// // // // // // //         <ul className="list-group">
// // // // // // //           <li className="list-group-item"><strong>Discount:</strong> ₹ {discountAmount.toLocaleString()}</li>
// // // // // // //           <li className="list-group-item"><strong>GST (5%):</strong> ₹ {GST.toLocaleString()}</li>
// // // // // // //           <li className="list-group-item"><strong>Total:</strong> ₹ {cartTotal.toLocaleString()}</li>
// // // // // // //         </ul>
// // // // // // //       </div>
 
// // // // // // //       <div className="text-center">
// // // // // // //         <button className="btn btn-primary" onClick={handleConfirmBooking}>Confirm Booking</button>
// // // // // // //         <button className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
// // // // // // //       </div>
 
// // // // // // //       {isPaymentModalOpen && (
// // // // // // //         <PaymentModal
// // // // // // //           show={isPaymentModalOpen}
// // // // // // //           onClose={() => {
// // // // // // //             setIsPaymentModalOpen(false);
// // // // // // //             navigate('/'); // Navigate to another page if needed
// // // // // // //           }}
// // // // // // //           onGeneratePDF={generatePDF}
// // // // // // //           bookingData={bookingData}
// // // // // // //           cartTotal={cartTotal}
// // // // // // //         />
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };
 
// // // // // // // export default Payment;
// // // // // // import React, { useState } from 'react';
// // // // // // import { useLocation, useNavigate } from 'react-router-dom';

// // // // // // import PaymentModal from './PaymentModal';

// // // // // // const Payment = () => {
// // // // // //   const location = useLocation();
// // // // // //   const navigate = useNavigate();
// // // // // //   const { bookingDetails, customerDetails } = location.state || {};

// // // // // //   const {
// // // // // //     selectedSeats,
// // // // // //     bus,
// // // // // //     numPassengers,
// // // // // //     discountAmount,
// // // // // //     GST,
// // // // // //     cartTotal,
// // // // // //     from,
// // // // // //     to,
// // // // // //     fare,
// // // // // //     bookingDate,
// // // // // //   } = bookingDetails || {};

// // // // // //   const [passengerDetails, setPassengerDetails] = useState(
// // // // // //     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
// // // // // //   );

// // // // // //   const handlePassengerChange = (index, field, value) => {
// // // // // //     const updatedDetails = passengerDetails.map((passenger, i) =>
// // // // // //       i === index ? { ...passenger, [field]: value } : passenger
// // // // // //     );
// // // // // //     setPassengerDetails(updatedDetails);
// // // // // //   };

// // // // // //   const validatePassengerDetails = () => {
// // // // // //     for (const passenger of passengerDetails) {
// // // // // //       if (!passenger.name || !passenger.age || !passenger.gender) {
// // // // // //         return false;
// // // // // //       }
// // // // // //     }
// // // // // //     return true;
// // // // // //   };

// // // // // //   const handleConfirmBooking = async () => {
// // // // // //     if (!validatePassengerDetails()) {
// // // // // //       alert('Please fill in all passenger details.');
// // // // // //       return;
// // // // // //     }

// // // // // //     const bookingData = {
// // // // // //       customerName: customerDetails?.name || 'N/A',
// // // // // //       phoneNumber: customerDetails?.phoneNumber || 'N/A',
// // // // // //       email: customerDetails?.email || 'N/A',
// // // // // //       address: customerDetails?.address || 'N/A',
// // // // // //       busId: bus?.busId || 'N/A',
// // // // // //       selectedSeats: selectedSeats || [],
// // // // // //       passenger_details: passengerDetails,
// // // // // //       discountAmount: discountAmount || 0,
// // // // // //       GST: GST || 0,
// // // // // //       cartTotal: cartTotal || 0,
// // // // // //       from,
// // // // // //       to,
// // // // // //       fare,
// // // // // //       busType: bus?.busType || 'N/A',
// // // // // //       bookingDate: bookingDate || 'N/A',
// // // // // //     };

// // // // // //     const seatData = {
// // // // // //       busId: bus?.busId || 'N/A',
// // // // // //       from,
// // // // // //       to,
// // // // // //       selectedSeats: selectedSeats.map((seat) => seat + 1) || [],
// // // // // //       bookingDate: bookingDate || 'N/A',
// // // // // //     };

// // // // // //     try {
// // // // // //       const bookingResponse = await fetch('http://localhost:3000/booking', {
// // // // // //         method: 'POST',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //         },
// // // // // //         body: JSON.stringify(bookingData),
// // // // // //       });

// // // // // //       if (bookingResponse.ok) {
// // // // // //         const bookingResult = await bookingResponse.json();
// // // // // //         console.log('Booking confirmed:', bookingResult);

// // // // // //         try {
// // // // // //           const seatResponse = await fetch('http://localhost:3000/seat', {
// // // // // //             method: 'POST',
// // // // // //             headers: {
// // // // // //               'Content-Type': 'application/json',
// // // // // //             },
// // // // // //             body: JSON.stringify(seatData),
// // // // // //           });

// // // // // //           if (seatResponse.ok) {
// // // // // //             console.log('Seats booked successfully.');
// // // // // //           } else {
// // // // // //             const seatErrorData = await seatResponse.json();
// // // // // //             console.error('Seat booking error:', seatErrorData);
// // // // // //             alert('Failed to book seats. Please try again.');
// // // // // //           }
// // // // // //         } catch (seatError) {
// // // // // //           console.error('Error booking seats:', seatError);
// // // // // //           alert('An error occurred while booking the seats. Please try again.');
// // // // // //         }

// // // // // //         generatePDF(bookingData);
// // // // // //         alert('Booking confirmed successfully!');
// // // // // //         navigate('/');
// // // // // //       } else {
// // // // // //         const bookingErrorData = await bookingResponse.json();
// // // // // //         console.error('Booking error:', bookingErrorData);
// // // // // //         alert('Failed to confirm booking. Please try again.');
// // // // // //       }
// // // // // //     } catch (bookingError) {
// // // // // //       console.error('Error:', bookingError);
// // // // // //       alert('An error occurred while confirming the booking. Please try again.');
// // // // // //     }
// // // // // //   };

// // // // // //   const generatePDF = (bookingData) => {
// // // // // //     const doc = new jsPDF();
// // // // // //     doc.setFontSize(22);
// // // // // //     doc.text('Journey -Jet', 105, 20, 'center');
// // // // // //     doc.setFontSize(18);
// // // // // //     doc.text('Invoice', 105, 35, 'center');

// // // // // //     // Bus details section
// // // // // //     doc.text('Bus Details:', 20, 100);
// // // // // //     doc.autoTable({
// // // // // //       startY: 105,
// // // // // //       head: [['Attribute', 'Value']],
// // // // // //       body: [
// // // // // //         ['Bus Name', bus.busName],
// // // // // //         ['Bus Number', bus.busNumber],
// // // // // //         ['From', bookingData.from],
// // // // // //         ['To', bookingData.to],
// // // // // //         ['Type', bus.busType],
// // // // // //         ['Departure', new Date(bus.departure).toLocaleString()],
// // // // // //         ['Arrival', new Date(bus.arrival).toLocaleString()],
// // // // // //         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
// // // // // //         ['Selected Seats', bookingData.selectedSeats.join(', ')],
// // // // // //         ['Number of Passengers', bookingData.passenger_details.length.toString()],
// // // // // //         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
// // // // // //       ],
// // // // // //       didDrawPage: (data) => {
// // // // // //         // Add page numbers
// // // // // //         doc.setFontSize(12);
// // // // // //         doc.text(
// // // // // //           'Page ' + doc.internal.getNumberOfPages(),
// // // // // //           data.settings.margin.left,
// // // // // //           doc.internal.pageSize.height - 10
// // // // // //         );
// // // // // //       },
// // // // // //     });

// // // // // //     // Totals section
// // // // // //     doc.setFontSize(16);
// // // // // //     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
// // // // // //     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
// // // // // //     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

// // // // // //     // Save PDF with a professional filename
// // // // // //     doc.save(`Ticket_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div
// // // // // //       className="container"
// // // // // //       style={{
// // // // // //         textAlign: 'center',
// // // // // //         maxWidth: '600px',
// // // // // //         margin: 'auto',
// // // // // //         backgroundColor: 'rgba(0, 0, 0, 0.05)',
// // // // // //         padding: '20px',
// // // // // //         borderRadius: '10px',
// // // // // //         boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
// // // // // //       }}
// // // // // //     >
// // // // // //       <h2 className="mb-4" style={{ color: 'orange' }}>
// // // // // //         Booking Confirmation
// // // // // //       </h2>

// // // // // //       {customerDetails && (
// // // // // //         <div className="mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
// // // // // //           <h4>Customer Details:</h4>
// // // // // //           <p>
// // // // // //             <strong>Name:</strong> {customerDetails.name}
// // // // // //           </p>
// // // // // //           <p>
// // // // // //             <strong>Phone Number:</strong> {customerDetails.phoneNumber}
// // // // // //           </p>
// // // // // //           <p>
// // // // // //             <strong>Email:</strong> {customerDetails.email}
// // // // // //           </p>
// // // // // //           <p>
// // // // // //             <strong>Address:</strong> {customerDetails.address}
// // // // // //           </p>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {bus && (
// // // // // //         <div className="mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
// // // // // //           <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Bus Details:</h4>
// // // // // //           <table className="table table-bordered" style={{  color: 'black' }}>
// // // // // //             <tbody>
// // // // // //               <tr>
// // // // // //                 <th>Bus Name</th>
// // // // // //                 <td>{bus.busName}</td>
// // // // // //               </tr>
// // // // // //               <tr>
// // // // // //                 <th>Bus Number</th>
// // // // // //                 <td>{bus.busNumber}</td>
// // // // // //               </tr>
// // // // // //               <tr>
// // // // // //                 <th>From</th>
// // // // // //                 <td>{from}</td>
// // // // // //               </tr>
// // // // // //               <tr>
// // // // // //                 <th>To</th>
// // // // // //                 <td>{to}</td>
// // // // // //               </tr>
// // // // // //               <tr>
// // // // // //                 <th>Type</th>
// // // // // //                 <td>{bus.busType}</td>
// // // // // //               </tr>
// // // // // //               <tr>
// // // // // //                 <th>Departure</th>
// // // // // //                 <td>{bus.Route.departure}</td>
// // // // // //               </tr>
// // // // // //               <tr>
// // // // // //                 <th>Arrival</th>
// // // // // //                 <td>{bus.Route.arrival}</td>
// // // // // //               </tr>
// // // // // //               <tr>
// // // // // //                 <th>Fare</th>
// // // // // //                 <td>₹ {fare.toLocaleString()}</td>
// // // // // //               </tr>
// // // // // //               <tr>
// // // // // //                 <th>Selected Seats</th>
// // // // // //                 <td>{selectedSeats.map((seat) => seat + 1).join(', ')}</td>
// // // // // //               </tr>
// // // // // //               <tr>
// // // // // //                 <th>Number of Passengers</th>
// // // // // //                 <td>{numPassengers}</td>
// // // // // //               </tr>
// // // // // //               <tr>
// // // // // //                 <th>Booking Date</th>
// // // // // //                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
// // // // // //               </tr>
// // // // // //             </tbody>
// // // // // //           </table>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       <div className="mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
// // // // // //         <h4 style={{ color: 'orange' }}>Passenger Details:</h4>
// // // // // //         <table className="table passenger-table">
// // // // // //           <thead>
// // // // // //             <tr>
// // // // // //               <th>#</th>
// // // // // //               <th>Name</th>
// // // // // //               <th>Age</th>
// // // // // //               <th>Gender</th>
// // // // // //             </tr>
// // // // // //           </thead>
// // // // // //           <tbody>
// // // // // //             {passengerDetails.map((passenger, index) => (
// // // // // //               <tr key={index}>
// // // // // //                 <td>{index + 1}</td>
// // // // // //                 <td>
// // // // // //                   <input
// // // // // //                     type="text"
// // // // // //                     value={passenger.name}
// // // // // //                     onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
// // // // // //                     placeholder="Name"
// // // // // //                     className="form-control"
// // // // // //                   />
// // // // // //                 </td>
// // // // // //                 <td>
// // // // // //                   <input
// // // // // //                     type="text"
// // // // // //                     value={passenger.age}
// // // // // //                     onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
// // // // // //                     placeholder="Age"
// // // // // //                     className="form-control"
// // // // // //                   />
// // // // // //                 </td>
// // // // // //                 <td>
// // // // // //                   <select
// // // // // //                     value={passenger.gender}
// // // // // //                     onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
// // // // // //                     className="form-control"
// // // // // //                   >
// // // // // //                     <option value="">Select</option>
// // // // // //                     <option value="Male">Male</option>
// // // // // //                     <option value="Female">Female</option>
// // // // // //                     <option value="Other">Other</option>
// // // // // //                   </select>
// // // // // //                 </td>
// // // // // //               </tr>
// // // // // //             ))}
// // // // // //           </tbody>
// // // // // //         </table>
// // // // // //       </div>

// // // // // //       <button className="btn btn-primary mr-2" onClick={handleConfirmBooking}>
// // // // // //         Confirm Booking
// // // // // //       </button>
// // // // // //       <button className="btn btn-secondary" onClick={() => navigate(-1)}>
// // // // // //         Cancel
// // // // // //       </button>

// // // // // //       <PaymentModal isOpen={isPaymentModalOpen} closeModal={() => setIsPaymentModalOpen(false)} />
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Payment;
// // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // // // import PaymentModal from './PaymentModal'; // Import your PaymentModal component

// // // // // // // // // // // const Payment = () => {
// // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // // //   const { bookingDetails, customerDetails } = location.state || {};

// // // // // // // // // // //   const {
// // // // // // // // // // //     selectedSeats,
// // // // // // // // // // //     bus,
// // // // // // // // // // //     numPassengers,
// // // // // // // // // // //     discountAmount,
// // // // // // // // // // //     GST,
// // // // // // // // // // //     cartTotal,
// // // // // // // // // // //     from,
// // // // // // // // // // //     to,
// // // // // // // // // // //     fare,
// // // // // // // // // // //     bookingDate,
// // // // // // // // // // //   } = bookingDetails || {};

// // // // // // // // // // //   const [passengerDetails, setPassengerDetails] = useState(
// // // // // // // // // // //     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
// // // // // // // // // // //   );
// // // // // // // // // // //   const [showPaymentModal, setShowPaymentModal] = useState(false);

// // // // // // // // // // //   const handlePassengerChange = (index, field, value) => {
// // // // // // // // // // //     const updatedDetails = passengerDetails.map((passenger, i) =>
// // // // // // // // // // //       i === index ? { ...passenger, [field]: value } : passenger
// // // // // // // // // // //     );
// // // // // // // // // // //     setPassengerDetails(updatedDetails);
// // // // // // // // // // //   };

// // // // // // // // // // //   const validatePassengerDetails = () => {
// // // // // // // // // // //     for (const passenger of passengerDetails) {
// // // // // // // // // // //       if (!passenger.name || !passenger.age || !passenger.gender) {
// // // // // // // // // // //         return false;
// // // // // // // // // // //       }
// // // // // // // // // // //     }
// // // // // // // // // // //     return true;
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleConfirmBooking = async () => {
// // // // // // // // // // //     if (!validatePassengerDetails()) {
// // // // // // // // // // //       alert('Please fill in all passenger details.');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     setShowPaymentModal(true); // Show payment modal
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="container">
// // // // // // // // // // //       <h2 className="mb-4">Payment Details</h2>

// // // // // // // // // // //       {/* Display Customer Details */}
// // // // // // // // // // //       {customerDetails && (
// // // // // // // // // // //         <div className="mb-4">
// // // // // // // // // // //           <h4>Customer Details:</h4>
// // // // // // // // // // //           <p><strong>Name:</strong> {customerDetails.name}</p>
// // // // // // // // // // //           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
// // // // // // // // // // //           <p><strong>Email:</strong> {customerDetails.email}</p>
// // // // // // // // // // //           <p><strong>Address:</strong> {customerDetails.address}</p>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       )}

// // // // // // // // // // //       {/* Display Booking Details */}
// // // // // // // // // // //       {bus && (
// // // // // // // // // // //         <div className="mb-4">
// // // // // // // // // // //           <h4>Booking Details:</h4>
// // // // // // // // // // //           <p><strong>Bus Name:</strong> {bus.busName}</p>
// // // // // // // // // // //           <p><strong>Bus Number:</strong> {bus.busNumber}</p>
// // // // // // // // // // //           <p><strong>From:</strong> {from}</p>
// // // // // // // // // // //           <p><strong>To:</strong> {to}</p>
// // // // // // // // // // //           <p><strong>Fare:</strong> ₹ {fare.toLocaleString()}</p>
// // // // // // // // // // //           <p><strong>Selected Seats:</strong> {selectedSeats.map(seat => seat + 1).join(', ')}</p>
// // // // // // // // // // //           <p><strong>Number of Passengers:</strong> {numPassengers}</p>
// // // // // // // // // // //           <p><strong>Booking Date:</strong> {new Date(bookingDate).toLocaleDateString()}</p>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       )}

// // // // // // // // // // //       {/* Passenger Details Form */}
// // // // // // // // // // //       <div className="mb-4">
// // // // // // // // // // //         <h4>Passenger Details:</h4>
// // // // // // // // // // //         {passengerDetails.map((passenger, index) => (
// // // // // // // // // // //           <div key={index} className="mb-3">
// // // // // // // // // // //             <h5>Passenger {index + 1}</h5>
// // // // // // // // // // //             <div className="row">
// // // // // // // // // // //               <div className="col-md-4">
// // // // // // // // // // //                 <input
// // // // // // // // // // //                   type="text"
// // // // // // // // // // //                   className="form-control"
// // // // // // // // // // //                   placeholder="Name"
// // // // // // // // // // //                   value={passenger.name}
// // // // // // // // // // //                   onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
// // // // // // // // // // //                 />
// // // // // // // // // // //               </div>
// // // // // // // // // // //               <div className="col-md-4">
// // // // // // // // // // //                 <input
// // // // // // // // // // //                   type="number"
// // // // // // // // // // //                   className="form-control"
// // // // // // // // // // //                   placeholder="Age"
// // // // // // // // // // //                   value={passenger.age}
// // // // // // // // // // //                   onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
// // // // // // // // // // //                 />
// // // // // // // // // // //               </div>
// // // // // // // // // // //               <div className="col-md-4">
// // // // // // // // // // //                 <select
// // // // // // // // // // //                   className="form-control"
// // // // // // // // // // //                   value={passenger.gender}
// // // // // // // // // // //                   onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   <option value="">Select Gender</option>
// // // // // // // // // // //                   <option value="Male">Male</option>
// // // // // // // // // // //                   <option value="Female">Female</option>
// // // // // // // // // // //                   <option value="Other">Other</option>
// // // // // // // // // // //                 </select>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         ))}
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* Confirm Booking Button */}
// // // // // // // // // // //       <button className="btn btn-primary" onClick={handleConfirmBooking}>
// // // // // // // // // // //         Confirm Booking
// // // // // // // // // // //       </button>

// // // // // // // // // // //       {/* Payment Modal */}
// // // // // // // // // // //       <PaymentModal
// // // // // // // // // // //         show={showPaymentModal}
// // // // // // // // // // //         onClose={() => setShowPaymentModal(false)}
// // // // // // // // // // //         bookingDetails={bookingDetails}
// // // // // // // // // // //         cartTotal={cartTotal}
// // // // // // // // // // //         onSuccess={() => {
// // // // // // // // // // //           navigate('/'); // Navigate back to homepage after successful payment
// // // // // // // // // // //         }}
// // // // // // // // // // //       />
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default Payment;
// // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // // // import PaymentModal from './PaymentModal';

// // // // // // // // // // // const Payment = () => {
// // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // // //   const { bookingDetails, customerDetails } = location.state || {};

// // // // // // // // // // //   const {
// // // // // // // // // // //     selectedSeats,
// // // // // // // // // // //     bus,
// // // // // // // // // // //     numPassengers,
// // // // // // // // // // //     discountAmount,
// // // // // // // // // // //     GST,
// // // // // // // // // // //     cartTotal,
// // // // // // // // // // //     from,
// // // // // // // // // // //     to,
// // // // // // // // // // //     fare,
// // // // // // // // // // //     bookingDate,
// // // // // // // // // // //   } = bookingDetails || {};

// // // // // // // // // // //   const [passengerDetails, setPassengerDetails] = useState(
// // // // // // // // // // //     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
// // // // // // // // // // //   );

// // // // // // // // // // //   const [showPaymentModal, setShowPaymentModal] = useState(false);

// // // // // // // // // // //   const handlePassengerChange = (index, field, value) => {
// // // // // // // // // // //     const updatedDetails = passengerDetails.map((passenger, i) =>
// // // // // // // // // // //       i === index ? { ...passenger, [field]: value } : passenger
// // // // // // // // // // //     );
// // // // // // // // // // //     setPassengerDetails(updatedDetails);
// // // // // // // // // // //   };

// // // // // // // // // // //   const validatePassengerDetails = () => {
// // // // // // // // // // //     for (const passenger of passengerDetails) {
// // // // // // // // // // //       if (!passenger.name || !passenger.age || !passenger.gender) {
// // // // // // // // // // //         return false;
// // // // // // // // // // //       }
// // // // // // // // // // //     }
// // // // // // // // // // //     return true;
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleConfirmBooking = () => {
// // // // // // // // // // //     if (!validatePassengerDetails()) {
// // // // // // // // // // //       alert('Please fill in all passenger details.');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     setShowPaymentModal(true);
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="container">
// // // // // // // // // // //       <h2 className="mb-4">Booking Confirmation</h2>

// // // // // // // // // // //       {customerDetails && (
// // // // // // // // // // //         <div className="mb-4">
// // // // // // // // // // //           <h4>Customer Details:</h4>
// // // // // // // // // // //           <p><strong>Name:</strong> {customerDetails.name}</p>
// // // // // // // // // // //           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
// // // // // // // // // // //           <p><strong>Email:</strong> {customerDetails.email}</p>
// // // // // // // // // // //           <p><strong>Address:</strong> {customerDetails.address}</p>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       )}

// // // // // // // // // // //       {bus && (
// // // // // // // // // // //         <div className="mb-4">
// // // // // // // // // // //           <h4>Bus Details:</h4>
// // // // // // // // // // //           <table className="table table-bordered">
// // // // // // // // // // //             <tbody>
// // // // // // // // // // //               <tr><th>Bus Name</th><td>{bus.busName}</td></tr>
// // // // // // // // // // //               <tr><th>Bus Number</th><td>{bus.busNumber}</td></tr>
// // // // // // // // // // //               <tr><th>From</th><td>{from}</td></tr>
// // // // // // // // // // //               <tr><th>To</th><td>{to}</td></tr>
// // // // // // // // // // //               <tr><th>Type</th><td>{bus.busType}</td></tr>
// // // // // // // // // // //               <tr><th>Departure</th><td>{bus.Route.departure}</td></tr>
// // // // // // // // // // //               <tr><th>Arrival</th><td>{bus.Route.arrival}</td></tr>
// // // // // // // // // // //               <tr><th>Fare</th><td>₹ {fare.toLocaleString()}</td></tr>
// // // // // // // // // // //               <tr><th>Selected Seats</th><td>{selectedSeats.map(seat => seat + 1).join(', ')}</td></tr>
// // // // // // // // // // //               <tr><th>Number of Passengers</th><td>{numPassengers}</td></tr>
// // // // // // // // // // //               <tr><th>Booking Date</th><td>{new Date(bookingDate).toLocaleDateString()}</td></tr>
// // // // // // // // // // //             </tbody>
// // // // // // // // // // //           </table>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       )}

// // // // // // // // // // //       <div className="mb-4">
// // // // // // // // // // //         <h4>Passenger Details:</h4>
// // // // // // // // // // //         {passengerDetails.map((passenger, index) => (
// // // // // // // // // // //           <div key={index} className="mb-3">
// // // // // // // // // // //             <h5>Passenger {index + 1}</h5>
// // // // // // // // // // //             <div className="row">
// // // // // // // // // // //               <div className="col-md-4">
// // // // // // // // // // //                 <input
// // // // // // // // // // //                   type="text"
// // // // // // // // // // //                   className="form-control"
// // // // // // // // // // //                   placeholder="Name"
// // // // // // // // // // //                   value={passenger.name}
// // // // // // // // // // //                   onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
// // // // // // // // // // //                 />
// // // // // // // // // // //               </div>
// // // // // // // // // // //               <div className="col-md-4">
// // // // // // // // // // //                 <input
// // // // // // // // // // //                   type="number"
// // // // // // // // // // //                   className="form-control"
// // // // // // // // // // //                   placeholder="Age"
// // // // // // // // // // //                   value={passenger.age}
// // // // // // // // // // //                   onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
// // // // // // // // // // //                 />
// // // // // // // // // // //               </div>
// // // // // // // // // // //               <div className="col-md-4">
// // // // // // // // // // //                 <select
// // // // // // // // // // //                   className="form-control"
// // // // // // // // // // //                   value={passenger.gender}
// // // // // // // // // // //                   onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   <option value="">Select Gender</option>
// // // // // // // // // // //                   <option value="Male">Male</option>
// // // // // // // // // // //                   <option value="Female">Female</option>
// // // // // // // // // // //                   <option value="Other">Other</option>
// // // // // // // // // // //                 </select>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         ))}
// // // // // // // // // // //       </div>

// // // // // // // // // // //       <button className="btn btn-primary" onClick={handleConfirmBooking}>
// // // // // // // // // // //         Confirm Booking
// // // // // // // // // // //       </button>

// // // // // // // // // // //       {/* PaymentModal component */}
// // // // // // // // // // //       <PaymentModal
// // // // // // // // // // //         show={showPaymentModal}
// // // // // // // // // // //         onClose={() => setShowPaymentModal(false)}
// // // // // // // // // // //         bookingDetails={bookingDetails}
// // // // // // // // // // //         cartTotal={cartTotal}
// // // // // // // // // // //       />
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default Payment;
// // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // // import PaymentModal from './PaymentModal'; // Import your PaymentModal component
// // // // // // // // // // import jsPDF from 'jspdf';
// // // // // // // // // // import 'jspdf-autotable';

// // // // // // // // // // const Payment = () => {
// // // // // // // // // //   const location = useLocation();
// // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // //   const { bookingDetails, customerDetails } = location.state || {};

// // // // // // // // // //   const {
// // // // // // // // // //     selectedSeats,
// // // // // // // // // //     bus,
// // // // // // // // // //     numPassengers,
// // // // // // // // // //     discountAmount,
// // // // // // // // // //     GST,
// // // // // // // // // //     cartTotal,
// // // // // // // // // //     from,
// // // // // // // // // //     to,
// // // // // // // // // //     fare,
// // // // // // // // // //     bookingDate,
// // // // // // // // // //   } = bookingDetails || {};

// // // // // // // // // //   const [passengerDetails, setPassengerDetails] = useState(
// // // // // // // // // //     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
// // // // // // // // // //   );
// // // // // // // // // //   const [showPaymentModal, setShowPaymentModal] = useState(false);

// // // // // // // // // //   const handlePassengerChange = (index, field, value) => {
// // // // // // // // // //     const updatedDetails = passengerDetails.map((passenger, i) =>
// // // // // // // // // //       i === index ? { ...passenger, [field]: value } : passenger
// // // // // // // // // //     );
// // // // // // // // // //     setPassengerDetails(updatedDetails);
// // // // // // // // // //   };

// // // // // // // // // //   const validatePassengerDetails = () => {
// // // // // // // // // //     for (const passenger of passengerDetails) {
// // // // // // // // // //       if (!passenger.name || !passenger.age || !passenger.gender) {
// // // // // // // // // //         return false;
// // // // // // // // // //       }
// // // // // // // // // //     }
// // // // // // // // // //     return true;
// // // // // // // // // //   };

// // // // // // // // // //   const handleConfirmBooking = async () => {
// // // // // // // // // //     if (!validatePassengerDetails()) {
// // // // // // // // // //       alert('Please fill in all passenger details.');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     setShowPaymentModal(true); // Show payment modal
// // // // // // // // // //   };

// // // // // // // // // //   const handleGeneratePDF = () => {
// // // // // // // // // //     const doc = new jsPDF();
// // // // // // // // // //     doc.setFontSize(22);
// // // // // // // // // //     doc.text('Journey -Jet', 105, 20, 'center');
// // // // // // // // // //     doc.setFontSize(18);
// // // // // // // // // //     doc.text('Invoice', 105, 35, 'center');

// // // // // // // // // //     // Bus details section
// // // // // // // // // //     doc.text('Bus Details:', 20, 100);
// // // // // // // // // //     doc.autoTable({
// // // // // // // // // //       startY: 105,
// // // // // // // // // //       head: [['Attribute', 'Value']],
// // // // // // // // // //       body: [
// // // // // // // // // //         ['Bus Name', bus.busName],
// // // // // // // // // //         ['Bus Number', bus.busNumber],
// // // // // // // // // //         ['From', from],
// // // // // // // // // //         ['To', to],
// // // // // // // // // //         ['Type', bus.busType],
// // // // // // // // // //         ['Departure', new Date(bus.departure).toLocaleString()],
// // // // // // // // // //         ['Arrival', new Date(bus.arrival).toLocaleString()],
// // // // // // // // // //         ['Fare', `₹ ${fare.toLocaleString()}`],
// // // // // // // // // //         ['Selected Seats', selectedSeats.map((seat) => seat + 1).join(', ')],
// // // // // // // // // //         ['Number of Passengers', passengerDetails.length.toString()],
// // // // // // // // // //         ['Booking Date', new Date(bookingDate).toLocaleDateString()], // Display booking date
// // // // // // // // // //       ],
// // // // // // // // // //       didDrawPage: (data) => {
// // // // // // // // // //         // Add page numbers
// // // // // // // // // //         doc.setFontSize(12);
// // // // // // // // // //         doc.text(
// // // // // // // // // //           'Page ' + doc.internal.getNumberOfPages(),
// // // // // // // // // //           data.settings.margin.left,
// // // // // // // // // //           doc.internal.pageSize.height - 10
// // // // // // // // // //         );
// // // // // // // // // //       },
// // // // // // // // // //     });

// // // // // // // // // //     // Totals section
// // // // // // // // // //     doc.setFontSize(16);
// // // // // // // // // //     doc.text(`Discount: ₹ ${discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
// // // // // // // // // //     doc.text(`GST (5%): ₹ ${GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
// // // // // // // // // //     doc.text(`Total: ₹ ${cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

// // // // // // // // // //     // Save PDF with a professional filename
// // // // // // // // // //     doc.save(`Ticket_Invoice_${customerDetails.name.replace(/\s/g, '_')}.pdf`);
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="container">
// // // // // // // // // //       <h2 className="mb-4" style={{ color: 'orange', textAlign: 'center' }}>
// // // // // // // // // //         Booking Confirmation
// // // // // // // // // //       </h2>

// // // // // // // // // //       {/* Display Customer Details */}
// // // // // // // // // //       {customerDetails && (
// // // // // // // // // //         <div className="mb-4">
// // // // // // // // // //           <h4>Customer Details:</h4>
// // // // // // // // // //           <p><strong>Name:</strong> {customerDetails.name}</p>
// // // // // // // // // //           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
// // // // // // // // // //           <p><strong>Email:</strong> {customerDetails.email}</p>
// // // // // // // // // //           <p><strong>Address:</strong> {customerDetails.address}</p>
// // // // // // // // // //         </div>
// // // // // // // // // //       )}

// // // // // // // // // //       {/* Display Bus Details */}
// // // // // // // // // //       {bus && (
// // // // // // // // // //         <div className="mb-4">
// // // // // // // // // //           <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Bus Details:</h4>
// // // // // // // // // //           <table className="table table-bordered">
// // // // // // // // // //             <tbody>
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <th>Bus Name</th>
// // // // // // // // // //                 <td>{bus.busName}</td>
// // // // // // // // // //               </tr>
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <th>Bus Number</th>
// // // // // // // // // //                 <td>{bus.busNumber}</td>
// // // // // // // // // //               </tr>
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <th>From</th>
// // // // // // // // // //                 <td>{from}</td>
// // // // // // // // // //               </tr>
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <th>To</th>
// // // // // // // // // //                 <td>{to}</td>
// // // // // // // // // //               </tr>
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <th>Type</th>
// // // // // // // // // //                 <td>{bus.busType}</td>
// // // // // // // // // //               </tr>
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <th>Departure</th>
// // // // // // // // // //                 <td>{new Date(bus.departure).toLocaleString()}</td>
// // // // // // // // // //               </tr>
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <th>Arrival</th>
// // // // // // // // // //                 <td>{new Date(bus.arrival).toLocaleString()}</td>
// // // // // // // // // //               </tr>
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <th>Fare</th>
// // // // // // // // // //                 <td>₹ {fare.toLocaleString()}</td>
// // // // // // // // // //               </tr>
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <th>Selected Seats</th>
// // // // // // // // // //                 <td>{selectedSeats.map((seat) => seat + 1).join(', ')}</td>
// // // // // // // // // //               </tr>
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <th>Number of Passengers</th>
// // // // // // // // // //                 <td>{passengerDetails.length}</td>
// // // // // // // // // //               </tr>
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <th>Booking Date</th>
// // // // // // // // // //                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
// // // // // // // // // //               </tr>
// // // // // // // // // //             </tbody>
// // // // // // // // // //           </table>
// // // // // // // // // //         </div>
// // // // // // // // // //       )}

// // // // // // // // // //       {/* Display Passenger Details */}
// // // // // // // // // //       <div className="mb-4">
// // // // // // // // // //         <h4 style={{ color: 'orange' }}>Passenger Details:</h4>
// // // // // // // // // //         {passengerDetails.map((passenger, index) => (
// // // // // // // // // //           <div key={index} className="mb-3">
// // // // // // // // // //             <h5 style={{ color: 'grey' }}>Passenger {index + 1}</h5>
// // // // // // // // // //             <div className="row">
// // // // // // // // // //               <div className="col-md-4">
// // // // // // // // // //                 <input
// // // // // // // // // //                   type="text"
// // // // // // // // // //                   className="form-control"
// // // // // // // // // //                   placeholder="Name"
// // // // // // // // // //                   value={passenger.name}
// // // // // // // // // //                   onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
// // // // // // // // // //                 />
// // // // // // // // // //               </div>
// // // // // // // // // //               <div className="col-md-4">
// // // // // // // // // //                 <input
// // // // // // // // // //                   type="number"
// // // // // // // // // //                   className="form-control"
// // // // // // // // // //                   placeholder="Age"
// // // // // // // // // //                   value={passenger.age}
// // // // // // // // // //                   onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
// // // // // // // // // //                 />
// // // // // // // // // //               </div>
// // // // // // // // // //               <div className="col-md-4">
// // // // // // // // // //                 <select
// // // // // // // // // //                   className="form-control"
// // // // // // // // // //                   value={passenger.gender}
// // // // // // // // // //                   onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
// // // // // // // // // //                 >
// // // // // // // // // //                   <option value="">Select Gender</option>
// // // // // // // // // //                   <option value="Male">Male</option>
// // // // // // // // // //                   <option value="Female">Female</option>
// // // // // // // // // //                   <option value="Other">Other</option>
// // // // // // // // // //                 </select>
// // // // // // // // // //               </div>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         ))}
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* Confirm Booking Button */}
// // // // // // // // // //       <button className="btn btn-primary" onClick={handleConfirmBooking}>
// // // // // // // // // //         Confirm Booking
// // // // // // // // // //       </button>

// // // // // // // // // //       {/* Payment Modal */}
// // // // // // // // // //       <PaymentModal
// // // // // // // // // //         show={showPaymentModal}
// // // // // // // // // //         onClose={() => setShowPaymentModal(false)}
// // // // // // // // // //         onPaymentSuccess={() => {
// // // // // // // // // //           handleGeneratePDF();
// // // // // // // // // //           setShowPaymentModal(false);
// // // // // // // // // //           alert('Payment successful!'); // You can customize this alert message
// // // // // // // // // //           navigate('/'); // Navigate to home page or any other desired route
// // // // // // // // // //         }}
// // // // // // // // // //         onPaymentFailure={() => {
// // // // // // // // // //           setShowPaymentModal(false);
// // // // // // // // // //           alert('Payment failed. Please try again.'); // You can customize this alert message
// // // // // // // // // //         }}
// // // // // // // // // //         bookingData={bookingDetails}
// // // // // // // // // //         cartTotal={cartTotal}
// // // // // // // // // //       />
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default Payment;


// // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // // import PaymentModal from './PaymentModal'; // Assume you have this component for handling payment

// // // // // // // // // // const Payment = () => {
// // // // // // // // // //   const location = useLocation();
// // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // //   const { bookingDetails } = location.state || {};
// // // // // // // // // //   const [showPaymentModal, setShowPaymentModal] = useState(false);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (!bookingDetails) {
// // // // // // // // // //       navigate('/');
// // // // // // // // // //     }
// // // // // // // // // //   }, [bookingDetails, navigate]);

// // // // // // // // // //   const handleConfirmBooking = () => {
// // // // // // // // // //     setShowPaymentModal(true);
// // // // // // // // // //   };

// // // // // // // // // //   const handleGeneratePDF = () => {
// // // // // // // // // //     // Logic to generate PDF based on bookingDetails
// // // // // // // // // //   };

// // // // // // // // // //   if (!bookingDetails) {
// // // // // // // // // //     return <div>No booking details available</div>;
// // // // // // // // // //   }

// // // // // // // // // //   const { selectedSeats, bus, numPassengers, from, to, fare, bookingDate } = bookingDetails;
// // // // // // // // // //   const cartTotal = selectedSeats.length * fare;

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="container">
// // // // // // // // // //       <h2>Payment Details</h2>
// // // // // // // // // //       <div className="card">
// // // // // // // // // //         <div className="card-body">
// // // // // // // // // //           <h5 className="card-title">Booking Summary</h5>
// // // // // // // // // //           <p><strong>From:</strong> {from}</p>
// // // // // // // // // //           <p><strong>To:</strong> {to}</p>
// // // // // // // // // //           <p><strong>Date:</strong> {new Date(bookingDate).toLocaleDateString()}</p>
// // // // // // // // // //           <p><strong>Number of Passengers:</strong> {numPassengers}</p>
// // // // // // // // // //           <p><strong>Fare:</strong> ₹{fare.toLocaleString()}</p>
// // // // // // // // // //           <p><strong>Selected Seats:</strong> {selectedSeats.join(', ')}</p>
// // // // // // // // // //           <p><strong>Total Amount:</strong> ₹{cartTotal.toLocaleString()}</p>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       <button className="btn btn-primary mt-3" onClick={handleConfirmBooking}>
// // // // // // // // // //         Proceed to Payment
// // // // // // // // // //       </button>

// // // // // // // // // //       <PaymentModal
// // // // // // // // // //         show={showPaymentModal}
// // // // // // // // // //         onClose={() => setShowPaymentModal(false)}
// // // // // // // // // //         onPaymentSuccess={() => {
// // // // // // // // // //           handleGeneratePDF();
// // // // // // // // // //           setShowPaymentModal(false);
// // // // // // // // // //           alert('Payment successful!'); // You can customize this alert message
// // // // // // // // // //           navigate('/'); // Navigate to home page or any other desired route
// // // // // // // // // //         }}
// // // // // // // // // //         onPaymentFailure={() => {
// // // // // // // // // //           setShowPaymentModal(false);
// // // // // // // // // //           alert('Payment failed. Please try again.'); // You can customize this alert message
// // // // // // // // // //         }}
// // // // // // // // // //         bookingData={bookingDetails}
// // // // // // // // // //         cartTotal={cartTotal}
// // // // // // // // // //       />
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default Payment;
// // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // import PaymentModal from './PaymentModal'; // Import PaymentModal
// // // // // // // // // import jsPDF from 'jspdf';
// // // // // // // // // import 'jspdf-autotable';

// // // // // // // // // const Payment = () => {
// // // // // // // // //   const location = useLocation();
// // // // // // // // //   const navigate = useNavigate();
// // // // // // // // //   const { bookingDetails, customerDetails } = location.state || {};

// // // // // // // // //   const {
// // // // // // // // //     selectedSeats,
// // // // // // // // //     bus,
// // // // // // // // //     numPassengers,
// // // // // // // // //     discountAmount,
// // // // // // // // //     GST,
// // // // // // // // //     cartTotal,
// // // // // // // // //     from,
// // // // // // // // //     to,
// // // // // // // // //     fare,
// // // // // // // // //     bookingDate,
// // // // // // // // //   } = bookingDetails || {};

// // // // // // // // //   const [passengerDetails, setPassengerDetails] = useState(
// // // // // // // // //     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
// // // // // // // // //   );

// // // // // // // // //   const [showModal, setShowModal] = useState(false);

// // // // // // // // //   const handlePassengerChange = (index, field, value) => {
// // // // // // // // //     const updatedDetails = passengerDetails.map((passenger, i) =>
// // // // // // // // //       i === index ? { ...passenger, [field]: value } : passenger
// // // // // // // // //     );
// // // // // // // // //     setPassengerDetails(updatedDetails);
// // // // // // // // //   };

// // // // // // // // //   const validatePassengerDetails = () => {
// // // // // // // // //     for (const passenger of passengerDetails) {
// // // // // // // // //       if (!passenger.name || !passenger.age || !passenger.gender) {
// // // // // // // // //         return false;
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //     return true;
// // // // // // // // //   };

// // // // // // // // //   const handleConfirmBooking = () => {
// // // // // // // // //     if (!validatePassengerDetails()) {
// // // // // // // // //       alert('Please fill in all passenger details.');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setShowModal(true); // Show the payment modal
// // // // // // // // //   };

// // // // // // // // //   const handlePaymentSuccess = async () => {
// // // // // // // // //     const bookingData = {
// // // // // // // // //       customerName: customerDetails?.name || 'N/A',
// // // // // // // // //       phoneNumber: customerDetails?.phoneNumber || 'N/A',
// // // // // // // // //       email: customerDetails?.email || 'N/A',
// // // // // // // // //       address: customerDetails?.address || 'N/A',
// // // // // // // // //       busId: bus?.busId || 'N/A',
// // // // // // // // //       selectedSeats: selectedSeats || [],
// // // // // // // // //       passenger_details: passengerDetails,
// // // // // // // // //       discountAmount: discountAmount || 0,
// // // // // // // // //       GST: GST || 0,
// // // // // // // // //       cartTotal: cartTotal || 0,
// // // // // // // // //       from,
// // // // // // // // //       to,
// // // // // // // // //       fare,
// // // // // // // // //       busType: bus?.busType || 'N/A',
// // // // // // // // //       bookingDate: bookingDate || 'N/A',
// // // // // // // // //     };

// // // // // // // // //     const seatData = {
// // // // // // // // //       busId: bus?.busId || 'N/A',
// // // // // // // // //       from,
// // // // // // // // //       to,
// // // // // // // // //       selectedSeats: selectedSeats.map((seat) => seat + 1) || [],
// // // // // // // // //       bookingDate: bookingDate || 'N/A',
// // // // // // // // //     };

// // // // // // // // //     try {
// // // // // // // // //       const bookingResponse = await fetch('http://localhost:3000/booking', {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         headers: {
// // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // //         },
// // // // // // // // //         body: JSON.stringify(bookingData),
// // // // // // // // //       });

// // // // // // // // //       if (bookingResponse.ok) {
// // // // // // // // //         const bookingResult = await bookingResponse.json();
// // // // // // // // //         console.log('Booking confirmed:', bookingResult);

// // // // // // // // //         try {
// // // // // // // // //           const seatResponse = await fetch('http://localhost:3000/seat', {
// // // // // // // // //             method: 'POST',
// // // // // // // // //             headers: {
// // // // // // // // //               'Content-Type': 'application/json',
// // // // // // // // //             },
// // // // // // // // //             body: JSON.stringify(seatData),
// // // // // // // // //           });

// // // // // // // // //           if (seatResponse.ok) {
// // // // // // // // //             console.log('Seats booked successfully.');
// // // // // // // // //           } else {
// // // // // // // // //             const seatErrorData = await seatResponse.json();
// // // // // // // // //             console.error('Seat booking error:', seatErrorData);
// // // // // // // // //             alert('Failed to book seats. Please try again.');
// // // // // // // // //           }
// // // // // // // // //         } catch (seatError) {
// // // // // // // // //           console.error('Error booking seats:', seatError);
// // // // // // // // //           alert('An error occurred while booking the seats. Please try again.');
// // // // // // // // //         }

// // // // // // // // //         generatePDF(bookingData);
// // // // // // // // //         alert('Booking confirmed successfully!');
// // // // // // // // //         navigate('/');
// // // // // // // // //       } else {
// // // // // // // // //         const bookingErrorData = await bookingResponse.json();
// // // // // // // // //         console.error('Booking error:', bookingErrorData);
// // // // // // // // //         alert('Failed to confirm booking. Please try again.');
// // // // // // // // //       }
// // // // // // // // //     } catch (bookingError) {
// // // // // // // // //       console.error('Error:', bookingError);
// // // // // // // // //       alert('An error occurred while confirming the booking. Please try again.');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const generatePDF = (bookingData) => {
// // // // // // // // //     const doc = new jsPDF();
// // // // // // // // //     doc.setFontSize(22);
// // // // // // // // //     doc.text('Journey -Jet', 105, 20, 'center');
// // // // // // // // //     doc.setFontSize(18);
// // // // // // // // //     doc.text('Invoice', 105, 35, 'center');

// // // // // // // // //     // Bus details section
// // // // // // // // //     doc.text('Bus Details:', 20, 100);
// // // // // // // // //     doc.autoTable({
// // // // // // // // //       startY: 105,
// // // // // // // // //       head: [['Attribute', 'Value']],
// // // // // // // // //       body: [
// // // // // // // // //         ['Bus Name', bus.busName],
// // // // // // // // //         ['Bus Number', bus.busNumber],
// // // // // // // // //         ['From', bookingData.from],
// // // // // // // // //         ['To', bookingData.to],
// // // // // // // // //         ['Type', bus.busType],
// // // // // // // // //         ['Departure', new Date(bus.departure).toLocaleString()],
// // // // // // // // //         ['Arrival', new Date(bus.arrival).toLocaleString()],
// // // // // // // // //         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
// // // // // // // // //         ['Selected Seats', bookingData.selectedSeats.join(', ')],
// // // // // // // // //         ['Number of Passengers', bookingData.passenger_details.length.toString()],
// // // // // // // // //         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
// // // // // // // // //       ],
// // // // // // // // //       didDrawPage: (data) => {
// // // // // // // // //         // Add page numbers
// // // // // // // // //         doc.setFontSize(12);
// // // // // // // // //         doc.text(
// // // // // // // // //           'Page ' + doc.internal.getNumberOfPages(),
// // // // // // // // //           data.settings.margin.left,
// // // // // // // // //           doc.internal.pageSize.height - 10
// // // // // // // // //         );
// // // // // // // // //       },
// // // // // // // // //     });

// // // // // // // // //     // Totals section
// // // // // // // // //     doc.setFontSize(16);
// // // // // // // // //     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
// // // // // // // // //     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
// // // // // // // // //     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

// // // // // // // // //         // Save PDF with a professional filename
// // // // // // // // //         doc.save(`Ticket_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
// // // // // // // // //       };
    
// // // // // // // // //       return (
// // // // // // // // //         <div
// // // // // // // // //           className="container"
// // // // // // // // //           style={{
// // // // // // // // //             textAlign: 'center',
// // // // // // // // //             maxWidth: '600px',
// // // // // // // // //             margin: 'auto',
// // // // // // // // //             backgroundColor: 'rgba(0, 0, 0, 0.05)',
// // // // // // // // //             padding: '20px',
// // // // // // // // //             borderRadius: '10px',
// // // // // // // // //             boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
// // // // // // // // //           }}
// // // // // // // // //         >
// // // // // // // // //           <h2 className="mb-4" style={{ color: 'orange' }}>
// // // // // // // // //             Booking Confirmation
// // // // // // // // //           </h2>
    
// // // // // // // // //           {customerDetails && (
// // // // // // // // //             <div className="mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
// // // // // // // // //               <h4>Customer Details:</h4>
// // // // // // // // //               <p>
// // // // // // // // //                 <strong>Name:</strong> {customerDetails.name}
// // // // // // // // //               </p>
// // // // // // // // //               <p>
// // // // // // // // //                 <strong>Phone Number:</strong> {customerDetails.phoneNumber}
// // // // // // // // //               </p>
// // // // // // // // //               <p>
// // // // // // // // //                 <strong>Email:</strong> {customerDetails.email}
// // // // // // // // //               </p>
// // // // // // // // //               <p>
// // // // // // // // //                 <strong>Address:</strong> {customerDetails.address}
// // // // // // // // //               </p>
// // // // // // // // //             </div>
// // // // // // // // //           )}
    
// // // // // // // // //           {bus && (
// // // // // // // // //             <div className="mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
// // // // // // // // //               <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Bus Details:</h4>
// // // // // // // // //               <table className="table table-bordered" style={{ color: 'black' }}>
// // // // // // // // //                 <tbody>
// // // // // // // // //                   <tr>
// // // // // // // // //                     <th>Bus Name</th>
// // // // // // // // //                     <td>{bus.busName}</td>
// // // // // // // // //                   </tr>
// // // // // // // // //                   <tr>
// // // // // // // // //                     <th>Bus Number</th>
// // // // // // // // //                     <td>{bus.busNumber}</td>
// // // // // // // // //                   </tr>
// // // // // // // // //                   <tr>
// // // // // // // // //                     <th>From</th>
// // // // // // // // //                     <td>{from}</td>
// // // // // // // // //                   </tr>
// // // // // // // // //                   <tr>
// // // // // // // // //                     <th>To</th>
// // // // // // // // //                     <td>{to}</td>
// // // // // // // // //                   </tr>
// // // // // // // // //                   <tr>
// // // // // // // // //                     <th>Type</th>
// // // // // // // // //                     <td>{bus.busType}</td>
// // // // // // // // //                   </tr>
// // // // // // // // //                   <tr>
// // // // // // // // //                     <th>Departure</th>
// // // // // // // // //                     <td>{bus.Route.departure}</td>
// // // // // // // // //                   </tr>
// // // // // // // // //                   <tr>
// // // // // // // // //                     <th>Arrival</th>
// // // // // // // // //                     <td>{bus.Route.arrival}</td>
// // // // // // // // //                   </tr>
// // // // // // // // //                   <tr>
// // // // // // // // //                     <th>Fare</th>
// // // // // // // // //                     <td>₹ {fare.toLocaleString()}</td>
// // // // // // // // //                   </tr>
// // // // // // // // //                   <tr>
// // // // // // // // //                     <th>Selected Seats</th>
// // // // // // // // //                     <td>{selectedSeats.map((seat) => seat + 1).join(', ')}</td>
// // // // // // // // //                   </tr>
// // // // // // // // //                   <tr>
// // // // // // // // //                     <th>Number of Passengers</th>
// // // // // // // // //                     <td>{numPassengers}</td>
// // // // // // // // //                   </tr>
// // // // // // // // //                   <tr>
// // // // // // // // //                     <th>Booking Date</th>
// // // // // // // // //                     <td>{new Date(bookingDate).toLocaleDateString()}</td>
// // // // // // // // //                   </tr>
// // // // // // // // //                 </tbody>
// // // // // // // // //               </table>
// // // // // // // // //             </div>
// // // // // // // // //           )}
    
// // // // // // // // //           <div className="mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
// // // // // // // // //             <h4 style={{ color: 'orange' }}>Passenger Details:</h4>
// // // // // // // // //             {passengerDetails.map((passenger, index) => (
// // // // // // // // //               <div key={index} className="mb-3">
// // // // // // // // //                 <h5 style={{ color: 'grey' }}>Passenger {index + 1}</h5>
// // // // // // // // //                 <div className="row">
// // // // // // // // //                   <div className="col-md-4">
// // // // // // // // //                     <input
// // // // // // // // //                       type="text"
// // // // // // // // //                       className="form-control"
// // // // // // // // //                       placeholder="Name"
// // // // // // // // //                       value={passenger.name}
// // // // // // // // //                       onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
// // // // // // // // //                     />
// // // // // // // // //                   </div>
// // // // // // // // //                   <div className="col-md-4">
// // // // // // // // //                     <input
// // // // // // // // //                       type="number"
// // // // // // // // //                       className="form-control"
// // // // // // // // //                       placeholder="Age"
// // // // // // // // //                       value={passenger.age}
// // // // // // // // //                       onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
// // // // // // // // //                     />
// // // // // // // // //                   </div>
// // // // // // // // //                   <div className="col-md-4">
// // // // // // // // //                     <select
// // // // // // // // //                       className="form-control"
// // // // // // // // //                       value={passenger.gender}
// // // // // // // // //                       onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
// // // // // // // // //                     >
// // // // // // // // //                       <option value="">Select Gender</option>
// // // // // // // // //                       <option value="Male">Male</option>
// // // // // // // // //                       <option value="Female">Female</option>
// // // // // // // // //                       <option value="Other">Other</option>
// // // // // // // // //                     </select>
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>
// // // // // // // // //             ))}
// // // // // // // // //           </div>
    
// // // // // // // // //           <button className="btn btn-primary" onClick={handleConfirmBooking}>
// // // // // // // // //             Confirm Booking
// // // // // // // // //           </button>
    
// // // // // // // // //           {/* Payment Modal */}
// // // // // // // // //           <PaymentModal
// // // // // // // // //             show={showModal}
// // // // // // // // //             onClose={() => setShowModal(false)}
// // // // // // // // //             onSuccess={handlePaymentSuccess}
// // // // // // // // //             bookingDetails={{ ...bookingDetails, customerName: customerDetails?.name }}
// // // // // // // // //             cartTotal={cartTotal}
// // // // // // // // //           />
// // // // // // // // //         </div>
// // // // // // // // //       );
// // // // // // // // //     };
    
// // // // // // // // //     export default Payment;
    

// // // // // import React, { useState } from 'react';
// // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // import jsPDF from 'jspdf';
// // // // // import 'jspdf-autotable';

// // // // // const Payment = () => {
// // // // //   const location = useLocation();
// // // // //   const navigate = useNavigate();
// // // // //   const { bookingDetails, customerDetails } = location.state || {};

// // // // //   const {
// // // // //     selectedSeats,
// // // // //     bus,
// // // // //     numPassengers,
// // // // //     discountAmount,
// // // // //     GST,
// // // // //     cartTotal,
// // // // //     from,
// // // // //     to,
// // // // //     fare,
// // // // //     bookingDate, // Access booking date here
// // // // //   } = bookingDetails || {};

// // // // //   const [passengerDetails, setPassengerDetails] = useState(
// // // // //     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
// // // // //   );

// // // // //   const handlePassengerChange = (index, field, value) => {
// // // // //     const updatedDetails = passengerDetails.map((passenger, i) =>
// // // // //       i === index ? { ...passenger, [field]: value } : passenger
// // // // //     );
// // // // //     setPassengerDetails(updatedDetails);
// // // // //   };

// // // // //   const validatePassengerDetails = () => {
// // // // //     for (const passenger of passengerDetails) {
// // // // //       if (!passenger.name || !passenger.age || !passenger.gender) {
// // // // //         return false;
// // // // //       }
// // // // //     }
// // // // //     return true;
// // // // //   };

// // // // //   const handleConfirmBooking = async () => {
// // // // //     if (!validatePassengerDetails()) {
// // // // //       alert('Please fill in all passenger details.');
// // // // //       return;
// // // // //     }

// // // // //     const bookingData = {
// // // // //       customerName: customerDetails?.name || 'N/A',
// // // // //       phoneNumber: customerDetails?.phoneNumber || 'N/A',
// // // // //       email: customerDetails?.email || 'N/A',
// // // // //       address: customerDetails?.address || 'N/A',
// // // // //       busId: bus?.busId || 'N/A',
// // // // //       selectedSeats: selectedSeats || [],
// // // // //       passenger_details: passengerDetails,
// // // // //       discountAmount: discountAmount || 0,
// // // // //       GST: GST || 0,
// // // // //       cartTotal: cartTotal || 0,
// // // // //       from,
// // // // //       to,
// // // // //       fare,
// // // // //       busType: bus?.busType || 'N/A',
// // // // //       bookingDate: bookingDate || 'N/A', // Ensure booking date is included
// // // // //     };

// // // // //     // const seatData = {
// // // // //     //   busId: bus?.busId || 'N/A',
// // // // //     //   from,
// // // // //     //   to,
// // // // //     //   selectedSeats: selectedSeats+1|| [],
// // // // //     //   bookingDate: bookingDate || 'N/A'
// // // // //     // };
// // // // //     const seatData = {
// // // // //       busId: bus?.busId || 'N/A',
// // // // //       from,
// // // // //       to,
// // // // //       selectedSeats: selectedSeats.map(seat => seat + 1) || [],
// // // // //       bookingDate: bookingDate || 'N/A'
// // // // //     };
    
    

// // // // //     try {
// // // // //       const bookingResponse = await fetch('http://localhost:3000/booking', {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify(bookingData),
// // // // //       });

// // // // //       if (bookingResponse.ok) {
// // // // //         const bookingResult = await bookingResponse.json();
// // // // //         console.log('Booking confirmed:', bookingResult);

// // // // //         try {
// // // // //           const seatResponse = await fetch('http://localhost:3000/seat', {
// // // // //             method: 'POST',
// // // // //             headers: {
// // // // //               'Content-Type': 'application/json',
// // // // //             },
// // // // //             body: JSON.stringify(seatData),
// // // // //           });

// // // // //           if (seatResponse.ok) {
// // // // //             console.log('Seats booked successfully.');
// // // // //           } else {
// // // // //             const seatErrorData = await seatResponse.json();
// // // // //             console.error('Seat booking error:', seatErrorData);
// // // // //             alert('Failed to book seats. Please try again.');
// // // // //           }
// // // // //         } catch (seatError) {
// // // // //           console.error('Error booking seats:', seatError);
// // // // //           alert('An error occurred while booking the seats. Please try again.');
// // // // //         }

// // // // //         generatePDF(bookingData);
// // // // //         alert('Booking confirmed successfully!');
// // // // //         navigate('/');
// // // // //       } else {
// // // // //         const bookingErrorData = await bookingResponse.json();
// // // // //         console.error('Booking error:', bookingErrorData);
// // // // //         alert('Failed to confirm booking. Please try again.');
// // // // //       }
// // // // //     } catch (bookingError) {
// // // // //       console.error('Error:', bookingError);
// // // // //       alert('An error occurred while confirming the booking. Please try again.');
// // // // //     }
// // // // //   };

// // // // //   const generatePDF = (bookingData) => {
// // // // //     const doc = new jsPDF();
// // // // //     doc.setFontSize(22);
// // // // //     doc.text('Journey -Jet', 105, 20, 'center');
// // // // //     doc.setFontSize(18);
// // // // //     doc.text('Invoice', 105, 35, 'center');

// // // // //     // Bus details section
// // // // //     doc.text('Bus Details:', 20, 100);
// // // // //     doc.autoTable({
// // // // //       startY: 105,
// // // // //       head: [['Attribute', 'Value']],
// // // // //       body: [
// // // // //         ['Bus Name', bus.busName],
// // // // //         ['Bus Number', bus.busNumber],
// // // // //         ['From', bookingData.from],
// // // // //         ['To', bookingData.to],
// // // // //         ['Type', bus.busType],
// // // // //         ['Departure', new Date(bus.departure).toLocaleString()],
// // // // //         ['Arrival', new Date(bus.arrival).toLocaleString()],
// // // // //         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
// // // // //         ['Selected Seats', bookingData.selectedSeats.join(', ')],
// // // // //         ['Number of Passengers', bookingData.passenger_details.length.toString()],
// // // // //         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
// // // // //       ],
// // // // //       didDrawPage: (data) => {
// // // // //         // Add page numbers
// // // // //         doc.setFontSize(12);
// // // // //         doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
// // // // //       },
// // // // //     });

// // // // //     // Totals section
// // // // //     doc.setFontSize(16);
// // // // //     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
// // // // //     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
// // // // //     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

// // // // //     // Save PDF with a professional filename
// // // // //     doc.save(`JourneyJet_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
// // // // //   };

// // // // //   return (
// // // // //     <div className="container">
// // // // //       <h2 className="mb-4">Booking Confirmation</h2>

// // // // //       {customerDetails && (
// // // // //         <div className="mb-4">
// // // // //           <h4>Customer Details:</h4>
// // // // //           <p><strong>Name:</strong> {customerDetails.name}</p>
// // // // //           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
// // // // //           <p><strong>Email:</strong> {customerDetails.email}</p>
// // // // //           <p><strong>Address:</strong> {customerDetails.address}</p>
// // // // //         </div>
// // // // //       )}

// // // // //       {bus && (
// // // // //         <div className="mb-4">
// // // // //           <h4>Bus Details:</h4>
// // // // //           <table className="table table-bordered">
// // // // //             <tbody>
// // // // //               <tr>
// // // // //                 <th>Bus Name</th>
// // // // //                 <td>{bus.busName}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>Bus Number</th>
// // // // //                 <td>{bus.busNumber}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>From</th>
// // // // //                 <td>{from}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>To</th>
// // // // //                 <td>{to}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>Type</th>
// // // // //                 <td>{bus.busType}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>Departure</th>
// // // // //                 <td>{new Date(bus.departure).toLocaleString()}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>Arrival</th>
// // // // //                 <td>{new Date(bus.arrival).toLocaleString()}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>Fare</th>
// // // // //                 <td>₹ {fare.toLocaleString()}</td>
// // // // //               </tr>
// // // // //               {/* <tr>
// // // // //                 <th>Selected Seats</th>
// // // // //                 <td>{selectedSeats.join(', ')}</td>
// // // // //               </tr> */}
// // // // //               <tr>
// // // // //   <th>Selected Seats</th>
// // // // //   <td>{selectedSeats.map(seat => seat + 1).join(', ')}</td>
// // // // // </tr>
// // // // //               <tr>
// // // // //                 <th>Number of Passengers</th>
// // // // //                 <td>{numPassengers}</td>
// // // // //               </tr>
// // // // //               <tr>
// // // // //                 <th>Booking Date</th>
// // // // //                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
// // // // //               </tr>
// // // // //             </tbody>
// // // // //           </table>
// // // // //         </div>
// // // // //       )}

// // // // //       <div className="mb-4">
// // // // //         <h4>Passenger Details:</h4>
// // // // //         <table className="table passenger-table">
// // // // //           <thead>
// // // // //             <tr>
// // // // //               <th>#</th>
// // // // //               <th>Name</th>
// // // // //               <th>Age</th>
// // // // //               <th>Gender</th>
// // // // //             </tr>
// // // // //           </thead>
// // // // //           <tbody>
// // // // //             {passengerDetails.map((passenger, index) => (
// // // // //               <tr key={index}>
// // // // //                 <td>{index + 1}</td>
// // // // //                 <td>
// // // // //                   <input
// // // // //                     type="text"
// // // // //                     className="form-control"
// // // // //                     value={passenger.name}
// // // // //                     onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
// // // // //                   />
// // // // //                 </td>
// // // // //                 <td>
// // // // //                   <input
// // // // //                     type="number"
// // // // //                     className="form-control"
// // // // //                     value={passenger.age}
// // // // //                     onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
// // // // //                   />
// // // // //                 </td>
// // // // //                 <td>
// // // // //                   <select
// // // // //                     className="form-control"
// // // // //                     value={passenger.gender}
// // // // //                     onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
// // // // //                   >
// // // // //                     <option value="">Select Gender</option>
// // // // //                     <option value="Male">Male</option>
// // // // //                     <option value="Female">Female</option>
// // // // //                     <option value="Other">Other</option>
// // // // //                   </select>
// // // // //                 </td>
// // // // //               </tr>
// // // // //             ))}
// // // // //           </tbody>
// // // // //         </table>
// // // // //       </div>

// // // // //       <div className="totals">
// // // // //         <h4>Total Summary:</h4>
// // // // //         <div className="mb-3"><strong>Discount:</strong> ₹ {discountAmount ? discountAmount.toLocaleString() : 0}</div>
// // // // //         <div className="mb-3"><strong>GST (5%):</strong> ₹ {GST ? GST.toLocaleString() : 0}</div>
// // // // //         <div><strong>Total:</strong> ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</div>
// // // // //       </div>

// // // // //       <div className="buttons mt-4">
// // // // //         <button className="btn btn-primary me-3" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={handleConfirmBooking}>
// // // // //           Confirm Booking
// // // // //         </button>
// // // // //         <button className="btn btn-outline-secondary" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={() => navigate('/')}>
// // // // //           Cancel
// // // // //         </button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Payment;

// // // // import React, { useState } from 'react';
// // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // import jsPDF from 'jspdf';
// // // // import 'jspdf-autotable';

// // // // const Payment = () => {
// // // //   const location = useLocation();
// // // //   const navigate = useNavigate();
// // // //   const { bookingDetails, customerDetails } = location.state || {};

// // // //   const {
// // // //     selectedSeats,
// // // //     bus,
// // // //     numPassengers,
// // // //     discountAmount,
// // // //     GST,
// // // //     cartTotal,
// // // //     from,
// // // //     to,
// // // //     fare,
// // // //     bookingDate,
// // // //   } = bookingDetails || {};

// // // //   const [passengerDetails, setPassengerDetails] = useState(
// // // //     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
// // // //   );

// // // //   const handlePassengerChange = (index, field, value) => {
// // // //     const updatedDetails = passengerDetails.map((passenger, i) =>
// // // //       i === index ? { ...passenger, [field]: value } : passenger
// // // //     );
// // // //     setPassengerDetails(updatedDetails);
// // // //   };

// // // //   const validatePassengerDetails = () => {
// // // //     for (const passenger of passengerDetails) {
// // // //       if (!passenger.name || !passenger.age || !passenger.gender) {
// // // //         return false;
// // // //       }
// // // //     }
// // // //     return true;
// // // //   };

// // // //   const handlePayment = async () => {
// // // //     // Implement your payment logic here
// // // //     // Return true if payment is successful, false otherwise
// // // //     return true; // Placeholder for successful payment
// // // //   };

// // // //   const handleConfirmBooking = async () => {
// // // //     if (!validatePassengerDetails()) {
// // // //       alert('Please fill in all passenger details.');
// // // //       return;
// // // //     }

// // // //     const paymentSuccessful = await handlePayment();

// // // //     if (!paymentSuccessful) {
// // // //       alert('Payment failed. Please try again.');
// // // //       return;
// // // //     }

// // // //     const bookingData = {
// // // //       customerName: customerDetails?.name || 'N/A',
// // // //       phoneNumber: customerDetails?.phoneNumber || 'N/A',
// // // //       email: customerDetails?.email || 'N/A',
// // // //       address: customerDetails?.address || 'N/A',
// // // //       busId: bus?.busId || 'N/A',
// // // //       selectedSeats: selectedSeats || [],
// // // //       passenger_details: passengerDetails,
// // // //       discountAmount: discountAmount || 0,
// // // //       GST: GST || 0,
// // // //       cartTotal: cartTotal || 0,
// // // //       from,
// // // //       to,
// // // //       fare,
// // // //       busType: bus?.busType || 'N/A',
// // // //       bookingDate: bookingDate || 'N/A',
// // // //     };

// // // //     const seatData = {
// // // //       busId: bus?.busId || 'N/A',
// // // //       from,
// // // //       to,
// // // //       selectedSeats: selectedSeats.map((seat) => seat + 1) || [],
// // // //       bookingDate: bookingDate || 'N/A',
// // // //     };

// // // //     try {
// // // //       const bookingResponse = await fetch('http://localhost:3000/booking', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify(bookingData),
// // // //       });

// // // //       if (bookingResponse.ok) {
// // // //         const bookingResult = await bookingResponse.json();
// // // //         console.log('Booking confirmed:', bookingResult);

// // // //         try {
// // // //           const seatResponse = await fetch('http://localhost:3000/seat', {
// // // //             method: 'POST',
// // // //             headers: {
// // // //               'Content-Type': 'application/json',
// // // //             },
// // // //             body: JSON.stringify(seatData),
// // // //           });

// // // //           if (seatResponse.ok) {
// // // //             console.log('Seats booked successfully.');
// // // //           } else {
// // // //             const seatErrorData = await seatResponse.json();
// // // //             console.error('Seat booking error:', seatErrorData);
// // // //             alert('Failed to book seats. Please try again.');
// // // //           }
// // // //         } catch (seatError) {
// // // //           console.error('Error booking seats:', seatError);
// // // //           alert('An error occurred while booking the seats. Please try again.');
// // // //         }

// // // //         generatePDF(bookingData);
// // // //         alert('Booking confirmed successfully!');
// // // //         navigate('/');
// // // //       } else {
// // // //         const bookingErrorData = await bookingResponse.json();
// // // //         console.error('Booking error:', bookingErrorData);
// // // //         alert('Failed to confirm booking. Please try again.');
// // // //       }
// // // //     } catch (bookingError) {
// // // //       console.error('Error:', bookingError);
// // // //       alert('An error occurred while confirming the booking. Please try again.');
// // // //     }
// // // //   };

// // // //   const generatePDF = (bookingData) => {
// // // //     const doc = new jsPDF();
// // // //     doc.setFontSize(22);
// // // //     doc.text('Journey -Jet', 105, 20, 'center');
// // // //     doc.setFontSize(18);
// // // //     doc.text('Invoice', 105, 35, 'center');

// // // //     // Bus details section
// // // //     doc.text('Bus Details:', 20, 100);
// // // //     doc.autoTable({
// // // //       startY: 105,
// // // //       head: [['Attribute', 'Value']],
// // // //       body: [
// // // //         ['Bus Name', bus.busName],
// // // //         ['Bus Number', bus.busNumber],
// // // //         ['From', bookingData.from],
// // // //         ['To', bookingData.to],
// // // //         ['Type', bus.busType],
// // // //         ['Departure', new Date(bus.departure).toLocaleString()],
// // // //         ['Arrival', new Date(bus.arrival).toLocaleString()],
// // // //         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
// // // //         ['Selected Seats', bookingData.selectedSeats.join(', ')],
// // // //         ['Number of Passengers', bookingData.passenger_details.length.toString()],
// // // //         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
// // // //       ],
// // // //       didDrawPage: (data) => {
// // // //         // Add page numbers
// // // //         doc.setFontSize(12);
// // // //         doc.text(
// // // //           'Page ' + doc.internal.getNumberOfPages(),
// // // //           data.settings.margin.left,
// // // //           doc.internal.pageSize.height - 10
// // // //         );
// // // //       },
// // // //     });

// // // //     // Totals section
// // // //     doc.setFontSize(16);
// // // //     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
// // // //     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
// // // //     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

// // // //     // Save PDF with a professional filename
// // // //     doc.save(`Ticket_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
// // // //   };

// // // //   return (
// // // //     <div
// // // //       className="container"
// // // //       style={{
// // // //         textAlign: 'center',
// // // //         maxWidth: '600px',
// // // //         margin: 'auto',
// // // //         backgroundColor: 'rgba(0, 0, 0, 0.05)',
// // // //         padding: '20px',
// // // //         borderRadius: '10px',
// // // //         boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
// // // //       }}
// // // //     >
// // // //       <h2 className="mb-4" style={{ color: 'orange' }}>
// // // //         Booking Confirmation
// // // //       </h2>

// // // //       {customerDetails && (
// // // //         <div className="mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
// // // //           <h4>Customer Details:</h4>
// // // //           <p>
// // // //             <strong>Name:</strong> {customerDetails.name}
// // // //           </p>
// // // //           <p>
// // // //             <strong>Phone Number:</strong> {customerDetails.phoneNumber}
// // // //           </p>
// // // //           <p>
// // // //             <strong>Email:</strong> {customerDetails.email}
// // // //           </p>
// // // //           <p>
// // // //             <strong>Address:</strong> {customerDetails.address}
// // // //           </p>
// // // //         </div>
// // // //       )}

// // // //       {bus && (
// // // //         <div className="mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
// // // //           <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Bus Details:</h4>
// // // //           <table className="table table-bordered">
// // // //             <tbody>
// // // //               <tr>
// // // //                 <th>Bus Name</th>
// // // //                 <td>{bus.busName}</td>
// // // //               </tr>
// // // //               <tr>
// // // //                 <th>Bus Number</th>
// // // //                 <td>{bus.busNumber}</td>
// // // //               </tr>
// // // //               <tr>
// // // //                 <th>From</th>
// // // //                 <td>{from}</td>
// // // //               </tr>
// // // //               <tr>
// // // //                 <th>To</th>
// // // //                 <td>{to}</td>
// // // //               </tr>
// // // //               <tr>
// // // //                 <th>Type</th>
// // // //                 <td>{bus.busType}</td>
// // // //               </tr>
// // // //               <tr>
// // // //                 <th>Departure</th>
// // // //                 <td>{new Date(bus.departure).toLocaleString()}</td>
// // // //               </tr>
// // // //               <tr>
// // // //                 <th>Arrival</th>
// // // //                 <td>{new Date(bus.arrival).toLocaleString()}</td>
// // // //               </tr>
// // // //               <tr>
// // // //                 <th>Fare</th>
// // // //                 <td>₹ {fare.toLocaleString()}</td>
// // // //               </tr>
// // // //               <tr>
// // // //                 <th>Selected Seats</th>
// // // //                 <td>{selectedSeats.map((seat) => seat + 1).join(', ')}</td>
// // // //               </tr>
// // // //               <tr>
// // // //                 <th>Number of Passengers</th>
// // // //                 <td>{numPassengers}</td>
// // // //               </tr>
// // // //               <tr>
// // // //                 <th>Booking Date</th>
// // // //                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
// // // //               </tr>
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       )}

// // // //       <div className="mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
// // // //         <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Passenger Details:</h4>
// // // //         {passengerDetails.map((passenger, index) => (
// // // //           <div key={index} className="mb-3">
// // // //             <h5>Passenger {index + 1}</h5>
// // // //             <div className="mb-2">
// // // //               <label>Name:</label>
// // // //               <input
// // // //                 type="text"
// // // //                 value={passenger.name}
// // // //                 onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
// // // //                 className="form-control"
// // // //               />
// // // //             </div>
// // // //             <div className="mb-2">
// // // //               <label>Age:</label>
// // // //               <input
// // // //                 type="text"
// // // //                 value={passenger.age}
// // // //                 onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
// // // //                 className="form-control"
// // // //               />
// // // //             </div>
// // // //             <div className="mb-3">
// // // //               <label>Gender:</label>
// // // //               <select
// // // //                 value={passenger.gender}
// // // //                 onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
// // // //                 className="form-control"
// // // //               >
// // // //                 <option value="">Select Gender</option>
// // // //                 <option value="Male">Male</option>
// // // //                 <option value="Female">Female</option>
// // // //                 <option value="Other">Other</option>
// // // //               </select>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>

// // // //       <button onClick={handleConfirmBooking} className="btn btn-primary">
// // // //         Confirm Booking
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Payment;

// // // import React, { useState } from 'react';
// // // import { useLocation, useNavigate } from 'react-router-dom';
// // // import jsPDF from 'jspdf';
// // // import 'jspdf-autotable';

// // // const Payment = () => {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const { bookingDetails, customerDetails } = location.state || {};

// // //   const {
// // //     selectedSeats,
// // //     bus,
// // //     numPassengers,
// // //     discountAmount,
// // //     GST,
// // //     cartTotal,
// // //     from,
// // //     to,
// // //     fare,
// // //     bookingDate,
// // //   } = bookingDetails || {};

// // //   const [passengerDetails, setPassengerDetails] = useState(
// // //     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
// // //   );

// // //   const [creditCardDetails, setCreditCardDetails] = useState({
// // //     cardNumber: '',
// // //     cardHolderName: '',
// // //     expiryDate: '',
// // //     cvv: '',
// // //   });

// // //   const [showPaymentModal, setShowPaymentModal] = useState(false);
// // //   const [paymentSuccess, setPaymentSuccess] = useState(false);

// // //   const handlePassengerChange = (index, field, value) => {
// // //     const updatedDetails = passengerDetails.map((passenger, i) =>
// // //       i === index ? { ...passenger, [field]: value } : passenger
// // //     );
// // //     setPassengerDetails(updatedDetails);
// // //   };

// // //   const validatePassengerDetails = () => {
// // //     for (const passenger of passengerDetails) {
// // //       if (!passenger.name || !passenger.age || !passenger.gender) {
// // //         return false;
// // //       }
// // //     }
// // //     return true;
// // //   };

// // //   const handlePayment = async () => {
// // //     // Simulate payment processing, replace with actual logic
// // //     return new Promise((resolve) => {
// // //       setTimeout(() => {
// // //         resolve(true); // Payment successful
// // //       }, 2000); // Simulate 2 seconds delay
// // //     });
// // //   };

// // //   const handleConfirmBooking = async () => {
// // //     if (!validatePassengerDetails()) {
// // //       alert('Please fill in all passenger details.');
// // //       return;
// // //     }

// // //     setShowPaymentModal(true);
// // //   };

// // //   const handlePayNow = async () => {
// // //     const paymentSuccessful = await handlePayment();

// // //     if (paymentSuccessful) {
// // //       setPaymentSuccess(true);
// // //       generatePDF();
// // //     } else {
// // //       alert('Payment failed. Please try again.');
// // //     }
// // //   };

// // //   const generatePDF = () => {
// // //     const bookingData = {
// // //       customerName: customerDetails?.name || 'N/A',
// // //       phoneNumber: customerDetails?.phoneNumber || 'N/A',
// // //       email: customerDetails?.email || 'N/A',
// // //       address: customerDetails?.address || 'N/A',
// // //       busId: bus?.busId || 'N/A',
// // //       selectedSeats: selectedSeats || [],
// // //       passenger_details: passengerDetails,
// // //       discountAmount: discountAmount || 0,
// // //       GST: GST || 0,
// // //       cartTotal: cartTotal || 0,
// // //       from,
// // //       to,
// // //       fare,
// // //       busType: bus?.busType || 'N/A',
// // //       bookingDate: bookingDate || 'N/A',
// // //     };

// // //     const doc = new jsPDF();
// // //     doc.setFontSize(22);
// // //     doc.text('Journey -Jet', 105, 20, 'center');
// // //     doc.setFontSize(18);
// // //     doc.text('Invoice', 105, 35, 'center');

// // //     // Bus details section
// // //     doc.text('Bus Details:', 20, 100);
// // //     doc.autoTable({
// // //       startY: 105,
// // //       head: [['Attribute', 'Value']],
// // //       body: [
// // //         ['Bus Name', bus.busName],
// // //         ['Bus Number', bus.busNumber],
// // //         ['From', bookingData.from],
// // //         ['To', bookingData.to],
// // //         ['Type', bus.busType],
// // //         ['Departure', new Date(bus.departure).toLocaleString()],
// // //         ['Arrival', new Date(bus.arrival).toLocaleString()],
// // //         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
// // //         ['Selected Seats', bookingData.selectedSeats.join(', ')],
// // //         ['Number of Passengers', bookingData.passenger_details.length.toString()],
// // //         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
// // //       ],
// // //       didDrawPage: (data) => {
// // //         // Add page numbers
// // //         doc.setFontSize(12);
// // //         doc.text(
// // //           'Page ' + doc.internal.getNumberOfPages(),
// // //           data.settings.margin.left,
// // //           doc.internal.pageSize.height - 10
// // //         );
// // //       },
// // //     });

// // //     // Totals section
// // //     doc.setFontSize(16);
// // //     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
// // //     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
// // //     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

// // //     // Save PDF with a professional filename
// // //     doc.save(`Ticket_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
// // //   };

// // //   return (
// // //     <div className="container">
// // //       <h2 className="mt-4 mb-4" style={{ textAlign: 'center', color: 'orange' }}>
// // //         Booking Confirmation
// // //       </h2>

// // //       {/* Passenger Details */}
// // //       <div className="mb-4">
// // //         <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Passenger Details:</h4>
// // //         {passengerDetails.map((passenger, index) => (
// // //           <div key={index} className="mb-3">
// // //             <h5>Passenger {index + 1}</h5>
// // //             <div className="mb-2">
// // //               <label>Name:</label>
// // //               <input
// // //                 type="text"
// // //                 value={passenger.name}
// // //                 onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
// // //                 className="form-control"
// // //               />
// // //             </div>
// // //             <div className="mb-2">
// // //               <label>Age:</label>
// // //               <input
// // //                 type="text"
// // //                 value={passenger.age}
// // //                 onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
// // //                 className="form-control"
// // //               />
// // //             </div>
// // //             <div className="mb-3">
// // //               <label>Gender:</label>
// // //               <select
// // //                 value={passenger.gender}
// // //                 onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
// // //                 className="form-control"
// // //               >
// // //                 <option value="">Select Gender</option>
// // //                 <option value="Male">Male</option>
// // //                 <option value="Female">Female</option>
// // //                 <option value="Other">Other</option>
// // //               </select>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Payment Modal */}
// // //       {showPaymentModal && (
// // //         <div className="modal-backdrop show">
// // //           <div className="modal-dialog modal-dialog-centered">
// // //             <div className="modal-content">
// // //               <div className="modal-header">
// // //                 <h5 className="modal-title">Payment Details</h5>
// // //                 <button type="button" className="close" onClick={() => setShowPaymentModal(false)}>
// // //                   <span>&times;</span>
// // //                 </button>
// // //               </div>
// // //               <div className="modal-body">
// // //                 {!paymentSuccess ? (
// // //                   <form>
// // //                     <div className="form-group">
// // //                       <label htmlFor="cardNumber">Card Number</label>
// // //                       <input
// // //                         type="text"
// // //                         className="form-control"
// // //                         id="cardNumber"
// // //                         value={creditCardDetails.cardNumber}
// // //                         onChange={(e) =>
// // //                           setCreditCardDetails({ ...creditCardDetails, cardNumber: e.target.value })
// // //                         }
// // //                         placeholder="Enter card number"
// // //                       />
// // //                     </div>
// // //                     <div className="form-group">
// // //                       <label htmlFor="cardHolderName">Card Holder Name</label>
// // //                       <input
// // //                         type="text"
// // //                         className="form-control"
// // //                         id="cardHolderName"
// // //                         value={creditCardDetails.cardHolderName}
// // //                         onChange={(e) =>
// // //                           setCreditCardDetails({ ...creditCardDetails, cardHolderName: e.target.value })
// // //                         }
// // //                         placeholder="Enter card holder name"
// // //                       />
// // //                     </div>
// // //                     <div className="form-row">
// // //                       <div className="form-group col-md-6">
// // //                         <label htmlFor="expiryDate">Expiry Date</label>
// // //                         <input
// // //                           type="text"
// // //                           className="form-control"
// // //                           id="expiryDate"
// // //                           value={creditCardDetails.expiryDate}
// // //                           onChange={(e) =>
// // //                             setCreditCardDetails({ ...creditCardDetails, expiryDate: e.target.value })
// // //                           }
// // //                           placeholder="MM/YYYY"
// // //                         />
// // //                       </div>
// // //                       <div className="form-group col-md-6">
// // //                         <label htmlFor="cvv">CVV</label>
// // //                         <input
// // //                           type="text"
// // //                           className="form-control"
// // //                           id="cvv"
// // //                           value={creditCardDetails.cvv}
// // //                           onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cvv: e.target.value })}
// // //                           placeholder="CVV"
// // //                         />
// // //                       </div>
// // //                     </div>
// // //                   </form>
// // //                 ) : (
// // //                   <p className="text-success">Payment successful!</p>
// // //                 )}
// // //               </div>
// // //               <div className="modal-footer">
// // //                 {!paymentSuccess ? (
// // //                   <button type="button" className="btn btn-primary" onClick={handlePayNow}>
// // //                     Pay Now
// // //                   </button>
// // //                 ) : (
// // //                   <button type="button" className="btn btn-success" onClick={() => setShowPaymentModal(false)}>
// // //                     Close
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Confirm Booking Button */}
// // //       <button onClick={handleConfirmBooking} className="btn btn-primary">
// // //         Confirm Booking
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default Payment;
// // import React, { useState } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import jsPDF from 'jspdf';
// // import 'jspdf-autotable';

// // const Payment = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { bookingDetails, customerDetails } = location.state || {};

// //   const {
// //     selectedSeats,
// //     bus,
// //     numPassengers,
// //     discountAmount,
// //     GST,
// //     cartTotal,
// //     from,
// //     to,
// //     fare,
// //     bookingDate,
// //   } = bookingDetails || {};

// //   const [passengerDetails, setPassengerDetails] = useState(
// //     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
// //   );

// //   const [creditCardDetails, setCreditCardDetails] = useState({
// //     cardNumber: '',
// //     cardHolderName: '',
// //     expiryDate: '',
// //     cvv: '',
// //   });

// //   const [showPaymentModal, setShowPaymentModal] = useState(false);
// //   const [paymentSuccess, setPaymentSuccess] = useState(false);

// //   const handlePassengerChange = (index, field, value) => {
// //     const updatedDetails = passengerDetails.map((passenger, i) =>
// //       i === index ? { ...passenger, [field]: value } : passenger
// //     );
// //     setPassengerDetails(updatedDetails);
// //   };

// //   const validatePassengerDetails = () => {
// //     for (const passenger of passengerDetails) {
// //       if (!passenger.name || !passenger.age || !passenger.gender) {
// //         return false;
// //       }
// //     }
// //     return true;
// //   };

// //   const handlePayment = async () => {
// //     // Simulate payment processing, replace with actual logic
// //     return new Promise((resolve) => {
// //       setTimeout(() => {
// //         resolve(true); // Payment successful
// //       }, 2000); // Simulate 2 seconds delay
// //     });
// //   };

// //   const handleConfirmBooking = async () => {
// //     if (!validatePassengerDetails()) {
// //       alert('Please fill in all passenger details.');
// //       return;
// //     }

// //     setShowPaymentModal(true);
// //   };

// //   const handlePayNow = async () => {
// //     const paymentSuccessful = await handlePayment();

// //     if (paymentSuccessful) {
// //       setPaymentSuccess(true);
// //       generatePDF();
// //     } else {
// //       alert('Payment failed. Please try again.');
// //     }
// //   };

// //   const generatePDF = () => {
// //     const bookingData = {
// //       customerName: customerDetails?.name || 'N/A',
// //       phoneNumber: customerDetails?.phoneNumber || 'N/A',
// //       email: customerDetails?.email || 'N/A',
// //       address: customerDetails?.address || 'N/A',
// //       busId: bus?.busId || 'N/A',
// //       selectedSeats: selectedSeats || [],
// //       passenger_details: passengerDetails,
// //       discountAmount: discountAmount || 0,
// //       GST: GST || 0,
// //       cartTotal: cartTotal || 0,
// //       from,
// //       to,
// //       fare,
// //       busType: bus?.busType || 'N/A',
// //       bookingDate: bookingDate || 'N/A',
// //     };

// //     const doc = new jsPDF();
// //     doc.setFontSize(22);
// //     doc.text('Journey -Jet', 105, 20, 'center');
// //     doc.setFontSize(18);
// //     doc.text('Invoice', 105, 35, 'center');

// //     // Bus details section
// //     doc.text('Bus Details:', 20, 100);
// //     doc.autoTable({
// //       startY: 105,
// //       head: [['Attribute', 'Value']],
// //       body: [
// //         ['Bus Name', bus.busName],
// //         ['Bus Number', bus.busNumber],
// //         ['From', bookingData.from],
// //         ['To', bookingData.to],
// //         ['Type', bus.busType],
// //         ['Departure', new Date(bus.departure).toLocaleString()],
// //         ['Arrival', new Date(bus.arrival).toLocaleString()],
// //         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
// //         ['Selected Seats', bookingData.selectedSeats.join(', ')],
// //         ['Number of Passengers', bookingData.passenger_details.length.toString()],
// //         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
// //       ],
// //       didDrawPage: (data) => {
// //         // Add page numbers
// //         doc.setFontSize(12);
// //         doc.text(
// //           'Page ' + doc.internal.getNumberOfPages(),
// //           data.settings.margin.left,
// //           doc.internal.pageSize.height - 10
// //         );
// //       },
// //     });

// //     // Totals section
// //     doc.setFontSize(16);
// //     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
// //     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
// //     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

// //     // Save PDF with a professional filename
// //     doc.save(`Ticket_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
// //   };

// //   return (
// //     <div className="container">
// //       <h2 className="mt-4 mb-4" style={{ textAlign: 'center', color: 'orange' }}>
// //         Booking Confirmation
// //       </h2>

// //       {/* Customer Details */}
// //       {customerDetails && (
// //         <div className="mb-4">
// //           <h4>Customer Details:</h4>
// //           <p>
// //             <strong>Name:</strong> {customerDetails.name}
// //           </p>
// //           <p>
// //             <strong>Phone Number:</strong> {customerDetails.phoneNumber}
// //           </p>
// //           <p>
// //             <strong>Email:</strong> {customerDetails.email}
// //           </p>
// //           <p>
// //             <strong>Address:</strong> {customerDetails.address}
// //           </p>
// //         </div>
// //       )}

// //       {/* Bus Details */}
// //       {bus && (
// //         <div className="mb-4">
// //           <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Bus Details:</h4>
// //           <table className="table table-bordered">
// //             <tbody>
// //               <tr>
// //                 <th>Bus Name</th>
// //                 <td>{bus.busName}</td>
// //               </tr>
// //               <tr>
// //                 <th>Bus Number</th>
// //                 <td>{bus.busNumber}</td>
// //               </tr>
// //               <tr>
// //                 <th>From</th>
// //                 <td>{from}</td>
// //               </tr>
// //               <tr>
// //                 <th>To</th>
// //                 <td>{to}</td>
// //               </tr>
// //               <tr>
// //                 <th>Type</th>
// //                 <td>{bus.busType}</td>
// //               </tr>
// //               <tr>
// //                 <th>Departure</th>
// //                 <td>{new Date(bus.departure).toLocaleString()}</td>
// //               </tr>
// //               <tr>
// //                 <th>Arrival</th>
// //                 <td>{new Date(bus.arrival).toLocaleString()}</td>
// //               </tr>
// //               <tr>
// //                 <th>Fare</th>
// //                 <td>₹ {fare.toLocaleString()}</td>
// //               </tr>
// //               <tr>
// //                 <th>Selected Seats</th>
// //                 <td>{selectedSeats.map((seat) => seat + 1).join(', ')}</td>
// //               </tr>
// //               <tr>
// //                 <th>Number of Passengers</th>
// //                 <td>{numPassengers}</td>
// //               </tr>
// //               <tr>
// //                 <th>Booking Date</th>
// //                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
// //               </tr>
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* Passenger Details */}
// //       <div className="mb-4">
// //         <h4 style={{ color: 'orange' }}>Passenger Details:</h4>
// //         {passengerDetails.map((passenger, index) => (
// //           <div key={index} className="mb-3">
// //             <h5 style={{ color: 'grey' }}>Passenger {index + 1}</h5>
// //             <div className="row">
// //               <div className="col-md-4">
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   placeholder="Name"
// //                   value={passenger.name}
// //                   onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
// //                 />
// //               </div>
// //               <div className="col-md-4">
// //                 <input
// //                   type="number"
// //                   className="form-control"
// //                   placeholder="Age"
// //                   value={passenger.age}
// //                   onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
// //                 />
// //               </div>
// //               <div className="col-md-4">
// //                 <select
// //                   className="form-control"
// //                   value={passenger.gender}
// //                   onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
// //                 >
// //                   <option value="">Select Gender</option>
// //                   <option value="Male">Male</option>
// //                   <option value="Female">Female</option>
// //                   <option value="Other">Other</option>
// //                 </select>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Payment Modal */}
// //       {showPaymentModal && (
// //         <div className="modal-backdrop show"  style={{width:'600px'}}>
// //           <div className="modal-dialog modal-dialog-centered">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Payment Details</h5>
// //                 <button type="button" className="close" onClick={() => setShowPaymentModal(false)}>
// //                   <span>&times;</span>
// //                 </button>
// //               </div>
// //               <div className="modal-body">
// //                 <form>
// //                   <div className="form-group">
// //                     <label htmlFor="cardNumber">Card Number</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       id="cardNumber"
// //                       placeholder="Enter card number"
// //                       value={creditCardDetails.cardNumber}
// //                       onChange={(e) =>
// //                         setCreditCardDetails({ ...creditCardDetails, cardNumber: e.target.value })
// //                       }
// //                     />
// //                   </div>
// //                   <div className="form-group">
// //                     <label htmlFor="cardHolderName">Card Holder Name</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       id="cardHolderName"
// //                       placeholder="Enter card holder name"
// //                       value={creditCardDetails.cardHolderName}
// //                       onChange={(e) =>
// //                         setCreditCardDetails({ ...creditCardDetails, cardHolderName: e.target.value })
// //                       }
// //                     />
// //                   </div>
// //                   <div className="form-row">
// //                     <div className="form-group col-md-6">
// //                       <label htmlFor="expiryDate">Expiry Date</label>
// //                       <input
// //                         type="text"
// //                         className="form-control"
// //                         id="expiryDate"
// //                         placeholder="MM/YY"
// //                         value={creditCardDetails.expiryDate}
// //                         onChange={(e) =>
// //                           setCreditCardDetails({ ...creditCardDetails, expiryDate: e.target.value })
// //                         }
// //                       />
// //                     </div>
// //                     <div className="form-group col-md-6">
// //                       <label htmlFor="cvv">CVV</label>
// //                       <input
// //                         type="text"
// //                         className="form-control"
// //                         id="cvv"
// //                         placeholder="CVV"
// //                         value={creditCardDetails.cvv}
// //                         onChange={(e) =>
// //                           setCreditCardDetails({ ...creditCardDetails, cvv: e.target.value })
// //                         }
// //                       />
// //                     </div>
// //                   </div>
// //                 </form>
// //               </div>
// //               <div className="modal-footer">
// //                 {!paymentSuccess ? (
// //                   <button type="button" className="btn btn-primary" onClick={handlePayNow}>
// //                     Pay Now
// //                   </button>
// //                 ) : (
// //                   <button type="button" className="btn btn-success" onClick={() => setShowPaymentModal(false)}>
// //                     Close
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Confirm Booking Button */}
// //       <button onClick={handleConfirmBooking} className="btn btn-primary">
// //         Confirm Booking
// //       </button>
// //     </div>
// //   );
// // };

// // export default Payment;

// // import React, { useState } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import jsPDF from 'jspdf';
// // import 'jspdf-autotable';

// // const Payment = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { bookingDetails, customerDetails } = location.state || {};

// //   const {
// //     selectedSeats,
// //     bus,
// //     numPassengers,
// //     discountAmount,
// //     GST,
// //     cartTotal,
// //     from,
// //     to,
// //     fare,
// //     bookingDate,
// //   } = bookingDetails || {};

// //   const [passengerDetails, setPassengerDetails] = useState(
// //     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
// //   );

// //   const [creditCardDetails, setCreditCardDetails] = useState({
// //     cardNumber: '',
// //     cardHolderName: '',
// //     expiryDate: '',
// //     cvv: '',
// //   });

// //   const [showPaymentModal, setShowPaymentModal] = useState(false);
// //   const [paymentSuccess, setPaymentSuccess] = useState(false);

// //   const handlePassengerChange = (index, field, value) => {
// //     const updatedDetails = passengerDetails.map((passenger, i) =>
// //       i === index ? { ...passenger, [field]: value } : passenger
// //     );
// //     setPassengerDetails(updatedDetails);
// //   };

// //   const validatePassengerDetails = () => {
// //     for (const passenger of passengerDetails) {
// //       if (!passenger.name || !passenger.age || !passenger.gender) {
// //         return false;
// //       }
// //     }
// //     return true;
// //   };

// //   const handlePayment = async () => {
// //     // Simulate payment processing, replace with actual logic
// //     return new Promise((resolve) => {
// //       setTimeout(() => {
// //         resolve(true); // Payment successful
// //       }, 2000); // Simulate 2 seconds delay
// //     });
// //   };

// //   const handleConfirmBooking = async () => {
// //     if (!validatePassengerDetails()) {
// //       alert('Please fill in all passenger details.');
// //       return;
// //     }

// //     setShowPaymentModal(true);
// //   };

// //   const handlePayNow = async () => {
// //     const paymentSuccessful = await handlePayment();

// //     if (paymentSuccessful) {
// //       setPaymentSuccess(true);
// //       generatePDF();
// //     } else {
// //       alert('Payment failed. Please try again.');
// //     }
// //   };

// //   const generatePDF = () => {
// //     const bookingData = {
// //       customerName: customerDetails?.name || 'N/A',
// //       phoneNumber: customerDetails?.phoneNumber || 'N/A',
// //       email: customerDetails?.email || 'N/A',
// //       address: customerDetails?.address || 'N/A',
// //       busId: bus?.busId || 'N/A',
// //       selectedSeats: selectedSeats || [],
// //       passenger_details: passengerDetails,
// //       discountAmount: discountAmount || 0,
// //       GST: GST || 0,
// //       cartTotal: cartTotal || 0,
// //       from,
// //       to,
// //       fare,
// //       busType: bus?.busType || 'N/A',
// //       bookingDate: bookingDate || 'N/A',
// //     };

// //     const doc = new jsPDF();
// //     doc.setFontSize(22);
// //     doc.text('Journey -Jet', 105, 20, 'center');
// //     doc.setFontSize(18);
// //     doc.text('Invoice', 105, 35, 'center');

// //     // Bus details section
// //     doc.text('Bus Details:', 20, 100);
// //     doc.autoTable({
// //       startY: 105,
// //       head: [['Attribute', 'Value']],
// //       body: [
// //         ['Bus Name', bus.busName],
// //         ['Bus Number', bus.busNumber],
// //         ['From', bookingData.from],
// //         ['To', bookingData.to],
// //         ['Type', bus.busType],
// //         ['Departure', new Date(bus.departure).toLocaleString()],
// //         ['Arrival', new Date(bus.arrival).toLocaleString()],
// //         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
// //         ['Selected Seats', bookingData.selectedSeats.join(', ')],
// //         ['Number of Passengers', bookingData.passenger_details.length.toString()],
// //         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
// //       ],
// //       didDrawPage: (data) => {
// //         // Add page numbers
// //         doc.setFontSize(12);
// //         doc.text(
// //           'Page ' + doc.internal.getNumberOfPages(),
// //           data.settings.margin.left,
// //           doc.internal.pageSize.height - 10
// //         );
// //       },
// //     });

// //     // Totals section
// //     doc.setFontSize(16);
// //     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
// //     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
// //     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

// //     // Save PDF with a professional filename
// //     doc.save(`Ticket_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
// //   };

// //   return (
// //     <div className="container">
// //       <h2 className="mt-4 mb-4" style={{ textAlign: 'center', color: 'orange' }}>
// //         Booking Confirmation
// //       </h2>

// //       {/* Customer Details */}
// //       {customerDetails && (
// //         <div className="mb-4">
// //           <h4>Customer Details:</h4>
// //           <p>
// //             <strong>Name:</strong> {customerDetails.name}
// //           </p>
// //           <p>
// //             <strong>Phone Number:</strong> {customerDetails.phoneNumber}
// //           </p>
// //           <p>
// //             <strong>Email:</strong> {customerDetails.email}
// //           </p>
// //           <p>
// //             <strong>Address:</strong> {customerDetails.address}
// //           </p>
// //         </div>
// //       )}

// //       {/* Bus Details */}
// //       {bus && (
// //         <div className="mb-4">
// //           <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Bus Details:</h4>
// //           <table className="table table-bordered">
// //             <tbody>
// //               <tr>
// //                 <th>Bus Name</th>
// //                 <td>{bus.busName}</td>
// //               </tr>
// //               <tr>
// //                 <th>Bus Number</th>
// //                 <td>{bus.busNumber}</td>
// //               </tr>
// //               <tr>
// //                 <th>From</th>
// //                 <td>{from}</td>
// //               </tr>
// //               <tr>
// //                 <th>To</th>
// //                 <td>{to}</td>
// //               </tr>
// //               <tr>
// //                 <th>Type</th>
// //                 <td>{bus.busType}</td>
// //               </tr>
// //               <tr>
// //                 <th>Departure</th>
// //                 <td>{new Date(bus.departure).toLocaleString()}</td>
// //               </tr>
// //               <tr>
// //                 <th>Arrival</th>
// //                 <td>{new Date(bus.arrival).toLocaleString()}</td>
// //               </tr>
// //               <tr>
// //                 <th>Fare</th>
// //                 <td>₹ {fare.toLocaleString()}</td>
// //               </tr>
// //               <tr>
// //                 <th>Selected Seats</th>
// //                 <td>{selectedSeats.map((seat) => seat + 1).join(', ')}</td>
// //               </tr>
// //               <tr>
// //                 <th>Number of Passengers</th>
// //                 <td>{numPassengers}</td>
// //               </tr>
// //               <tr>
// //                 <th>Booking Date</th>
// //                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
// //               </tr>
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* Passenger Details */}
// //       <div className="mb-4">
// //         <h4 style={{ color: 'orange' }}>Passenger Details:</h4>
// //         {passengerDetails.map((passenger, index) => (
// //           <div key={index} className="mb-3">
// //             <h5 style={{ color: 'grey' }}>Passenger {index + 1}</h5>
// //             <div className="row">
// //               <div className="col-md-4">
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   placeholder="Name"
// //                   value={passenger.name}
// //                   onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
// //                 />
// //               </div>
// //               <div className="col-md-4">
// //                 <input
// //                   type="number"
// //                   className="form-control"
// //                   placeholder="Age"
// //                   value={passenger.age}
// //                   onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
// //                 />
// //               </div>
// //               <div className="col-md-4">
// //                 <select
// //                   className="form-control"
// //                   value={passenger.gender}
// //                   onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
// //                 >
// //                   <option value="">Select Gender</option>
// //                   <option value="Male">Male</option>
// //                   <option value="Female">Female</option>
// //                   <option value="Other">Other</option>
// //                 </select>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Payment Modal */}
// //       {showPaymentModal && (
// //         <div className="modal d-block" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
// //           <div className="modal-dialog modal-dialog-centered">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Payment Details</h5>
// //                 <button type="button" className="close" onClick={() => setShowPaymentModal(false)}>
// //                   <span>&times;</span>
// //                 </button>
// //               </div>
// //               <div className="modal-body">
// //                 <form>
// //                   <div className="form-group">
// //                     <label htmlFor="cardNumber">Card Number</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       id="cardNumber"
// //                       placeholder="Enter card number"
// //                       value={creditCardDetails.cardNumber}
// //                       onChange={(e) =>
// //                         setCreditCardDetails({ ...creditCardDetails, cardNumber: e.target.value })
// //                       }
// //                     />
// //                   </div>
// //                   <div className="form-group">
// //                     <label htmlFor="cardHolderName">Card Holder Name</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       id="cardHolderName"
// //                       placeholder="Enter card holder name"
// //                       value={creditCardDetails.cardHolderName}
// //                       onChange={(e) =>
// //                         setCreditCardDetails({ ...creditCardDetails, cardHolderName: e.target.value })
// //                       }
// //                     />
// //                   </div>
// //                   <div className="form-row">
// //                     <div className="form-group col-md-6">
// //                       <label htmlFor="expiryDate">Expiry Date</label>
// //                       <input
// //                         type="text"
// //                         className="form-control"
// //                         id="expiryDate"
// //                         placeholder="MM/YY"
// //                         value={creditCardDetails.expiryDate}
// //                         onChange={(e) =>
// //                           setCreditCardDetails({ ...creditCardDetails, expiryDate: e.target.value })
// //                         }
// //                       />
// //                     </div>
// //                     <div className="form-group col-md-6">
// //                       <label htmlFor="cvv">CVV</label>
// //                       <input
// //                         type="text"
// //                         className="form-control"
// //                         id="cvv"
// //                         placeholder="CVV"
// //                         value={creditCardDetails.cvv}
// //                         onChange={(e) =>
// //                           setCreditCardDetails({ ...creditCardDetails, cvv: e.target.value })
// //                         }
// //                       />
// //                     </div>
// //                   </div>
// //                 </form>
// //               </div>
// //               <div className="modal-footer">
// //                 {!paymentSuccess ? (
// //                   <button type="button" className="btn btn-primary" onClick={handlePayNow}>
// //                     Pay Now
// //                   </button>
// //                 ) : (
// //                   <button
// //                     type="button"
// //                     className="btn btn-success"
// //                     onClick={() => setShowPaymentModal(false)}
// //                   >
// //                     Close
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Confirm Booking Button */}
// //       <button onClick={handleConfirmBooking} className="btn btn-primary">
// //         Confirm Booking
// //       </button>
// //     </div>
// //   );
// // };

// // export default Payment;
// // Import React and useState
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// // Define the Payment component
// const Payment = () => {
//   // State variables and constants
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};
//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal,
//     from,
//     to,
//     fare,
//     bookingDate,
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const [creditCardDetails, setCreditCardDetails] = useState({
//     cardNumber: '',
//     cardHolderName: '',
//     expiryDate: '',
//     cvv: '',
//   });

//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   // Function to handle changes in passenger details
//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   // Function to validate passenger details
//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   // Function to simulate payment processing (replace with actual logic)
//   const handlePayment = async () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(true); // Payment successful
//       }, 2000); // Simulate 2 seconds delay
//     });
//   };

//   // Function to handle booking confirmation
//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     setShowPaymentModal(true);
//   };

//   // Function to handle payment process
//   const handlePayNow = async () => {
//     const paymentSuccessful = await handlePayment();

//     if (paymentSuccessful) {
//       setPaymentSuccess(true);
//       generatePDF();
//     } else {
//       alert('Payment failed. Please try again.');
//     }
//   };

//   // Function to generate PDF invoice
//   const generatePDF = () => {
//     const bookingData = {
//       customerName: customerDetails?.name || 'N/A',
//       phoneNumber: customerDetails?.phoneNumber || 'N/A',
//       email: customerDetails?.email || 'N/A',
//       address: customerDetails?.address || 'N/A',
//       busId: bus?.busId || 'N/A',
//       selectedSeats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discountAmount: discountAmount || 0,
//       GST: GST || 0,
//       cartTotal: cartTotal || 0,
//       from,
//       to,
//       fare,
//       busType: bus?.busType || 'N/A',
//       bookingDate: bookingDate || 'N/A',
//     };

//     const doc = new jsPDF();
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.autoTable({
//       startY: 105,
//       head: [['Attribute', 'Value']],
//       body: [
//         ['Bus Name', bus.busName],
//         ['Bus Number', bus.busNumber],
//         ['From', bookingData.from],
//         ['To', bookingData.to],
//         ['Type', bus.busType],
//         ['Departure', new Date(bus.departure).toLocaleString()],
//         ['Arrival', new Date(bus.arrival).toLocaleString()],
//         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
//         ['Selected Seats', bookingData.selectedSeats.join(', ')],
//         ['Number of Passengers', bookingData.passenger_details.length.toString()],
//         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()],
//       ],
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text(
//           'Page ' + doc.internal.getNumberOfPages(),
//           data.settings.margin.left,
//           doc.internal.pageSize.height - 10
//         );
//       },
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     doc.save(`Ticket_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
//   };

//   // Return JSX for rendering the component
//   return (
//     <div className="container">
//       <h2 className="mt-4 mb-4" style={{ textAlign: 'center', color: 'orange' }}>
//         Booking Confirmation
//       </h2>

//       {/* Customer Details */}
//       {customerDetails && (
//         <div className="mb-4">
//           <h4>Customer Details:</h4>
//           <p>
//             <strong>Name:</strong> {customerDetails.name}
//           </p>
//           <p>
//             <strong>Phone Number:</strong> {customerDetails.phoneNumber}
//           </p>
//           <p>
//             <strong>Email:</strong> {customerDetails.email}
//           </p>
//           <p>
//             <strong>Address:</strong> {customerDetails.address}
//           </p>
//         </div>
//       )}

//       {/* Bus Details */}
//       {bus && (
//         <div className="mb-4" style={{ width: '80%', margin: '0 auto' }}>
//           <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Bus Details:</h4>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th>Bus Name</th>
//                 <td>{bus.busName}</td>
//               </tr>
//               <tr>
//                 <th>Bus Number</th>
//                 <td>{bus.busNumber}</td>
//               </tr>
//               <tr>
//                 <th>From</th>
//                 <td>{from}</td>
//               </tr>
//               <tr>
//                 <th>To</th>
//                 <td>{to}</td>
//               </tr>
//               <tr>
//                 <th>Type</th>
//                 <td>{bus.busType}</td>
//               </tr>
//               <tr>
//                 <th>Departure</th>
//                 <td>{new Date(bus.departure).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Arrival</th>
//                 <td>{new Date(bus.arrival).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Fare</th>
//                 <td>₹ {fare.toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Selected Seats</th>
//                 <td>{selectedSeats.map((seat) => seat + 1).join(', ')}</td>
//               </tr>
//               <tr>
//                 <th>Number of Passengers</th>
//                 <td>{numPassengers}</td>
//               </tr>
//               <tr>
//                 <th>Booking Date</th>
//                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Passenger Details */}
//       <div className="mb-4">
//         <h4 style={{ color: 'orange' }}>Passenger Details:</h4>
//         {passengerDetails.map((passenger, index) => (
//           <div key={index} className="mb-3">
//             <h5 style={{ color: 'grey' }}>Passenger {index + 1}</h5>
//             <div className="row">
//               <div className="col-md-4">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Name"
//                   value={passenger.name}
//                   onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <input
//                   type="number"
//                   className="form-control"
//                   placeholder="Age"
//                   value={passenger.age}
//                   onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <select
//                   className="form-control"
//                   value={passenger.gender}
//                   onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Payment Modal */}
//       {showPaymentModal && (
//         <div className="modal d-block" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Payment Details</h5>
//                 <button type="button" className="close" onClick={() => setShowPaymentModal(false)}>
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="form-group">
//                     <label htmlFor="cardNumber">Card Number</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="cardNumber"
//                       placeholder="Enter card number"
//                       value={creditCardDetails.cardNumber}
//                       onChange={(e) =>
//                         setCreditCardDetails({ ...creditCardDetails, cardNumber: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="cardHolderName">Card Holder Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="cardHolderName"
//                       placeholder="Enter card holder name"
//                       value={creditCardDetails.cardHolderName}
//                       onChange={(e) =>
//                         setCreditCardDetails({ ...creditCardDetails, cardHolderName: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="form-row">
//                     <div className="form-group col-md-6">
//                       <label htmlFor="expiryDate">Expiry Date</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="expiryDate"
//                         placeholder="MM/YY"
//                         value={creditCardDetails.expiryDate}
//                         onChange={(e) =>
//                           setCreditCardDetails({ ...creditCardDetails, expiryDate: e.target.value })
//                         }
//                       />
//                     </div>
//                     <div className="form-group col-md-6">
//                       <label htmlFor="cvv">CVV</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="cvv"
//                         placeholder="CVV"
//                         value={creditCardDetails.cvv}
//                         onChange={(e) =>
//                           setCreditCardDetails({ ...creditCardDetails, cvv: e.target.value })
//                         }
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//               <div className="modal-footer">
//                 {!paymentSuccess ? (
//                   <button type="button" className="btn btn-primary" onClick={handlePayNow}>
//                     Pay Now
//                   </button>
//                 ) : (
//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     onClick={() => setShowPaymentModal(false)}
//                   >
//                     Close
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Confirm Booking Button */}
//       <button onClick={handleConfirmBooking} className="btn btn-primary">
//         Confirm Booking
//       </button>
//     </div>
//   );
// };

// // Export the Payment component as the default export
// export default Payment;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal,
//     from,
//     to,
//     fare,
//     bookingDate,
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const [creditCardDetails, setCreditCardDetails] = useState({
//     cardNumber: '',
//     cardHolderName: '',
//     expiryDate: '',
//     cvv: '',
//   });

//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handlePayment = async () => {
//     // Simulate payment processing, replace with actual logic
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(true); // Payment successful
//       }, 2000); // Simulate 2 seconds delay
//     });
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     setShowPaymentModal(true);
//   };

//   const handlePayNow = async () => {
//     const paymentSuccessful = await handlePayment();

//     if (paymentSuccessful) {
//       setPaymentSuccess(true);
//       generatePDF();
//     } else {
//       alert('Payment failed. Please try again.');
//     }
//   };

//   const generatePDF = () => {
//     const bookingData = {
//       customerName: customerDetails?.name || 'N/A',
//       phoneNumber: customerDetails?.phoneNumber || 'N/A',
//       email: customerDetails?.email || 'N/A',
//       address: customerDetails?.address || 'N/A',
//       busId: bus?.busId || 'N/A',
//       selectedSeats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discountAmount: discountAmount || 0,
//       GST: GST || 0,
//       cartTotal: cartTotal || 0,
//       from,
//       to,
//       fare,
//       busType: bus?.busType || 'N/A',
//       bookingDate: bookingDate || 'N/A',
//     };

//     const doc = new jsPDF();
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.autoTable({
//       startY: 105,
//       head: [['Attribute', 'Value']],
//       body: [
//         ['Bus Name', bus.busName],
//         ['Bus Number', bus.busNumber],
//         ['From', bookingData.from],
//         ['To', bookingData.to],
//         ['Type', bus.busType],
//         ['Departure', new Date(bus.departure).toLocaleString()],
//         ['Arrival', new Date(bus.arrival).toLocaleString()],
//         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
//         ['Selected Seats', bookingData.selectedSeats.join(', ')],
//         ['Number of Passengers', bookingData.passenger_details.length.toString()],
//         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
//       ],
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text(
//           'Page ' + doc.internal.getNumberOfPages(),
//           data.settings.margin.left,
//           doc.internal.pageSize.height - 10
//         );
//       },
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     doc.save(`Ticket_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
//   };

//   return (
//     <div className="container">
//       <h2 className="mt-4 mb-4" style={{ textAlign: 'center', color: 'orange' }}>
//         Booking Confirmation
//       </h2>

//       {/* Customer Details */}
//       {customerDetails && (
//         <div className="mb-4">
//           <h4>Customer Details:</h4>
//           <p>
//             <strong>Name:</strong> {customerDetails.name}
//           </p>
//           <p>
//             <strong>Phone Number:</strong> {customerDetails.phoneNumber}
//           </p>
//           <p>
//             <strong>Email:</strong> {customerDetails.email}
//           </p>
//           <p>
//             <strong>Address:</strong> {customerDetails.address}
//           </p>
//         </div>
//       )}

//       {/* Bus Details */}
//       {bus && (
//         <div className="mb-4" style={{ background: '#f2f2f2', padding: '20px', textAlign: 'center' }}>
//           <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Bus Details:</h4>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th>Bus Name</th>
//                 <td>{bus.busName}</td>
//               </tr>
//               <tr>
//                 <th>Bus Number</th>
//                 <td>{bus.busNumber}</td>
//               </tr>
//               <tr>
//                 <th>From</th>
//                 <td>{from}</td>
//               </tr>
//               <tr>
//                 <th>To</th>
//                 <td>{to}</td>
//               </tr>
//               <tr>
//                 <th>Type</th>
//                 <td>{bus.busType}</td>
//               </tr>
//               <tr>
//                 <th>Departure</th>
//                 <td>{new Date(bus.departure).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Arrival</th>
//                 <td>{new Date(bus.arrival).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Fare</th>
//                 <td>₹ {fare.toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Selected Seats</th>
//                 <td>{selectedSeats.map((seat) => seat + 1).join(', ')}</td>
//               </tr>
//               <tr>
//                 <th>Number of Passengers</th>
//                 <td>{numPassengers}</td>
//               </tr>
//               <tr>
//                 <th>Booking Date</th>
//                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Passenger Details */}
//       <div className="mb-4" style={{ textAlign: 'center' }}>
//         <h4 style={{ color: 'orange' }}>Passenger Details:</h4>
//         {passengerDetails.map((passenger, index) => (
//           <div key={index} className="mb-3">
//             <h5 style={{ color: 'grey' }}>Passenger {index + 1}</h5>
//             <div className="row">
//               <div className="col-md-4">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Name"
//                   value={passenger.name}
//                   onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <input
//                   type="number"
//                   className="form-control"
//                   placeholder="Age"
//                   value={passenger.age}
//                   onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <select
//                   className="form-control"
//                   value={passenger.gender}
//                   onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Payment Modal */}
//       {showPaymentModal && (
//         <div className="modal d-block" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Payment Details</h5>
//                 <button type="button" className="close" onClick={() => setShowPaymentModal(false)}>
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="form-group">
//                     <label htmlFor="cardNumber">Card Number</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="cardNumber"
//                       placeholder="Enter card number"
//                       value={creditCardDetails.cardNumber}
//                       onChange={(e) =>
//                         setCreditCardDetails({ ...creditCardDetails, cardNumber: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="cardHolderName">Card Holder Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="cardHolderName"
//                       placeholder="Enter card holder name"
//                       value={creditCardDetails.cardHolderName}
//                       onChange={(e) =>
//                         setCreditCardDetails({ ...creditCardDetails, cardHolderName: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="form-row">
//                     <div className="form-group col-md-6">
//                       <label htmlFor="expiryDate">Expiry Date</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="expiryDate"
//                         placeholder="MM/YY"
//                         value={creditCardDetails.expiryDate}
//                         onChange={(e) =>
//                           setCreditCardDetails({ ...creditCardDetails, expiryDate: e.target.value })
//                         }
//                       />
//                     </div>
//                     <div className="form-group col-md-6">
//                       <label htmlFor="cvv">CVV</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="cvv"
//                         placeholder="CVV"
//                         value={creditCardDetails.cvv}
//                         onChange={(e) =>
//                           setCreditCardDetails({ ...creditCardDetails, cvv: e.target.value })
//                         }
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//               <div className="modal-footer">
//                 {!paymentSuccess ? (
//                   <button type="button" className="btn btn-primary" onClick={handlePayNow}>
//                     Pay Now
//                   </button>
//                 ) : (
//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     onClick={() => setShowPaymentModal(false)}
//                   >
//                     Close
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Confirm Booking Button */}
//       <div style={{ textAlign: 'center' }}>
//         <button onClick={handleConfirmBooking} className="btn btn-warning">
//           Confirm Booking
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment;
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal,
//     from,
//     to,
//     fare,
//     bookingDate,
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const [creditCardDetails, setCreditCardDetails] = useState({
//     cardNumber: '',
//     cardHolderName: '',
//     expiryDate: '',
//     cvv: '',
//   });

//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handlePayment = async () => {
//     // Simulate payment processing, replace with actual logic
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(true); // Payment successful
//       }, 2000); // Simulate 2 seconds delay
//     });
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     setShowPaymentModal(true);
//   };

//   const handlePayNow = async () => {
//     const paymentSuccessful = await handlePayment();

//     if (paymentSuccessful) {
//       setPaymentSuccess(true);
//       generatePDF();
//     } else {
//       alert('Payment failed. Please try again.');
//     }
//   };

//   const generatePDF = () => {
//     const bookingData = {
//       customerName: customerDetails?.name || 'N/A',
//       phoneNumber: customerDetails?.phoneNumber || 'N/A',
//       email: customerDetails?.email || 'N/A',
//       address: customerDetails?.address || 'N/A',
//       busId: bus?.busId || 'N/A',
//       selectedSeats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discountAmount: discountAmount || 0,
//       GST: GST || 0,
//       cartTotal: cartTotal || 0,
//       from,
//       to,
//       fare,
//       busType: bus?.busType || 'N/A',
//       bookingDate: bookingDate || 'N/A',
//     };

//     const doc = new jsPDF();
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.autoTable({
//       startY: 105,
//       head: [['Attribute', 'Value']],
//       body: [
//         ['Bus Name', bus.busName],
//         ['Bus Number', bus.busNumber],
//         ['From', bookingData.from],
//         ['To', bookingData.to],
//         ['Type', bus.busType],
//         ['Departure', new Date(bus.departure).toLocaleString()],
//         ['Arrival', new Date(bus.arrival).toLocaleString()],
//         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
//         ['Selected Seats', bookingData.selectedSeats.join(', ')],
//         ['Number of Passengers', bookingData.passenger_details.length.toString()],
//         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
//       ],
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text(
//           'Page ' + doc.internal.getNumberOfPages(),
//           data.settings.margin.left,
//           doc.internal.pageSize.height - 10
//         );
//       },
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     doc.save(`Ticket_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
//   };

//   return (
//     <div className="container" style={{ maxWidth: '600px', margin: 'auto' }}>
//       <h2 className="mt-4 mb-4" style={{ textAlign: 'center', color: 'orange' }}>
//         Booking Confirmation
//       </h2>

//       {/* Customer Details */}
//       {customerDetails && (
//         <div className="mb-4">
//           <h4>Customer Details:</h4>
//           <p>
//             <strong>Name:</strong> {customerDetails.name}
//           </p>
//           <p>
//             <strong>Phone Number:</strong> {customerDetails.phoneNumber}
//           </p>
//           <p>
//             <strong>Email:</strong> {customerDetails.email}
//           </p>
//           <p>
//             <strong>Address:</strong> {customerDetails.address}
//           </p>
//         </div>
//       )}

//       {/* Bus Details */}
//       {bus && (
//         <div className="mb-4" style={{ background: '#f2f2f2', padding: '20px', textAlign: 'center' }}>
//           <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Bus Details:</h4>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th>Bus Name</th>
//                 <td>{bus.busName}</td>
//               </tr>
//               <tr>
//                 <th>Bus Number</th>
//                 <td>{bus.busNumber}</td>
//               </tr>
//               <tr>
//                 <th>From</th>
//                 <td>{from}</td>
//               </tr>
//               <tr>
//                 <th>To</th>
//                 <td>{to}</td>
//               </tr>
//               <tr>
//                 <th>Type</th>
//                 <td>{bus.busType}</td>
//               </tr>
//               <tr>
//                 <th>Departure</th>
//                 <td>{bus.Route.departure}</td>
//               </tr>
//               <tr>
//                 <th>Arrival</th>
//                 <td>{bus.Route.arrival}</td>
//               </tr>
//               <tr>
//                 <th>Fare</th>
//                 <td>₹ {fare.toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Selected Seats</th>
//                 <td>{selectedSeats.map((seat) => seat + 1).join(', ')}</td>
//               </tr>
//               <tr>
//                 <th>Number of Passengers</th>
//                 <td>{numPassengers}</td>
//               </tr>
//               <tr>
//                 <th>Booking Date</th>
//                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Passenger Details */}
//       <div className="mb-4" style={{ textAlign: 'center' }}>
//         <h4 style={{ color: 'orange' }}>Passenger Details:</h4>
//         {passengerDetails.map((passenger, index) => (
//           <div key={index} className="mb-3">
//             <h5 style={{ color: 'grey' }}>Passenger {index + 1}</h5>
//             <div className="row">
//               <div className="col-md-4">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Name"
//                   value={passenger.name}
//                   onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <input
//                   type="number"
//                   className="form-control"
//                   placeholder="Age"
//                   value={passenger.age}
//                   onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <select
//                   className="form-control"
//                   value={passenger.gender}
//                   onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Payment Modal */}
//       {showPaymentModal && (
//         <div className="modal d-block" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Payment Details</h5>
//                 <button type="button" className="close" onClick={() => setShowPaymentModal(false)}>
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="form-group">
//                     <label htmlFor="cardNumber">Card Number</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="cardNumber"
//                       placeholder="Enter card number"
//                       value={creditCardDetails.cardNumber}
//                       onChange={(e) =>
//                         setCreditCardDetails({ ...creditCardDetails, cardNumber: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="cardHolderName">Card Holder Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="cardHolderName"
//                       placeholder="Enter card holder name"
//                       value={creditCardDetails.cardHolderName}
//                       onChange={(e) =>
//                         setCreditCardDetails({ ...creditCardDetails, cardHolderName: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="form-row">
//                     <div className="form-group col-md-6">
//                       <label htmlFor="expiryDate">Expiry Date</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="expiryDate"
//                         placeholder="MM/YY"
//                         value={creditCardDetails.expiryDate}
//                         onChange={(e) =>
//                           setCreditCardDetails({ ...creditCardDetails, expiryDate: e.target.value })
//                         }
//                       />
//                     </div>
//                     <div className="form-group col-md-6">
//                       <label htmlFor="cvv">CVV</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="cvv"
//                         placeholder="CVV"
//                         value={creditCardDetails.cvv}
//                         onChange={(e) =>
//                           setCreditCardDetails({ ...creditCardDetails, cvv: e.target.value })
//                         }
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//               <div className="modal-footer">
//                 {!paymentSuccess ? (
//                   <button type="button" className="btn btn-primary" onClick={handlePayNow}>
//                     Pay Now
//                   </button>
//                 ) : (
//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     onClick={() => setShowPaymentModal(false)}
//                   >
//                     Close
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Confirm Booking Button */}
//       <div style={{ textAlign: 'center' }}>
//         <button onClick={handleConfirmBooking} className="btn btn-warning">
//           Confirm Booking
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment;
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal,
//     from,
//     to,
//     fare,
//     bookingDate,
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const [creditCardDetails, setCreditCardDetails] = useState({
//     cardNumber: '',
//     cardHolderName: '',
//     expiryDate: '',
//     cvv: '',
//   });

//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handlePayment = async () => {
//     // Simulate payment processing, replace with actual logic
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(true); // Payment successful
//       }, 2000); // Simulate 2 seconds delay
//     });
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     setShowPaymentModal(true);
//   };

//   const handlePayNow = async () => {
//     const paymentSuccessful = await handlePayment();

//     if (paymentSuccessful) {
//       setPaymentSuccess(true);
//       generatePDF();
//     } else {
//       alert('Payment failed. Please try again.');
//     }
//   };

//   const generatePDF = () => {
//     const bookingData = {
//       customerName: customerDetails?.name || 'N/A',
//       phoneNumber: customerDetails?.phoneNumber || 'N/A',
//       email: customerDetails?.email || 'N/A',
//       address: customerDetails?.address || 'N/A',
//       busId: bus?.busId || 'N/A',
//       selectedSeats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discountAmount: discountAmount || 0,
//       GST: GST || 0,
//       cartTotal: cartTotal || 0,
//       from,
//       to,
//       fare,
//       busType: bus?.busType || 'N/A',
//       bookingDate: bookingDate || 'N/A',
//     };

//     const doc = new jsPDF();
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.autoTable({
//       startY: 105,
//       head: [['Attribute', 'Value']],
//       body: [
//         ['Bus Name', bus.busName],
//         ['Bus Number', bus.busNumber],
//         ['From', bookingData.from],
//         ['To', bookingData.to],
//         ['Type', bus.busType],
//         ['Departure', new Date(bus.departure).toLocaleString()],
//         ['Arrival', new Date(bus.arrival).toLocaleString()],
//         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
//         ['Selected Seats', bookingData.selectedSeats.join(', ')],
//         ['Number of Passengers', bookingData.passenger_details.length.toString()],
//         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
//       ],
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text(
//           'Page ' + doc.internal.getNumberOfPages(),
//           data.settings.margin.left,
//           doc.internal.pageSize.height - 10
//         );
//       },
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     doc.save(`Ticket_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
//   };

//   return (
//     <div className="container" style={{ maxWidth: '600px', margin: 'auto' }}>
//       <h2 className="mt-4 mb-4" style={{ textAlign: 'center', color: 'orange' }}>
//         Booking Confirmation
//       </h2>

//       {/* Customer Details */}
//       {customerDetails && (
//         <div className="mb-4">
//           <h4>Customer Details:</h4>
//           <p>
//             <strong>Name:</strong> {customerDetails.name}
//           </p>
//           <p>
//             <strong>Phone Number:</strong> {customerDetails.phoneNumber}
//           </p>
//           <p>
//             <strong>Email:</strong> {customerDetails.email}
//           </p>
//           <p>
//             <strong>Address:</strong> {customerDetails.address}
//           </p>
//         </div>
//       )}

//       {/* Bus Details */}
//       {bus && (
//         <div className="mb-4" style={{ background: '#f2f2f2', padding: '20px', textAlign: 'center' }}>
//           <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Bus Details:</h4>
//           <div className="row mb-3">
//             <label className="col-sm-4 col-form-label">Bus Name:</label>
//             <div className="col-sm-8">
//               <p>{bus.busName}</p>
//             </div>
//           </div>
//           <div className="row mb-3">
//             <label className="col-sm-4 col-form-label">Bus Number:</label>
//             <div className="col-sm-8">
//               <p>{bus.busNumber}</p>
//             </div>
//           </div>
//           <div className="row mb-3">
//             <label className="col-sm-4 col-form-label">From:</label>
//             <div className="col-sm-8">
//               <p>{from}</p>
//             </div>
//           </div>
//           <div className="row mb-3">
//             <label className="col-sm-4 col-form-label">To:</label>
//             <div className="col-sm-8">
//               <p>{to}</p>
//             </div>
//           </div>
//           <div className="row mb-3">
//             <label className="col-sm-4 col-form-label">Type:</label>
//             <div className="col-sm-8">
//               <p>{bus.busType}</p>
//             </div>
//           </div>
//           <div className="row mb-3">
//             <label className="col-sm-4 col-form-label">Departure:</label>
//             <div className="col-sm-8">
//               <p>{new Date(bus.departure).toLocaleString()}</p>
//             </div>
//           </div>
//           <div className="row mb-3">
//             <label className="col-sm-4 col-form-label">Arrival:</label>
//             <div className="col-sm-8">
//               <p>{new Date(bus.arrival).toLocaleString()}</p>
//             </div>
//           </div>
//           <div className="row mb-3">
//             <label className="col-sm-4 col-form-label">Fare:</label>
//             <div className="col-sm-8">
//               <p>₹ {fare.toLocaleString()}</p>
//             </div>
//           </div>
//           <div className="row mb-3">
//             <label className="col-sm-4 col-form-label">Selected Seats:</label>
//             <div className="col-sm-8">
//               <p>{selectedSeats.map((seat) => seat + 1).join(', ')}</p>
//             </div>
//           </div>
//           <div className="row mb-3">
//             <label className="col-sm-4 col-form-label">Number of Passengers:</label>
//             <div className="col-sm-8">
//               <p>{numPassengers}</p>
//             </div>
//           </div>
//           <div className="row mb-3">
//             <label className="col-sm-4 col-form-label">Booking Date:</label>
//             <div className="col-sm-8">
//               <p>{new Date(bookingDate).toLocaleDateString()}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Passenger Details */}
//       <div className="mb-4" style={{ textAlign: 'center' }}>
//         <h4 style={{ color: 'orange' }}>Passenger Details:</h4>
//         {passengerDetails.map((passenger, index) => (
//           <div key={index} className="mb-3">
//             <input
//               type="text"
//               className="form-control mb-2"
//               placeholder="Passenger Name"
//               value={passenger.name}
//               onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//               required
//             />
//             <input
//               type="text"
//               className="form-control mb-2"
//               placeholder="Passenger Age"
//               value={passenger.age}
//               onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//               required
//             />
//             <input
//               type="text"
//               className="form-control mb-4"
//               placeholder="Passenger Gender"
//               value={passenger.gender}
//               onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//               required
//             />
//           </div>
//         ))}
//       </div>

//       {/* Payment Button */}
//       <div className="text-center mb-4">
//         <button className="btn btn-lg btn-success" onClick={handleConfirmBooking}>
//           Confirm Booking
//         </button>
//       </div>

//       {/* Payment Modal */}
//       {showPaymentModal && (
//         <div className="modal show" style={{ display: 'block' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Payment</h5>
//                 <button type="button" className="btn-close" onClick={() => setShowPaymentModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 {!paymentSuccess ? (
//                   <>
//                     <p>Enter your credit card details to complete the payment.</p>
//                     <input
//                       type="text"
//                       className="form-control mb-3"
//                       placeholder="Card Number"
//                       value={creditCardDetails.cardNumber}
//                       onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cardNumber: e.target.value })}
//                       required
//                     />
//                     <input
//                       type="text"
//                       className="form-control mb-3"
//                       placeholder="Card Holder Name"
//                       value={creditCardDetails.cardHolderName}
//                       onChange={(e) =>
//                         setCreditCardDetails({ ...creditCardDetails, cardHolderName: e.target.value })
//                       }
//                       required
//                     />
//                     <input
//                       type="text"
//                       className="form-control mb-3"
//                       placeholder="Expiry Date (MM/YYYY)"
//                       value={creditCardDetails.expiryDate}
//                       onChange={(e) => setCreditCardDetails({ ...creditCardDetails, expiryDate: e.target.value })}
//                       required
//                     />
//                     <input
//                       type="text"
//                       className="form-control mb-3"
//                       placeholder="CVV"
//                       value={creditCardDetails.cvv}
//                       onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cvv: e.target.value })}
//                       required
//                     />
//                   </>
//                 ) : (
//                   <div className="text-center">
//                     <h4>Payment Successful!</h4>
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 {!paymentSuccess ? (
//                   <button className="btn btn-primary" onClick={handlePayNow}>
//                     Pay Now
//                   </button>
//                 ) : (
//                   <button className="btn btn-primary" onClick={() => navigate('/')}>
//                    Done
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payment;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails, customerDetails } = location.state || {};

  const {
    selectedSeats,
    bus,
    numPassengers,
    discountAmount,
    GST,
    cartTotal,
    from,
    to,
    fare,
    bookingDate,
  } = bookingDetails || {};
console.log(bus)
  const [passengerDetails, setPassengerDetails] = useState(
    Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
  );
console.log(selectedSeats)
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePassengerChange = (index, field, value) => {
    const updatedDetails = passengerDetails.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengerDetails(updatedDetails);
  };

  const validatePassengerDetails = () => {
    for (const passenger of passengerDetails) {
      if (!passenger.name || !passenger.age || !passenger.gender) {
        return false;
      }
    }
    return true;
  };

  const handlePayment = async () => {
    // Simulate payment processing, replace with actual logic
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(true); // Payment successful
    //   }, 2000); // Simulate 2 seconds delay
    // });
    try{
      return await axios.post("http://localhost:3000/booking",{
        customerName:"",
        phoneNumber:"",
        email:"",
        address:"",
        busId:bus.busId,
        selectedSeats:selectedSeats,
        discountAmount:discountAmount,
        gst:"",
        cartTotal:cartTotal,
        createdAt:"",
        updatedAt:"",
        passengerDetails:passengerDetails
  
      },{
        header:{"Content-type":"application/json"}
      })
     
    }
    catch(err){
      console.log(err)
    }
    

  };

  const handleConfirmBooking = async () => {
    if (!validatePassengerDetails()) {
      alert('Please fill in all passenger details.');
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePayNow = async () => {
    const paymentSuccessful = await handlePayment();

    if (paymentSuccessful) {
      setPaymentSuccess(true);
      generatePDF();
    } else {
      alert('Payment failed. Please try again.');
    }
  };

  const generatePDF = () => {
    const bookingData = {
      customerName: customerDetails?.name || 'N/A',
      phoneNumber: customerDetails?.phoneNumber || 'N/A',
      email: customerDetails?.email || 'N/A',
      address: customerDetails?.address || 'N/A',
      busId: bus?.busId || 'N/A',
      selectedSeats: selectedSeats || [],
      passenger_details: passengerDetails,
      discountAmount: discountAmount || 0,
      GST: GST || 0,
      cartTotal: cartTotal || 0,
      from,
      to,
      fare,
      busType: bus?.busType || 'N/A',
      bookingDate: bookingDate || 'N/A',
    };

    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Journey -Jet', 105, 20, 'center');
    doc.setFontSize(18);
    doc.text('Invoice', 105, 35, 'center');

    // Bus details section
    doc.text('Bus Details:', 20, 100);
    doc.autoTable({
      startY: 105,
      head: [['Attribute', 'Value']],
      body: [
        ['Bus Name', bus.busName],
        ['Bus Number', bus.busNumber],
        ['From', bookingData.from],
        ['To', bookingData.to],
        ['Type', bus.busType],
        ['Departure', new Date(bus.departure).toLocaleString()],
        ['Arrival', new Date(bus.arrival).toLocaleString()],
        ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
        ['Selected Seats', bookingData.selectedSeats.join(', ')],
        ['Number of Passengers', bookingData.passenger_details.length.toString()],
        ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
      ],
      didDrawPage: (data) => {
        // Add page numbers
        doc.setFontSize(12);
        doc.text(
          'Page ' + doc.internal.getNumberOfPages(),
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      },
    });

    // Totals section
    doc.setFontSize(16);
    doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
    doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
    doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

    // Save PDF with a professional filename
    doc.save(`Ticket_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
  };

  return (
    <div className="container" style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2 className="mt-4 mb-4" style={{ textAlign: 'center', color: 'orange' }}>
        Booking Confirmation
      </h2>

      {/* Customer Details */}
      {customerDetails && (
        <div className="mb-4">
          <h4>Customer Details:</h4>
          <p>
            <strong>Name:</strong> {customerDetails.name}
          </p>
          <p>
            <strong>Phone Number:</strong> {customerDetails.phoneNumber}
          </p>
          <p>
            <strong>Email:</strong> {customerDetails.email}
          </p>
          <p>
            <strong>Address:</strong> {customerDetails.address}
          </p>
        </div>
      )}

      {/* Bus Details */}
      {bus && (
        <div className="mb-4" style={{ background: '#f2f2f2', padding: '20px', textAlign: 'center' }}>
          <h4 style={{ color: 'grey', fontWeight: 'bold' }}>Bus Details:</h4>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Bus Name:</label>
            <div className="col-sm-8">
              <p>{bus.busName}</p>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Bus Number:</label>
            <div className="col-sm-8">
              <p>{bus.busNumber}</p>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">From:</label>
            <div className="col-sm-8">
              <p>{from}</p>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">To:</label>
            <div className="col-sm-8">
              <p>{to}</p>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Type:</label>
            <div className="col-sm-8">
              <p>{bus.busType}</p>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Departure:</label>
            <div className="col-sm-8">
              <p>{bus.Route?.departure}</p>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Arrival:</label>
            <div className="col-sm-8">
              <p>{bus.Route?.arrival}</p>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Fare:</label>
            <div className="col-sm-8">
              <p>₹ {fare.toLocaleString()}</p>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Selected Seats:</label>
            <div className="col-sm-8">
              <p>{selectedSeats.map((seat) => seat + 1).join(', ')}</p>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Number of Passengers:</label>
            <div className="col-sm-8">
              <p>{numPassengers}</p>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Booking Date:</label>
            <div className="col-sm-8">
              <p>{new Date(bookingDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Passenger Details */}
      <div className="mb-4" style={{ textAlign: 'center' }}>
        <h4 style={{ color: 'orange' }}>Passenger Details:</h4>
        {passengerDetails.map((passenger, index) => (
          <div key={index} className="mb-3">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Name"
              value={passenger.name}
              onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
              required
              style={{ backgroundColor: 'transparent', border: '1px solid orange', color: 'orange' }}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Age"
              value={passenger.age}
              onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
              required
              style={{ backgroundColor: 'transparent', border: '1px solid orange', color: 'orange' }}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Gender"
              value={passenger.gender}
              onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
              required
              style={{ backgroundColor: 'transparent', border: '1px solid orange', color: 'orange' }}
            />
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Payment Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPaymentModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {!paymentSuccess ? (
                  <>
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Card Number"
                      value={creditCardDetails.cardNumber}
                      onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cardNumber: e.target.value })}
                      required
                      style={{ backgroundColor: 'transparent', border: '1px solid orange', color: 'orange' }}
                    />
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Card Holder Name"
                      value={creditCardDetails.cardHolderName}
                      onChange={(e) =>
                        setCreditCardDetails({ ...creditCardDetails, cardHolderName: e.target.value })
                      }
                      required
                      style={{ backgroundColor: 'transparent', border: '1px solid orange', color: 'orange' }}
                    />
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Expiry Date (MM/YYYY)"
                      value={creditCardDetails.expiryDate}
                      onChange={(e) => setCreditCardDetails({ ...creditCardDetails, expiryDate: e.target.value })}
                      required
                      style={{ backgroundColor: 'transparent', border: '1px solid orange', color: 'orange' }}
                    />
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="CVV"
                      value={creditCardDetails.cvv}
                      onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cvv: e.target.value })}
                      required
                      style={{ backgroundColor: 'transparent', border: '1px solid orange', color: 'orange' }}
                    />
                    <button className="btn btn-primary" onClick={handlePayNow}>
                      Pay Now
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <h4 style={{ color: 'green' }}>Payment Successful!</h4>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Booking Button */}
      {!showPaymentModal && (
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleConfirmBooking}>
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;

