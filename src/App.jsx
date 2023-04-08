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
import { UserContext ,SelectionContext } from './components/Usercontext';
import Settings from './components/Settings';


export default function App(){
    const [user, setUser] = useState({token: 'ac0fedf0d4203925ec54acad6f7efd33f5ad4d22'});
    const [selection, setSelection] = useState("");
    
    return(
        <div>
            <BrowserRouter>
                <UserContext.Provider value={{user, setUser}}>
                <SelectionContext.Provider value={{selection, setSelection}}>
                    {user.token ? <NavMain/> : <Navbar/>}
                    <Routes>
                        <Route path="/" element={<EntranceScreen/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/login" element={<LoginScreen/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/main" element={<Main/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                </SelectionContext.Provider>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
        
    )
}