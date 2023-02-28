import React, { useState, useEffect } from 'react';
import "../styles/Nav.css"
import {Link} from "react-router-dom"

export default function Navblank(props) {
  
    return (
        <nav className='header'> 
            <div className='Logobar'>
                <Link to="/">
                    <img className='logo' src='assets/Logomain.png'/>
                </Link>
            </div>
            <div className='Accessbar'></div>
        </nav>
    );
}
  