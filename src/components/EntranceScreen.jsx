import React from "react"
import logo from "../assets/logo.png"
import {CiLogin, CiEdit, CiSettings} from "react-icons/ci"
import {Link} from "react-router-dom"
import "../styles/EntranceScreen.css"

import Navbar from "../components/Nav.jsx"

export default function EntranceScreen(){
    return(
        <div>
            <Navbar/>
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