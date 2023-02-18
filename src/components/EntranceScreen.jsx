import React from "react"
import logo from "../assets/logo.png"
import {CiLogin, CiEdit, CiSettings} from "react-icons/ci"
import {Link} from "react-router-dom"
import "../styles/EntranceScreen.css"
export default function EntranceScreen(){
    return(
        <div>
            <nav className="entrance-nav">            
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
                
                      
            </nav>
            <main>
                <div className="body-text">
                    <h1 className="text-1">Wander around safely and efficiently</h1>
                    <h2 className="text-2">Navigate with ease using Wanderful as we aim to support the lifestyle that you want!</h2>
                </div>
                
            </main>
        </div>
    )
}