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
  const [rideData, setRideData] = useState([{ride:{creator:{}}}]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/core/rides/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + user.token
      }
    })
      .then(response => response.json())
      .then(data => { setRideData(data) })
      .catch(error => console.log(error));
    console.log("submitted");
  }, [])

  const Rides = () => {
    const upcoming = rideData.filter((ride) => {
      return ride['ride']['date_time'] >= (new Date().toISOString());
    }).map((item) => {
      return (
        <li>
          <img alt="profile pic"></img>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', marginRight: '5px' }}>
              <p>
                {new Date(item['ride']['date_time']).toLocaleString()}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Driver:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['ride']['creator']['first_name']} {item['ride']['creator']['last_name']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Pick-up location:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['ride']['origin']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Destination:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['ride']['destination']}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <div style={{ display: "flex", flexDirection: "row-reverse", marginBottom: "10px", marginRight: "10px" }}>
                <button>View Details</button>
              </div>
              <div style={{ display: "flex", flexDirection: "row-reverse", marginBottom: "10px", marginRight: "10px" }}>
                <button>Help</button>
              </div>
            </div>
          </div>
        </li>
      )
    });

    const past = rideData.filter((ride) => {
      return ride['ride']['date_time'] < (new Date().toISOString());
    }).map((item) => {
      return (
        <li>
          <img alt="profile pic"></img>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', marginRight: '5px' }}>
              <p>
                {new Date(item['ride']['date_time']).toLocaleString()}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Driver:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['ride']['creator']['first_name'] } {item['ride']['creator']['last_name']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Pick-up location:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['ride']['origin']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Destination:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['ride']['destination']}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <div style={{ display: "flex", flexDirection: "row-reverse", marginBottom: "10px", marginRight: "10px" }}>
                <button>View Details</button>
              </div>
              <div style={{ display: "flex", flexDirection: "row-reverse", marginBottom: "10px", marginRight: "10px" }}>
                <button>Help</button>
              </div>
            </div>
          </div>
        </li>
      )
    });
    console.log(rideData);
    return (
      <>
        <div className='MyRide__rightbody__header'>
          <h1>My Rides</h1>
        </div>
        <div className="MyRide__rightbody__upcoming">
          <h2>Upcoming Trips</h2>
          <ul className="MyRide__rightbody__upcoming__List">
            {upcoming}
          </ul>

        </div>
        <div className="MyRide__rightbody__pasttrip">
          <h2>Past Trips</h2>
          <ul className="MyRide__rightbody__pasttrip__List">
            {past}
          </ul>

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
