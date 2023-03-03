import React, {useContext} from "react"
import {Link} from "react-router-dom"
import "../styles/EntranceScreen.css"

import NavGuest from "./NavGuest"
import NavUser from "./NavUser"
import { UserContext } from "./Usercontext"

export default function Settings(){
    const {user, setUser} = useContext(UserContext);
    return(
        <div>
            <button onClick={()=>{setUser({name:null,id:null})}}>Logout</button>
        </div>
    )
}