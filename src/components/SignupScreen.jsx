import React, { useState, useEffect } from 'react';
import Navbar from './nav.jsx';
import {Link} from "react-router-dom"

export default function Signup(props) {
  
    return (
        <div> 
            <Navbar/>
            <div className='bodymain'>
                <div className='Interface_login'>
                    <h3 className='white '>Signup Page</h3> 
                    <input type='text' placeholder='E-mail'/>  
                    <input type='text' placeholder='Username'/>  
                    <input type='password' placeholder='Password (Minimum 1 upper case & 1 lower case)'/>
                    <input type='password' placeholder='Re-enter Password'/>
                    <button>Signup</button>
                </div>
            </div>
        </div>
    );
}
  