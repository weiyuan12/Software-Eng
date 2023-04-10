import React, { useState, useEffect, useContext } from 'react';
import "../styles/Nav.css"
import {Link} from "react-router-dom"
import { SelectionContext, UserContext } from './Usercontext';
import Settings from './Settings';

export default function NavMain(props) {
    const {user} = useContext(UserContext);
    const {selection , setSelection} = useContext(SelectionContext);
    const [UserName, setUserName] = useState("");
    console.log(user)
    useEffect(()=>{
        fetch('http://127.0.0.1:8000/core/user-info/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+ user.token
            }
        })
        .then(response => response.json())
        .then(data => {setUserName(data.data.username);})
        .catch(error => console.error(error));
    },[user])

    const selectionlist = ["Create Ride","Search Ride","My Rides","Carparks", "Taxi"];

    const renderedlist = selectionlist.map((a)=>{
        if(a===selection){
            return (
                <li key={a} className='nav-tab-selected' onClick={()=>{setSelection("")}}>
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
                <button className='invis' onClick={()=>setSelection("Settings")}>
                    <Link to="/settings">
                        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                         <img className='profile' src='assets/IconProfile.png'/>
                            <p style={{margin:"0px"}}>Welcome {UserName}</p>
                        </div>
                    </Link>
                </button>
            </div>
            
        </nav>

        
    );
}
  