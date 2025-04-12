import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Lock, AlertCircle, 
  CheckCircle, Github, Facebook, Chrome 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import "../components/Signup.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === formData.email);

    if (!user) {
      setError('No account found with this email');
      return;
    }

    if (user.password !== btoa(formData.password)) {
      setError('Invalid password');
      return;
    }

    setSuccess(true);
    
    // Set user session
    const sessionData = {
      username: user.username,
      email: user.email,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(sessionData));
    if (rememberMe) {
      localStorage.setItem('rememberedUser', formData.email);
    } else {
      localStorage.removeItem('rememberedUser');
    }

    // Redirect after successful login
    setTimeout(() => {
      navigate('/home'); // You can change this to your desired route
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
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
          Welcome Back
        </motion.h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your email"
            />
            <Mail className="input-icon" size={18} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your password"
            />
            <Lock className="input-icon" size={18} />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Remember me </span>
            </label>
            <br />
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle size={18} />
              Login successful! Redirecting...
            </motion.div>
          )}

          <motion.button 
            type="submit" 
            className="submit-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Log In
          </motion.button>
        </form>

        <div className="social-login">
          <span>Or login with</span>
          <div className="social-buttons">
            <motion.button 
              className="social-button google"
              onClick={() => handleSocialLogin('Google')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Chrome size={18} />
              Google
            </motion.button>
            <motion.button 
              className="social-button facebook"
              onClick={() => handleSocialLogin('Facebook')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Facebook size={18} />
              Facebook
            </motion.button>
            <motion.button 
              className="social-button github"
              onClick={() => handleSocialLogin('Github')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} />
              Github
            </motion.button>
          </div>
        </div>

        <div className="auth-switch">
          Don't have an account?
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;