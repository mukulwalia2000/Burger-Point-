import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneNumber = async(e) => {
    e.preventDefault();
    
    try { 
        const response = await axios.post('/api/v1/forgot-password', phoneNumber)
        if (response.data) {
            setMessage('Password reset otp sent to your register phone number');
            setError('');
            
        }
    } catch(error) {
      setError('No account found with that phone Number.');
      setMessage('');
    }
  };
  const handlePassword = async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post('/api/v1/reset-password', { phoneNumber, password } )
      if (response.data) {
        setMessage('Password reset otp sent to your register phone number');
        setError('');
        navigate('/login')
      }
    } catch(error) {
      setError('No account found with that phone Number.');
      setMessage('');
    }
}
      return (
        <>
    <section className="forgot-password">
      <motion.form
        initial={{ opacity: 0, y: "-100vh" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handlePhoneNumber}
        className="forgot-password-form"
      >
        <h2>Forgot Password</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <div className="input-group">
          <label htmlFor="phoneNumber">Enter Phone Number</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Send Otp</button>

        
      </motion.form>
    </section>
    <section className="reset-password">
      <motion.form
        initial={{ opacity: 0, y: "-100vh" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handlePassword}
        className="reset-password-form"
      >
        <h2>Forgot Password</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <div className="input-group">
          <label htmlFor="otp">Enter otp</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e)=>{setOtp(e.target.value)}}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            required
          />
        </div>

        <button type="submit">Set Password</button>
        
      </motion.form>
    </section>
    </>
  );
};

export default ForgotPassword;
