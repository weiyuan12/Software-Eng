import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import EntranceScreen from './components/EntranceScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Signup from './components/SignupScreen';
import Main from './components/Main';
import DynamicMap from './components/Map';
import Navbar from './components/NavGuest';
import NavMain from './components/NavMain';
import "./styles/DefaultStyles.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserContext ,SelectionContext } from './components/Usercontext';
import Settings from './components/Settings';

export default function App(){
    const [user, setUser] = useState({name:"John",id:"404"});
    const [selection, setSelection] = useState("");
    return(
        <div>
            <BrowserRouter>
                <UserContext.Provider value={{user, setUser}}>
                <SelectionContext.Provider value={{selection, setSelection}}>
                    {user.id ? <NavMain/> : <Navbar/>}
                </SelectionContext.Provider>
                    <Routes>
                        <Route path="/" element={<EntranceScreen/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/login" element={<LoginScreen/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/main" element={<Main/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
        
    )
}