import React, { useState, useEffect } from 'react';
import "../styles/Nav.css"
import {Link} from "react-router-dom"

export default function Navbar(props) {
  
    return (
        <nav className='header'> 
            <div className='Logobar'>
                <Link to="/">
                    <img className='logo' src='assets/Logomain.png'/>
                </Link>
            </div>
            <div className='Accessbar'>
                <button className='invis'>
                    <Link to="/signup">
                        <img className='signup' src='assets/IconSignup.png'/>
                        Signup
                    </Link>
                </button>
                <button className='invis'>   
                    <Link to="/login">
                        <img className='login' src='assets/IconLogin.png'/>
                        Login
                    </Link>
                </button>
                <button className='invis'>
                    <Link to="/settings"> {/* need edit */}
                        <img className='setting' src='assets/IconSearch.png'/>
                    </Link>
                </button>
            </div>
            
        </nav>
    );
}
  