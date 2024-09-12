import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

  const [formData , setFormData] = useState({ name:"", email:"", phoneNumber:"", password:"" })
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate()

  const handleInputChange = (e)=>{
    // const { name , value } = e.target
    // setForm({ ...form, [name]: value })
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post('http://localhost:4000/api/v1/signup',formData)
        console.log(response);       
        localStorage.setItem('otp',response.data.otp)
        if(response.data){

          console.log(response.data)
          setError('')
          setSuccess(response.data.message)
          setTimeout(()=>{
            navigate('/otp')
          },2000)
        }
        
      }
      catch (error) {
        // setError(response.data.message)
        setSuccess('')
        setError("Error during registration")
      }
  };

  return (
    <section className="signup">
      <motion.form
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        onSubmit={handleSubmit}
        className="signup-form"
      >
        <h2>Sign Up</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
        <div className="extra-options">
          <span className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </motion.form>
    </section>
  );
};

export default Signup;

