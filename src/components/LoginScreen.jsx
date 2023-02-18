import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Form.css";

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
      <div className="page">
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h2 className="title-text">Login</h2>
            <label>Username</label>
            <input type={"text"} className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
            <label>Password</label>
            <input type={"password"} className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
          
            <button type="submit" className="btn btn-primary" disabled={!validateForm()}>
            Submit
            </button>
          </div>
          <Link to = "/dashboard">Login</Link>
        </form>
      </div>
    
  )
}
