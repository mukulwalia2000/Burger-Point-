import nodemailer from 'nodemailer';

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'mukulwalia57@gmail.com', 
    pass: 'ebxs uolc bdsk ljod' 
  }
});

// Function to send an email
const sendEmail = async ( to, otp ) => {
  const mailOptions = {
    from: 'mukulwalia57@gmail.com', 
    to: to, 
    subject: 'Burger Point', 
    html:`welcome to buger point you registration otp is ${otp}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ' + error);
  }
};

export { sendEmail };
