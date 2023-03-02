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
                <li key={a} className='nav-tab-selected' onClick={()=>{setSelection(a); console.log(a)}}>
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
    const displaySelection = selection => {
        switch(selection){
            case "Create Ride":
                return <RideCreation/>;
            case "Search Ride":
                return <h1>Search Ride</h1>;
            case "My Rides":
                return <h1>My Rides</h1>;
            case "Carparks":
                return <h1>Carparks</h1>;
            default:
                return <h1>Default</h1>;
        }
    }
    console.log(props);
    return (
        <>
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
        <div className='bodymain'>
            {displaySelection(selection)}
        </div>
        </>
    );
}
  