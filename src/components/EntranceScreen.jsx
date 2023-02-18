import React from "react"
import logo from "../assets/logo.png"
import {CiLogin, CiEdit, CiSettings} from "react-icons/ci"
import {Link} from "react-router-dom"
import "../styles/EntranceScreen.css"

import Navbar from "../components/Nav.jsx"

export default function EntranceScreen(){
    const handleClick = () =>{
        Navigate("/login");
    }
    return(
        <div>
            <Navbar/>
            {/* <nav className="entrance-nav">            
                <img src = {logo} className= "logo"/>
                <div className="options">
                    <button className="signup">
                        <CiEdit style={{fontSize : "30px", marginRight:"10px"}}/>
                        <h3><Link to ="/login">Signup</Link></h3>  
                    </button>
                    <button className="login">
                        <CiLogin style={{fontSize : "30px", marginRight:"10px"}}/>
                        <h3><Link to ="/login">Login</Link></h3>    
                    </button>
                    <button>
                        <CiSettings style={{fontSize : "30px"}}/>
                    </button>
                </div>
                
                      
            </nav> */}
            <div className='bodycover'>
                <div className='textbox'>
                    <h1 className='textmain'>Wander around safely and efficiently</h1>
                    <p className='textsub'>
                        Navigate with ease using Wanderful as we aim to support the lifestyle that you want!
                    </p>
                    <div className='bookride'>
                        <button className='bookridebutton'>
                            <Link to ="/login">
                                Book ride now
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}