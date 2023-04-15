import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authentication/authContextProvider';
import { isValidEmail, isValidPassword, isValidUserName } from '../../utils/validations';
import './index.css';

const Login = () => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('Shakti@verma.com');
  const [password, setPassword] = useState('secretart');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login validation here
    if(!validate()) return
    login({
      email,
      username: email.split('@')[0],
      password
    })
  };

  const validate = () => {
    let isValid = true;
    console.log('validate...')
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    if(!isValidEmail(email) && !isValidUserName(email)) {
      setEmailError('Please enter a valid email address or username.');
      isValid = false
    }

    if(!isValidPassword) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false
    }
    if(isValid) {
      setEmailError('')
      setPasswordError('')
    }
    return isValid;
  };

  return (
    <div className="background vw-100 vh-100 k-flex k-jcc k-aic">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>{emailError && <span className="error-message">{emailError}</span>}</div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>{passwordError && <span className="error-message">{passwordError}</span>}</div>
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
