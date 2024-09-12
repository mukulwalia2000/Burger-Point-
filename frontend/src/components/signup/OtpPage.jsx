import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to verify OTP
    const otpLS =  localStorage.getItem('otp')
    if (otp === otpLS ) { // Example OTP, replace with real verification
      setSuccess('OTP verified successfully!');
      setError('');
      localStorage.removeItem('otp')
      navigate('/login')
    } else {
      setError('Invalid OTP. Please try again.');
      setSuccess('');
      setTimeout(()=>{
      localStorage.removeItem('otp')},120000)//localStorage clear otp ater 2min
      navigate('/signup')
    }
  };

  return (
    <section className="otp-page">
      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="otp-form"
      >
        <h2>Enter OTP</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <div className="input-group">
          <label htmlFor="otp">OTP</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={handleInputChange}
            required
            maxLength="6" // Assuming OTP is 6 digits
          />
        </div>

        <button type="submit">Verify OTP</button>
        {/* <div className="extra-options">
          <span className="resend-link">
            Didn't receive the code? <Link to="/resend-otp">Resend OTP</Link>
          </span>
        </div> */}
      </motion.form>
    </section>
  );
};

export default OtpPage;
