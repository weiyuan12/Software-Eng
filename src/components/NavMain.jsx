import React, { useState, useEffect, useContext } from 'react';
import "../styles/Nav.css"
import {Link} from "react-router-dom"
import { SelectionContext, UserContext } from './Usercontext';
import Settings from './Settings';

export default function NavMain(props) {
    const {user} = useContext(UserContext);
    const {selection , setSelection} = useContext(SelectionContext);

    const selectionlist = ["Create Ride","Search Ride","My Rides","Carparks"];

    const renderedlist = selectionlist.map((a)=>{
        if(a===selection){
            return (
                <li key={a} className='nav-tab-selected' onClick={()=>{setSelection(a)}}>
                    <Link style={{height:"100%", width:"100%",display:"flex",alignItems:"center"}} to="/main">{a}</Link>
                </li>
            )
        }
        return (
            <li key={a} className='nav-tab' onClick={()=>{setSelection(a)}}>
                <Link style={{height:"100%", width:"100%",display:"flex",alignItems:"center"}} to="/main">{a}</Link>
            </li>
        );
    })

    console.log(props);
    return (
        
        <nav className='header'> 
            <div style={{height:'100%',display:"flex"}}>
                <div className='Logobar'>
                    <Link onClick={()=>setSelection("home")} to="/">
                        <img className='logo' src='assets/Logomain.png'/>
                    </Link>
                </div>
                <ul style={{height:'100%',margin:'0px',display:"flex", alignItems:"center", listStyle:"none"}}>
                    {props.name!=="main" && renderedlist}
                </ul>
            </div>
            <div className='Accessbar'>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                    <img className='profile' src='assets/IconProfile.png'/>
                    <p style={{margin:"0px"}}>Welcome {user.name}</p>
                </div>
                <div className={selection==="Settings" ? 'nav-tab-selected' : 'nav-tab'} style={{width:"40px",marginLeft:"10px",marginRight:"10px"}}>
                    <button className='invis' onClick={()=>setSelection("Settings")}>
                        <Link to="/settings">
                            <img className='setting' src='assets/IconSetting.png'/>
                        </Link>
                    </button>
                </div>
            </div>
            
        </nav>

        
    );
}
  