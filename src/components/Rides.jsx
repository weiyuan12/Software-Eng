import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Form.css";
import "../styles/LoginScreen.css";
import Navbar from "./Nav";

export default function LoginScreen() {

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  function validateForm() {

    return username.length > 0 && password.length > 0;

  }

  function handleSubmit(event) {

    event.preventDefault();

  }
  return (
    <div>
      <Navbar/>
      <div class='bodymain'>
          <div class='Interface_login'>
              <h3 class='white '>Login Page</h3> 
              <input type='text' placeholder='Username'/>  
              <input type='password' placeholder='Password'/>
              <button>Forgot Password?</button>
              <button>Login</button>
               
          </div>
      </div>
    </div>
  )
}
