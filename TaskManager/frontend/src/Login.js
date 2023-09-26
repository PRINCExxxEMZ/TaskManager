// Form.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loginStudent, setLoginStudent] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  useEffect(() => {
    let Emma = JSON.parse(localStorage.getItem('Arison'));

    if (Emma && Emma.login && Emma.email) {
      setLoginStudent(true);
      setFirstName(Emma.firstName)
      setLastName(Emma.lastName)
      
    }
  }, []);

  function loginSection() {

    if (email && password) {
        axios.post('http://localhost:8080/login', {
          email: email,
          password: password,
        })
        .then(response => {
          setSuccess(response.data.message)
          
          localStorage.setItem('Arison', JSON.stringify(
            {
              login: true,
              email : email,
              firstName : response.data.user.firstName,
              lastName : response.data.user.lastName
            }
          ))
      
          setLoginStudent(true);
          setFirstName(response.data.user.firstName)
          setLastName(response.data.user.lastName)

                 
        })
        .catch(error => {
          setError(error.response.data.error)
          console.log(error)

        });
      }else {
        console.log("enter your credentials")
        setError("enter your credentials")

      }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    loginSection()
  };

  return (
    <div>
      {!loginStudent ?(
         <div>
         <h2>Login Form</h2>
         <form onSubmit={handleSubmit}>
       
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
         <Link to="/register">Register Here</Link>
         <br/>
         {error && <p style={{ color: 'red' }}>{error}</p>}
         {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      ):(
        <div>
        <h3> Welcome {firstName} {lastName}!</h3>

        <button><Link to="/create_task">Create New Task</Link> </button>

        <table>
          <thead>
            <tr>
              <th>Name of Task</th>
              <th>Date of Task</th>
              <th>Time of Task</th>
              <th>Description of Task</th>              
  

            </tr>
          </thead>
          <tbody>
              <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
          </tbody>
        </table>
      </div>
      )} 
    
    </div>
  );
}

export default Login;