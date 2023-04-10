import React, { useState, useContext, useEffect, useCallback, useRef } from "react";
import { UserContext, SelectionContext } from "./Usercontext";
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import "../styles/MyRides.css"

/**
 * 
 * @returns 
 */
export default function MyRides() {
  const { user, setUser } = useContext(UserContext);
  const inputRef = useRef(null);
  const [myrideselection, setMyRideSelection] = useState("My Rides");
  const [ridedisplayselection, setRidedisplayselection] = useState("def");
  const [ridedisplay, setRidedisplay] = useState([]);
  const [textinput, setTextinput] = useState("");
  const [curchat, setCurchat] = useState([{ created_by: { id: '' }, }]);
  const [rideData, setRideData] = useState([{ ride: { creator: { id: '' }, id: '' } }]);

  // useEffect(()=>{
  //   fetch('http://127.0.0.1:8000/conversation/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Token ' + user.token
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => { console.log(data); data.length > 0 ? setRideData(data) : setRideData([{ ride: { creator: {} } }]) })
  //     .catch(error => console.log(error));
  //   console.log("submitted");
  // })

  useEffect(() => {
    fetch('http://127.0.0.1:8000/core/myrides/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + user.token
      }
    })
      .then(response => response.json())
      .then(data => { console.log(data); data.length > 0 ? setRideData(data) : setRideData([{ ride: { creator: {} } }]) })
      .catch(error => console.log(error));
    console.log("submitted");
  }, [])

  useEffect(() => {
    try {
      fetch('http://127.0.0.1:8000/conversation/chat/' + ridedisplay.ride.id + '/' + ridedisplay.ride.creator.id + '/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + user.token
        }
      })
        .then((response) => response.json())
        .then(data => setCurchat(data))
        .catch((e) => console.log(e));
    }
    catch {
      console.log('error on fetching chat')
    }


  }, [ridedisplay])

  const submitform = (event) => {
    event.preventDefault();
  }

  const clearselections = () => {
    setRidedisplayselection('')
  }

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
                <button onClick={() => { setMyRideSelection('Ridedetails'); setRidedisplay(item) }}>View Details</button>
              </div>
              <div style={{ display: "flex", flexDirection: "row-reverse", marginBottom: "10px", marginRight: "10px" }}>
                <button onClick={() => { setMyRideSelection('Ridedetails'); setRidedisplayselection('rating'); setRidedisplay(item) }}>Rate</button>
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
                <button onClick={() => { setMyRideSelection('Ridedetails'); setRidedisplay(item) }}>View Details</button>
              </div>
              <div style={{ display: "flex", flexDirection: "row-reverse", marginBottom: "10px", marginRight: "10px" }}>
                <button onClick={() => { setMyRideSelection('Ridedetails'); setRidedisplayselection('rating'); setRidedisplay(item) }}>Rate</button>
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

  const Riderequest = () => {
    return (
      <>
        <h1>Ride Requests</h1>
        <h2>Pending</h2>
        <h2>Accepted</h2>
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

  const Ridedetails = () => {
    console.log('ridedetails')
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img alt="icon" src='/assets/IconRidedetail.png' style={{ height: '30px' }} />
          <h3 style={{ margin: '0px', padding: '0px' }}>
            Ride Details
          </h3>
        </div>
        <div className="MyRide__rightbody__Ridedetails">
          <div className="MyRide__rightbody__Ridedetails__info">
            <img alt="profile pic"></img>
            <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
              <div style={{ display: 'flex', flexDirection: 'row-reverse', marginRight: '5px' }}>
                <p>
                  {new Date(ridedisplay['ride']['date_time']).toLocaleString()}
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
                <h4 style={{ margin: "0px" }}>Driver:</h4>
                <p style={{ margin: "0px", marginLeft: "10px" }}>{ridedisplay['ride']['creator']['first_name']} {ridedisplay['ride']['creator']['last_name']}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
                <h4 style={{ margin: "0px" }}>Pick-up location:</h4>
                <p style={{ margin: "0px", marginLeft: "10px" }}>{ridedisplay['ride']['origin']}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
                <h4 style={{ margin: "0px" }}>Destination:</h4>
                <p style={{ margin: "0px", marginLeft: "10px" }}>{ridedisplay['ride']['destination']}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <div style={{ display: "flex", flexDirection: "row-reverse", marginBottom: "10px", marginRight: "10px" }}>
                  <button onClick={() => { setRidedisplayselection('chat') }}>Chat</button>
                </div>
              </div>
            </div>
          </div>
          <div className="MyRide__rightbody__Ridedetails__body">
            {ridedisplayselection === 'chat' && <Chat />}
            {ridedisplayselection === 'rating' && <Rating />}
          </div>
        </div>
      </>
    )
  }

  const Chat = () => {
    const sortedchat = curchat.sort((fitem, sitem) => {
      if (fitem['created_at'] > sitem['created_at']) {
        return -1;
      }
      else {
        return 1;
      }
    })
    const chatlog = sortedchat.map((item, index) => {
      let display;
      if (item.created_by.id === ridedisplay.ride.creator.id) {
        display = (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ padding: '5px', margin: '8px', marginBottom: '4px', backgroundColor: 'aqua', borderRadius: '10px', width: '100px' }}>
              <p>
                {item.content}
              </p>
            </div>
          </div>
        )
      }
      else {
        display = (
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <div style={{ padding: '5px', margin: '8px', marginBottom: '4px', backgroundColor: 'aqua', borderRadius: '10px', width: '100px' }}>
              <p>
                {item.content}
              </p>
            </div>
          </div>
        )
      }
      return (
        <div key={index} className="MyRide__rightbody__Ridedetails__body__Chat__row">
          {display}
        </div>
      )
    })
    console.log(textinput)
    return (
      <div className="MyRide__rightbody__Ridedetails__body__Chat">
        <form className="MyRide__rightbody__Ridedetails__body__Chat__input" onSubmit={submitform}>
          <input ref={inputRef} type="text" className='bbon' style={{ width: '90%' }} />
          <button onClick={() => setTextinput(inputRef.current.value)}>
            <img alt='icon' />
          </button>
        </form>
        {chatlog}
      </div>
    )
  }
  const [rating, setRating] = useState(0);
  const Rating = () => {

    const handleRatingHover = (index) => {
      setRating(index + 1);
    };
    return (
      <>
        <div>
          <p>Rate this ride:</p>
          <div className="star-rating">
            {[...Array(5)].map((_, index) => {
              return (
                <span
                  key={index}
                  className={`star ${index = rating ? "rated" : ""}`}
                  onMouseEnter={() => handleRatingHover(index)}
                  onMouseLeave={() => setRating(0)}
                >
                  <FaStar />
                </span>
              );
            })}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="MyRide__body">
      <div style={{ width: '100%', display: "flex", flexDirection: "row", marginTop: "50px" }}>
        <div className="MyRide__leftnav">
          <ul style={{ listStyle: "none", margin: "0px" }}>
            <li className={myrideselection === "My Rides" ? "MyRide__leftnav__listitems--selected" : "MyRide__leftnav__listitems"}
              onClick={() => { setMyRideSelection("My Rides"); clearselections() }}>
              <h3 style={{ margin: "0px" }}>MyRides</h3>
            </li>
            <li className={myrideselection === "Help" ? "MyRide__leftnav__listitems--selected" : "MyRide__leftnav__listitems"}
              onClick={() => { setMyRideSelection("Riderequest"); clearselections() }}>
              <h3 style={{ margin: "0px" }}>Ride Requests</h3>
            </li>
            <li className={myrideselection === "FAQ" ? "MyRide__leftnav__listitems--selected" : "MyRide__leftnav__listitems"}
              onClick={() => { setMyRideSelection("FAQ"); clearselections() }}>
              <h3 style={{ margin: "0px" }}>FAQ</h3>
            </li>
          </ul>
        </div>
        <div className="MyRide__rightbody" style={{ marginLeft: "5px" }}>
          {myrideselection === 'My Rides' && <Rides />}
          {myrideselection === 'Riderequest' && <Riderequest />}
          {myrideselection === 'FAQ' && <Faq />}
          {myrideselection === 'Ridedetails' && <Ridedetails />}
        </div>
      </div>
    </div>
  )
}
