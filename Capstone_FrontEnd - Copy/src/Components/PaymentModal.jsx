// import React from 'react';
// import { Modal, Button } from 'react-bootstrap';
 
// const PaymentModal = ({ show, onClose, onGeneratePDF, bookingData, cartTotal }) => {
//   const handlePayment = () => {
//     // Implement payment processing logic here
//     // Once payment is successful, generate the PDF invoice
//     onGeneratePDF(bookingData);
//     onClose();
//   };
 
//   return (
//     <Modal show={show} onHide={onClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Payment</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Total Amount: ₹ {cartTotal.toLocaleString()}</h4>
//         {/* Add payment form or payment gateway integration here */}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handlePayment}>
//           Make Payment
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };
 
// export default PaymentModal;
// Inside PaymentModal.jsx
// PaymentModal.jsx
// import React from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import jsPDF from 'jspdf';

// const PaymentModal = ({ show, onClose, onSuccess, bookingDetails, cartTotal }) => {
//   const handlePayment = async () => {
//     try {
//       // Implement actual payment processing logic here
//       // Simulate a delay with setTimeout for demonstration
//       await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay

//       // Assuming payment is successful
//       onSuccess(); // Call onSuccess callback provided by parent component
//     } catch (error) {
//       console.error('Payment Error:', error);
//       // Handle payment failure if needed
//       alert('Payment failed. Please try again.');
//     }
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Generate invoice details
//     doc.text(`Customer Name: ${bookingDetails.customerName}`, 20, 60);
//     doc.text(`Total Amount: ₹ ${cartTotal.toLocaleString()}`, 20, 80);

//     // Save PDF with a professional filename
//     doc.save(`Invoice_${bookingDetails.customerName.replace(/\s/g, '_')}.pdf`);
//   };

//   return (
//     <Modal show={show} onHide={onClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Payment</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Total Amount: ₹ {cartTotal}</h4>
//         {/* Payment form or gateway integration */}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={() => {
//           handlePayment();
//           generatePDF(); // Generate PDF upon payment success
//         }}>
//           Make Payment
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default PaymentModal;
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';

const PaymentModal = ({ show, onClose, onSuccess, bookingDetails, cartTotal }) => {
  const handlePayment = async () => {
    try {
      // Simulate a delay with setTimeout for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Assuming payment is successful (simulate success with a probability)
      const paymentSuccessful = Math.random() < 0.8; // 80% chance of success
      if (paymentSuccessful) {
        onSuccess(); // Call onSuccess callback provided by parent component
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      // Handle payment failure if needed
      alert('Payment failed. Please try again.');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Journey -Jet', 105, 20, 'center');
    doc.setFontSize(18);
    doc.text('Invoice', 105, 35, 'center');

    // Generate invoice details
    doc.text(`Customer Name: ${bookingDetails.customerName}`, 20, 60);
    doc.text(`Total Amount: ₹ ${cartTotal.toLocaleString()}`, 20, 80);

    // Save PDF with a professional filename
    doc.save(`Invoice_${bookingDetails.customerName.replace(/\s/g, '_')}.pdf`);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Total Amount: ₹ {cartTotal}</h4>
        {/* Payment form or gateway integration */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {
          handlePayment();
          // Do not generate PDF here, wait for payment success
        }}>
          Make Payment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
