import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Lock, KeyRound, AlertCircle, 
  CheckCircle, Github, Facebook, Chrome 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', content: '' });

  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setMessage({ type: 'error', content: 'All fields are required' });
      return false;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', content: 'Passwords do not match' });
      return false;
    }

    if (password.length < 8) {
      setMessage({ type: 'error', content: 'Password must be at least 8 characters long' });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', content: 'Please enter a valid email address' });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', content: '' });

    if (validateForm()) {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

      if (existingUsers.some(user => user.email === formData.email)) {
        setMessage({ type: 'error', content: 'User with this email already exists' });
        return;
      }

      const newUser = {
        ...formData,
        password: btoa(formData.password),
        createdAt: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      setMessage({ type: 'success', content: 'Account created successfully!' });
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Signing up with ${provider}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="auth-form-wrapper">
        <motion.h2 
          className="form-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Join Our Sports Community
        </motion.h2>

        <form onSubmit={handleSubmit}>
          {['username', 'email', 'password', 'confirmPassword'].map((field, idx) => (
            <div className="input-group" key={idx}>
              <label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
              <input
                type={field.toLowerCase().includes('password') ? 'password' : field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="input-field"
                placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              />
              {{
                username: <User size={18} />, 
                email: <Mail size={18} />, 
                password: <Lock size={18} />, 
                confirmPassword: <KeyRound size={18} />
              }[field]}
            </div>
          ))}

          {message.content && (
            <motion.div 
              className={message.type === 'error' ? 'error-message' : 'success-message'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {message.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />} 
              {message.content}
            </motion.div>
          )}

          <motion.button 
            type="submit" 
            className="submit-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create Account
          </motion.button>
        </form>

        <div className="social-login">
          <span>Or sign up with</span>
          <div className="social-buttons">
            {['Google', 'Facebook', 'Github'].map((provider, idx) => (
              <motion.button 
                key={idx}
                className={`social-button ${provider.toLowerCase()}`}
                onClick={() => handleSocialSignup(provider)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {{
                  Google: <Chrome size={18} />, 
                  Facebook: <Facebook size={18} />, 
                  Github: <Github size={18} />
                }[provider]} 
                {provider}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;