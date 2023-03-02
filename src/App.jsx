import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import EntranceScreen from './components/EntranceScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Signup from './components/SignupScreen';
import Main from './components/Main';
//import DynamicMap from './components/Map';
import "./styles/DefaultStyles.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserContext } from './components/Usercontext';
import Settings from './components/Settings';

export default function App(){
    const [user, setUser] = useState({name:"John",id:"404"});
    return(
        <BrowserRouter>
            <UserContext.Provider value={{user, setUser}}>
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
    )
}