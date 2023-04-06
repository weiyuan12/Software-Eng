import React, { useState, useContext, useEffect } from "react";
import { UserContext, SelectionContext } from "./Usercontext";
import "../styles/MyRides.css"

/**
 * 
 * @returns 
 */
export default function MyRides() {
  const { user, setUser } = useContext(UserContext);
  const [myrideselection, setMyRideSelection] = useState("My Rides");
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/polls/"+user.auth)
    .then((response) => response.json())
    .then((data) => {console.log(data); setFdata(data)});
    console.log("submitted");
  },[])

  const Rides = () => {
    return (
      <>
        <div className='MyRide__rightbody__header'>
          <h1>My Rides</h1>
        </div>
        <div className="MyRide__rightbody__upcoming">
          <h2>Upcoming Trips</h2>
        </div>
        <div className="MyRide__rightbody__pasttrip">
          <h2>Past Trips</h2>

        </div>
      </>
    )
  }

  const Help = () => {
    return (
      <>
        <h1>Help</h1>
        <p>IDK WHAT TO PUT HERE</p>
      </>
    )
  }

  const Faq = () => {
    return (
      <>
        <h1>FAQ Title</h1>
        <p>
          Lorem ipsum dolor sit amet,
        </p>
      </>
    )

  }


  return (
    <div className="MyRide__body">
      <div style={{ width: '100%', display: "flex", flexDirection: "row", marginTop: "50px" }}>
        <div className="MyRide__leftnav">
          <ul style={{ listStyle: "none", margin: "0px" }}>
            <li className={myrideselection === "My Rides" ? "MyRide__leftnav__listitems--selected" : "MyRide__leftnav__listitems"}
              onClick={() => { setMyRideSelection("My Rides") }}>
              <h3 style={{ margin: "0px" }}>MyRides</h3>
            </li>
            <li className={myrideselection === "Help" ? "MyRide__leftnav__listitems--selected" : "MyRide__leftnav__listitems"}
              onClick={() => { setMyRideSelection("Help") }}>
              <h3 style={{ margin: "0px" }}>Help</h3>
            </li>
            <li className={myrideselection === "FAQ" ? "MyRide__leftnav__listitems--selected" : "MyRide__leftnav__listitems"}
              onClick={() => { setMyRideSelection("FAQ") }}>
              <h3 style={{ margin: "0px" }}>FAQ</h3>
            </li>
          </ul>
        </div>
        <div className="MyRide__rightbody" style={{ marginLeft: "5px" }}>
          {myrideselection === 'My Rides' && <Rides />}
          {myrideselection === 'Help' && <Help />}
          {myrideselection === 'FAQ' && <Faq />}
        </div>
      </div>
    </div>
  )
}
