import React from 'react'
import ReactDOM from 'react-dom/client'
import EntranceScreen from './components/EntranceScreen'
import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard'
import Signup from './components/SignupScreen'
import DynamicMap from './components/Map'
import "./styles/DefaultStyles.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EntranceScreen/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/map" element={<DynamicMap/>}/>
            </Routes>
        </BrowserRouter>
    )
}