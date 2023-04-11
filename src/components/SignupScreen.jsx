import React, { useState, useEffect } from 'react';
import Navbar from './NavGuest.jsx';
import Navblank from './Navblank.jsx';
import '../styles/SignupScreen.css'
import { Link , useNavigate} from "react-router-dom"

export default function Signup(props) {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [validcheck, setValidcheck] = useState({ 'email': false, 'password': false, 'passmatch': false })
    console.log(email.match(/.com$/) ? true : false)
    console.log(password);
    console.log(validcheck)
    useEffect(() => {
        let emailcheck = false, passcheck = false, passmatchcheck = false;
        if (password.match(/[A-Z]/) && password.match(/[a-z]/) && password.length>5) {
            passcheck = true;
        }
        if (email.match(/^[\S]+@+[\S]+.com$/)) {
            emailcheck = true;
        }
        if (repassword === password) {
            passmatchcheck = true;
        }
        setValidcheck({ 'email': emailcheck, 'password': passcheck, 'passmatch': passmatchcheck });
    }, [email, password, repassword])

    const handleSignup = () => {
        
        if(!validcheck.email){
            alert("Invalid Email");
            return;
        } else if(!validcheck.password){
            alert("Invalid Password");
            return;
        } else if(!validcheck.passmatch){
            alert("Passwords do not match");
            return;
        }

        if(!validcheck.email || !validcheck.password || !validcheck.passmatch){
            console.log("not valid");
            return;
        }
        fetch("http://127.0.0.1:8000/core/register/",{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username": username,
                "password": password,
                "email": email,
                "first_name": firstname,
                "last_name": lastname
            })
        })
        .then(response => {response.json(); navigate('/')})
        .catch(error => console.log(error));
    }

    return (
        <div>
            <div className='bodymain'>
                <div className='Interface_signup'>
                    <h3 style={{ color: 'white' }}>Signup Page</h3>
                    <input className='signup-input' type='text' placeholder='First Name' onChange={(input) => setFirstname(input.target.value)} />
                    <input className='signup-input' type='text' placeholder='Last Name' onChange={(input) => setLastname(input.target.value)} />
                    <input className='signup-input' type='text' placeholder='E-mail' onChange={(input) => setEmail(input.target.value)} />
                    <input className='signup-input' type='text' placeholder='Username' onChange={(input) => setUsername(input.target.value)} />
                    <input className='signup-input' type='password' placeholder='Password (Minimum 1 upper case & 1 lower case)' onChange={(input) => setPassword(input.target.value)} />
                    <input className='signup-input' type='password' placeholder='Re-enter Password' onChange={(input) => setRepassword(input.target.value)} />
                    <button className='invis' onClick={handleSignup}>
                        <Link className='signup-button'>Signup</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
