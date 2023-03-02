import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Form.css";
import "../styles/LoginScreen.css";
import Navblank from "./Navblank";

export default function LoginScreen() {
  
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  function validateForm() {

    return username.length > 0 && password.length > 0;

  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submitted");
  }
  return (
    <div>
      <Navblank/>
        <div className='bodymain'>
          <div className='Interface_login'>
            <form className="form-group" onSubmit={handleSubmit}>
              <div style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <h2 style={{color:"white", display:"flex",justifyContent:"center"}}>Login Page</h2> 
                <input type={"text"} placeholder='Username' className="login-input" onChange={e => setUsername(e.target.value)} required />
                <input type={"password"} placeholder='Password' className="login-input" onChange={e => setPassword(e.target.value)} required />
                <Link to = "/dashboard" style={{width:'60%'}}>Forget Password?</Link>
                <input type="submit" className='login-button' value="Login"/>
              </div>
            </form>
              
               
          </div>
      </div>
    </div>
  )
}
