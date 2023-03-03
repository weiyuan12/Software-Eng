import React, { useState, useEffect, useContext } from 'react';
import "../styles/Nav.css"
import {Link} from "react-router-dom"
import { SelectionContext, UserContext } from './Usercontext';
import RideCreation from './RideCreation';
export default function NavMain(props) {
    const {user} = useContext(UserContext);
    const {selection , setSelection} = useContext(SelectionContext);

    const selectionlist = ["Create Ride","Search Ride","My Rides","Carparks"];

    const renderedlist = selectionlist.map((a)=>{
        if(a===selection){
            return (
                <li key={a} className='nav-tab-selected' onClick={()=>{setSelection(a);}}>
                    <Link to="/main">{a}</Link>
                </li>
            )
        }
        return (
            <li key={a} className='nav-tab' onClick={()=>{setSelection(a)}}>
                <Link to="/main">{a}</Link>
            </li>
        );
    })

    console.log(props);
    return (
        
        <nav className='header'> 
            <div style={{height:'100%',display:"flex"}}>
                <div className='Logobar'>
                    <Link to="/">
                        <img className='logo' src='assets/Logomain.png'/>
                    </Link>
                </div>
                <ul style={{height:'100%',margin:'0px',display:"flex", alignItems:"center", listStyle:"none"}}>
                    {props.name!=="main" && renderedlist}
                </ul>
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
  