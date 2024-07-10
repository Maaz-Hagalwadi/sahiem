
const express = require('express');
const router = express.Router();
const { transporter, mailOptions } = require('./nodemailerConfig');

router.post('/', async (req, res) => {
  const { recipientEmail, pdfBase64 } = req.body;

  if (!pdfBase64) {
    return res.status(400).send('PDF data is required.');
  }

  const options = {
    ...mailOptions,
    to: recipientEmail,
    subject: 'Your Booking Invoice',
    text: 'Please find attached your booking invoice.',
    attachments: [
      {
        filename: 'invoice.pdf',
        content: pdfBase64.split('base64,')[1],
        encoding: 'base64'
      }
    ]
  };

  try {
    const info = await transporter.sendMail(options);
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email: ' + error.message);
  }
});

module.exports = router;
