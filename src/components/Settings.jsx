import React, { useContext, useState } from "react"
import "../styles/EntranceScreen.css"
import "../styles/Settings.css"
import { UserContext } from "./Usercontext"
import { Navigate } from "react-router-dom"


export default function Settings() {
    const { user, setUser } = useContext(UserContext);
    const [settingselection, setSettingselection] = useState("Settings");
    return (
        <div className="settings-body">
            {!user.token && <Navigate to='/'/>}
            <div style={{ display: "flex", flexDirection: "row", marginTop: "50px" }}>
                <div className="settings-leftnav">
                    <ul style={{ listStyle: "none", margin: "0px" }}>
                        <li className={settingselection === "Settings" ? "settings-leftnav-listitems-selected" : "settings-leftnav-listitems"}
                            onClick={() => { setSettingselection("Settings") }}>
                            <h3 style={{ margin: "0px" }}>Settings</h3>
                        </li>
                        <li className={settingselection === "Wallet" ? "settings-leftnav-listitems-selected" : "settings-leftnav-listitems"}
                            onClick={() => { setSettingselection("Wallet") }}>
                            <h3 style={{ margin: "0px" }}>Wallet</h3>
                        </li>
                    </ul>
                </div>
                <div className="settings-rightbody" style={{ marginLeft: "5px" }}>
                    {settingselection === "Settings" && <Configurations />}
                </div>
            </div>
        </div>
    )
}

function Configurations() {
    const { user, setUser } = useContext(UserContext);
    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row", }}>
                <img src="assets/IconSetting.png"></img>
                <h4 style={{ margin: "0px", marginLeft: "10px", display: "flex", alignItems: "center" }}>Settings</h4>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}>
                <img src="assets/IconSettingsProfile.png" style={{ width: "50px", height: "50px" }}></img>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", marginLeft: "10px" }}>
                    <h3 style={{ margin: "0px" }}>
                        {user.name}
                    </h3>
                    <p style={{ margin: "0px" }}>
                        {user.phonenumber}
                    </p>
                </div>
            </div>
            <div className="settings-profileinfo">
                <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
                    <h4 style={{ margin: "0px" }}>Email:</h4>
                    <p style={{ margin: "0px", marginLeft: "10px" }}>{user.email}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
                    <h4 style={{ margin: "0px" }}>Date of Birth:</h4>
                    <p style={{ margin: "0px", marginLeft: "10px" }}>{user.dateofbirth}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
                    <h4 style={{ margin: "0px" }}>Home Address:</h4>
                    <p style={{ margin: "0px", marginLeft: "10px" }}>{user.homeaddress}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
                    <h4 style={{ margin: "0px" }}>Member:</h4>
                    <p style={{ margin: "0px", marginLeft: "10px" }}>{user.member}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "row-reverse", marginBottom: "10px", marginRight: "10px" }}>
                    <button>Edit Profile</button>
                </div>
            </div>
            <button onClick={() => { setUser({token: null}); set }}>Logout</button>
        </div>
    )
}