import React, { useState, useEffect } from 'react';
import "../styles/Nav.css"
import {Link} from "react-router-dom"

export default function Navbar(props) {
  
    return (
        <nav className='header'> 
            <div className='Logobar'>
                <img src='assets/barmenu.png'/>
                <img className='logo' src='assets/Logomain.png'/>
            </div>
            <div className='Accessbar'>
            <button class='invis'>
                    <Link to="/signup">
                        <img class='signup' src='assets/IconSignup.png'/>
                        Signup
                    </Link>
                </button>
                <button class='invis'>   
                    <Link to="/login" style={{textdecoration: 'none'}}>
                        <img class='login' src='assets/IconLogin.png'/>
                        Login
                    </Link>
                </button>
                <button class='invis'>
                    <Link to="/settings">
                        <img class='setting' src='assets/IconSetting.png'/>
                    </Link>
                </button>
            </div>
            
        </nav>
    );
}
  