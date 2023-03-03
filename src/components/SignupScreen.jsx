import React, { useState, useEffect } from 'react';
import Navbar from './NavGuest.jsx';
import Navblank from './Navblank.jsx';
import '../styles/SignupScreen.css'
import {Link} from "react-router-dom"

export default function Signup(props) {
  
    return (
        <div> 
            <div className='bodymain'>
                <div className='Interface_signup'>
                    <h3 style={{color:'white'}}>Signup Page</h3> 
                    <input className='signup-input' type='text' placeholder='E-mail'/>  
                    <input className='signup-input' type='text' placeholder='Username'/>  
                    <input className='signup-input' type='password' placeholder='Password (Minimum 1 upper case & 1 lower case)'/>
                    <input className='signup-input' type='password' placeholder='Re-enter Password'/>
                    <button className='invis'>
                        <Link className='signup-button'>Signup</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
  