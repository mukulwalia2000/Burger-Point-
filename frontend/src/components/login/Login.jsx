// import React from "react";
// import { motion } from "framer-motion";
// import { FcGoogle } from "react-icons/fc";
// import { server } from "../../redux/store";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";


const Login = () => {

  const [formData , setFormData] = useState({ email:"", password:"" })
  const [error, setError] = useState(null);
  const [success,setSuccess] = useState(null)
  const navigate = useNavigate()
  // const  [isAuthenticated, setIsAuthenticated] = useState(false)



  const handleInputChange = (e)=>{
    // const { name , value } = e.target
    // setForm({ ...form, [name]: value })
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/login',formData)
      // console.log(response.status);
      
      console.log(response.data);
      
      
      if(response.data){
        setSuccess(response.data.message)
        setTimeout(()=>{
          navigate('/')
        },2000)
      }
      
    }
    catch (error) {
      // setError(response.data.message)
      setError("login failed")
    }
  };

  return (
    <section className="login">
      <motion.form
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        onSubmit={handleSubmit}
        className="login-form"
      >
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
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

        <button type="submit">Login</button>

        <motion.button
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          className="google-login"
        >
          Login with Google
          <FcGoogle />
        </motion.button>
        
        <div className="extra-options">
          {/* <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link> */}
          <span className="signup-link">
            Don't have an account? <Link to="/signup">Signup</Link>
          </span>
        </div>


      </motion.form>
    </section>
  );

}
export default Login;
