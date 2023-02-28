import React, { useState, useEffect, useContext } from 'react';
import "../styles/Nav.css"
import {Link} from "react-router-dom"
import { SelectionContext, UserContext } from './Usercontext';

export default function NavUser(props) {
    const {user} = useContext(UserContext);
    return (
        <nav className='header'> 
            <div style={{height:'100%',display:"flex"}}>
                <div className='Logobar'>
                    <Link to="/">
                        <img className='logo' src='assets/Logomain.png'/>
                    </Link>
                </div>
            </div>
            <div className='Accessbar'>
                <button className='invis'>   
                    <Link to="/">
                        <img className='profile' src='assets/IconProfile.png'/>
                        Welcome {user.name}
                    </Link>
                </button>
                <button className='invis'>
                    <Link to="/settings">
                        <img className='setting' src='assets/IconSetting.png'/>
                    </Link>
                </button>
            </div>
            
        </nav>
    );
}
  