import React, {useContext, useState} from "react";
import Navbar from "./NavGuest.jsx";
import NavMain from "./NavMain";
//import DynamicMap from "./Map";
import { UserContext, SelectionContext } from "./Usercontext";
import { Navigate } from "react-router-dom";

function Main(){
    const {user} = useContext(UserContext);
    const [selection, setSelection] = useState("");

    return(
        <div>
            {!user.id && <Navigate to="/"/>}
            <div>
                
            </div>
            <SelectionContext.Provider value={{selection, setSelection}}>
                <NavMain/>
            </SelectionContext.Provider>
             {/*try some safer way*/}
        </div>
    )
}

export default Main;