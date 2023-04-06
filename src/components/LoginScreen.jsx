import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./Usercontext";
import "../styles/Form.css";
import "../styles/LoginScreen.css";
import Navblank from "./Navblank";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fdata, setFdata] = useState({});
  const {user, setUser} = useContext(UserContext);
  // useEffect(() => {
  //   if(fdata.username === username && fdata.password===password){
  //     setUser({
  //       name: fdata.name,
  //       phonenumber: "87654321",
  //       email: "Johnjohn@gmail.com",
  //       dateofbirth: fdata.dob, 
  //       homeaddress: fdata.address, 
  //       member: fdata.member,
  //       id:fdata.id,
  //     })
  //   }
  // },[fdata]);

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8000/api-token-auth/",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then((response) => response.json())
    .then((data) => {console.log(data); data["token"] && setUser(data)})
    .then(console.log("user is "+user));
    console.log("submitted");
  }
  
  return (
    <div>
        {user.token && <Navigate to="/"/>}
        <div className='bodymain'>
          <div className='Interface_login'>
            <form className="form-group" onSubmit={handleSubmit}>
              <div style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <h2 style={{color:"white", display:"flex",justifyContent:"center"}}>Login Page</h2> 
                <input type="text" placeholder='Username' className="login-input" onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder='Password' className="login-input" onChange={e => setPassword(e.target.value)} />
                <Link to = "/dashboard" style={{width:'60%'}}>Forget Password?</Link>
                <input type="submit" className='login-button' value="Login"/>
              </div>
            </form>
              
               
          </div>
      </div>
    </div>
  )
}
