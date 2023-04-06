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
                        <div class="container">
                            <img className='signup' src='assets/IconSignup.png'/>
                            <div>  
                                Signup
                            </div>  
                        </div>
                    </Link>
                </button>
                <button className='invis'>   
                    <Link to="/login">
                        <div class="container">
                            <img className='login' src='assets/IconLogin.png'/>
                            <div>   
                                Login
                            </div> 
                        </div>
                    </Link>
                </button>
            </div>
        </nav>
    );
}