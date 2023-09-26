import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';


function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [studentLogin, setStudentLogin] = useState(false);


useEffect(() => {
  let Emma = JSON.parse(localStorage.getItem('Arison'));

  if (Emma && Emma.login && Emma.email) {
    setStudentLogin(true);
  }
}, []);


  function registerUser(){
    if (firstName && lastName && email && password) {
      axios.post('http://localhost:8080/register', {
        firstName : firstName,
        lastName : lastName,  
        email: email,
        password: password,
      })
      .then(response => {
        setSuccess(response.data.message)
        setEmail("") 
        setFirstName("")  
        setLastName("")  
        setPassword("")   
        window.location="/"
      })
      .catch(error => {
        console.log(error.response.data.error)
        setError(error.response.data.error)

      });
    }else {
      console.log("enter your credentials")
      // setError("enter your credentials")

    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser()

    // Handle form submission here, e.g., send data to a server
  };


  
  return (

    <div>
      {!studentLogin ?(
          <div>
            <h2>Register Form</h2>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button type="submit">Submit</button>
            </form>

            <Link to="/">Login Here</Link>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}





          </div>
      ):(
          <div>
            <Login/>
          </div>
      )}

          
    </div>
   

  );
}

export default Register;