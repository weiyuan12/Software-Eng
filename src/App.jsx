import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import EntranceScreen from './components/EntranceScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Signup from './components/SignupScreen';
import Main from './components/Main';
import initMap from './components/Map';
import Navbar from './components/NavGuest';
import NavMain from './components/NavMain';
import "./styles/DefaultStyles.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserContext ,SelectionContext , Marker1Context, Marker2Context, CarparkMarkerContext} from './components/Usercontext';
import Settings from './components/Settings';


export default function App(){
    const [user, setUser] = useState({name:"John",phonenumber:"87654321",email:"Johnjohn@gmail.com",dateofbirth:"00 Jan 0000", homeaddress:"FarAwayPlox", member:"paper",id:"404"});
    const [selection, setSelection] = useState("");
    const [marker1, setMarker1] = useState("");
    const [marker2, setMarker2] = useState("");
    const [carparkMarker, setCarparkMarker] = useState([])
    
    return(
        <div>
            <BrowserRouter>
                <UserContext.Provider value={{user, setUser}}>
                    <SelectionContext.Provider value={{selection, setSelection}}>
                        <Marker1Context.Provider value = {{marker1, setMarker1}}>
                        <Marker2Context.Provider value = {{marker2, setMarker2}}>
                        <CarparkMarkerContext.Provider value = {{carparkMarker, setCarparkMarker}}>
                    {user.id ? <NavMain/> : <Navbar/>}
                    <Routes>
                        <Route path="/" element={<EntranceScreen/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/login" element={<LoginScreen/>}/>
                        <Route path="/signup" element={<Signup/>}/>                       
                        <Route path="/main" element={<Main/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                    </CarparkMarkerContext.Provider>
                    </Marker2Context.Provider>
                    </Marker1Context.Provider>
                </SelectionContext.Provider>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
        
    )
}