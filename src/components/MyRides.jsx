import React, { useState, useContext, useEffect, useCallback, useRef } from "react";
import { UserContext, SelectionContext, RidesContext, ImgContext } from "./Usercontext";
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import "../styles/MyRides.css"

/**
 * 
 * @returns 
 */
export default function MyRides() {
  const { user, setUser } = useContext(UserContext);

  const [myrideselection, setMyRideSelection] = useState("My Rides");
  const [ridedisplayselection, setRidedisplayselection] = useState("def");
  const [ridedisplay, setRidedisplay] = useState([]);

  const [rideData, setRideData] = useState([{ ride: { creator: { id: '' }, id: '' } }]);

  const submitform = (event) => {
    event.preventDefault();
  }

  const clearselections = () => {
    setRidedisplayselection('')
  }

  const [rating, setRating] = useState(0);


  return (
    <div className="MyRide__body">
      <div style={{ width: '100%', display: "flex", flexDirection: "row", marginTop: "50px" }}>
        <div className="MyRide__leftnav">
          <ul style={{ listStyle: "none", margin: "0px" }}>
            <li className={myrideselection === "My Rides" ? "MyRide__leftnav__listitems--selected" : "MyRide__leftnav__listitems"}
              onClick={() => { setMyRideSelection("My Rides"); clearselections() }}>
              <h3 style={{ margin: "0px" }}>MyRides</h3>
            </li>
            <li className={myrideselection === "Riderequest" ? "MyRide__leftnav__listitems--selected" : "MyRide__leftnav__listitems"}
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
          <RidesContext.Provider value={{ rideData, setRideData, ridedisplayselection, setRidedisplayselection, ridedisplay, setRidedisplay, myrideselection, setMyRideSelection }}>
            {myrideselection === 'My Rides' && <Rides />}
            {myrideselection === 'Riderequest' && <Riderequest />}
            {myrideselection === 'FAQ' && <Faq />}
            {myrideselection === 'Ridedetails' && <Ridedetails />}
          </RidesContext.Provider>
        </div>
      </div>
    </div>
  )
}

const Rides = () => {
  const { user } = useContext(UserContext);
  const { img, setImg } = useContext(ImgContext);
  const { rideData, setRideData, ridedisplayselection, setRidedisplayselection, ridedisplay, setRidedisplay, myrideselection, setMyRideSelection } = useContext(RidesContext);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/core/myrides/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + user.token
      }
    })
      .then(response => response.json())
      .then(data => { console.log("here"); console.log(data); setRideData(data) })
      .catch(error => console.log(error));
    console.log("submitted");
  }, [])
  try {
    const upcoming = rideData.filter((ride) => {
      return ride['date_time'] >= (new Date().toISOString());
    }).map((item) => {
      return (
        <li>
          <img src={img} style={{ width: "155px", height: "167px", borderRadius: '5%' }}></img>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', marginRight: '5px' }}>
              <p>
                {new Date(item['date_time']).toLocaleString()}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Driver:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['creator']['username']} </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Pick-up location:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['origin']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "8px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Destination:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['destination']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "7px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Seats Remaining:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['seats']}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <div style={{ width: '100px', height: '30px', display: "flex", alignItems: 'center', justifyContent: 'center', marginBottom: "10px", marginRight: "10px", backgroundColor: "grey", borderRadius: '10px' }}>
                <button className="invis" onClick={() => { setMyRideSelection('Ridedetails'); setRidedisplay(item) }}>View Details</button>
              </div>
            </div>
          </div>
        </li>
      )
    });

    const past = rideData.filter((ride) => {
      return ride['date_time'] < (new Date().toISOString());
    }).map((item) => {
      return (
        <li>
          <img src={img} style={{ width: "155px", height: "167px", borderRadius: '5%' }}></img>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', marginRight: '5px' }}>
              <p>
                {new Date(item['date_time']).toLocaleString()}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Driver:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['creator']['username']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Pick-up location:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['origin']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "8px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Destination:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['destination']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "7px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Seats remaining:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['seats']}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <div style={{ width: '100px', height: '30px', display: "flex", alignItems: 'center', justifyContent: 'center', marginBottom: "10px", marginRight: "10px", backgroundColor: "grey", borderRadius: '10px' }}>
                <button className="invis" onClick={() => { setMyRideSelection('Ridedetails'); setRidedisplay(item) }}>View Details</button>
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
  catch {
    return (
      <h1> Loading...</h1>
    )
  }
}

const Riderequest = () => {
  const { user, setUser } = useContext(UserContext)
  const { img, setImg } = useContext(ImgContext)
  const { rideData, setRideData, ridedisplayselection, setRidedisplayselection, ridedisplay, setRidedisplay, myrideselection, setMyRideSelection } = useContext(RidesContext);
  const [riderequest, setRiderequest] = useState("");
  const [updaterequest, setUpdaterequest] = useState(0);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/core/riderequest/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + user.token
      }
    })
      .then(response => response.json())
      .then(data => { console.log(data); setRiderequest(data.data) })
      .catch(error => console.log(error));
    console.log("submitted");
  }, [updaterequest])

  const handleAccept = (item) => {
    const body = { "status": "Accepted", "request_id": item.reqid, "ride_id": item.rideid }
    console.log(body)
    fetch('http://127.0.0.1:8000/core/handle-request/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + user.token
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => { console.log(data) })
      .catch(error => console.log(error));
    console.log("submitted");
    setUpdaterequest(updaterequest + 1)
  }

  const handleReject = (item) => {
    const body = { "status": "Rejected", "request_id": item.reqid, "ride_id": item.rideid }
    console.log(body)
    fetch('http://127.0.0.1:8000/core/handle-request/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + user.token
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => { console.log(data) })
      .catch(error => console.log(error));
    console.log("submitted");
    setUpdaterequest(updaterequest + 1)
  }

  try {
    const pending = riderequest.filter((ride) => {
      return ride['attributes']['status'] === 'Pending';
    }).map((item) => {
      return (
        <li>
          <img src={img} style={{ width: "155px", height: "160px", borderRadius: '5%' }}></img>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', marginRight: '5px' }}>
              <p>
                {new Date(item['attributes']['ride']['date_time']).toLocaleString()}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Passenger:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['attributes']['passenger']['username']} </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Pick-up location:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['attributes']['ride']['origin']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Destination:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['attributes']['ride']['destination']}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <div style={{ display: "flex", flexDirection: "row-reverse", marginBottom: "10px", marginRight: "10px" }}>
                <button onClick={() => { handleReject({ "reqid": item['id'], "rideid": item['attributes']['ride']['id'] }) }}>Reject</button>
              </div>
              <div style={{ display: "flex", flexDirection: "row-reverse", marginBottom: "10px", marginRight: "10px" }}>
                <button onClick={() => { handleAccept({ "reqid": item['id'], "rideid": item['attributes']['ride']['id'] }) }}>Accept</button>
              </div>
            </div>
          </div>
        </li>
      )
    });

    const accepted = riderequest.filter((ride) => {
      return ride['attributes']['status'] === 'Accepted';
    }).map((item) => {
      return (
        <li>
          <img src={img} style={{ width: "155px", height: "160px", borderRadius: '5%' }}></img>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', marginRight: '5px' }}>
              <p>
                {new Date(item['attributes']['ride']['date_time']).toLocaleString()}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Passenger:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['attributes']['passenger']['username']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Pick-up location:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['attributes']['ride']['origin']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Destination:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{item['attributes']['ride']['destination']}</p>
            </div>
            <div style={{ height: '30px' }}>
            </div>
          </div>
        </li>
      )
    });
    return (
      <>
        <div className='MyRide__rightbody__header'>
          <h1>Ride Requests</h1>
        </div>
        <div className="MyRide__rightbody__upcoming">
          <h2>Pending</h2>
          <ul className="MyRide__rightbody__upcoming__List">
            {pending}
          </ul>

        </div>
        <div className="MyRide__rightbody__pasttrip">
          <h2>Accepted</h2>
          <ul className="MyRide__rightbody__pasttrip__List">
            {accepted}
          </ul>

        </div>
      </>
    )
  }
  catch {
    return (
      <h1> Loading...</h1>
    )
  }
}

const Faq = () => {
  return (
    <>
      <h1>
        FAQ
      </h1>
      <h2>
        Administrative
      </h2>
      <h3>
        What happens if my taxi doesn't arrive on time?
      </h3>
      <p>
        We strive to be punctual with our services, but if your taxi doesn't arrive on time, please call our customer service hotline and we'll do our best to resolve the issue.
      </p>
      <h3>
        Are your taxis safe and well-maintained?
      </h3>
      <p>
        Yes, our taxis are regularly serviced and maintained to ensure they are safe and comfortable for our passengers.
      </p>
      <h3>
        How do I recieve payment from my passengers?
      </h3>
      <p>
        Passengers can choose to pay by cash directly to the driver, or by online payment/card through Wanderful and the money will be sent to your account once the ride is completed and processed by our system.
      </p>
      <h2>
        Functional
      </h2>
      <h3>
        If I take the same drive everyday, do I need to create a drive for every single day?
      </h3>
      <p>
        No you do not need to create multiple drives, you may create a single drive and click on the "Recurring" option to indicate that this is a repeated drive.
      </p>
      <h3>
        How do I book a ride?
      </h3>
      <p>
        Go to the Create Ride page, and click on Ride. There you will be able to key in your pick-up location and destination, date and time of the ride as well as how many seats you require.
      </p>
      <h3>
        How do I know if my drive/ride has been accepted?
      </h3>
      <p>
        Go to My Rides page, click on Ride Requests and there you will be able to see your pending and accepted rides.
      </p>
      <h3>
        I want to look at the rides available right now from where I am, how do I do that?
      </h3>
      <p>
        Go to Search Ride, there you may input your pick-up location and will be able to browse through all the rides that pass by your pick-up location.
      </p>
    </>
  )

}

const Ridedetails = () => {
  console.log('ridedetails')
  const { user, setUser } = useContext(UserContext)
  const { img, setImg } = useContext(ImgContext)
  const { rideData, setRideData, ridedisplayselection, setRidedisplayselection, ridedisplay, setRidedisplay, myrideselection, setMyRideSelection } = useContext(RidesContext);
  const [member, setMembers] = useState("")
  useEffect(() => {
    try {
      fetch('http://127.0.0.1:8000/conversation/members/' + ridedisplay.id + '/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + user.token
        }
      })
        .then((response) => response.json())
        .then(data => { console.log(data); setMembers(data) })
        .catch((e) => console.log(e));
    }
    catch {
      console.log('error on fetching members')
    }
  }, [])
  console.log("here")
  console.log(member);
  let memberslist
  try {
    memberslist = member[0].members.map((item) => {
      return (
        <p key={item.username}> Username: {item.username}</p>
      )
    })
  }
  catch {
    memberslist = "Loading..";
  }
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
          <img src={img} style={{ width: "155px", height: "160px", borderRadius: '5%' }}></img>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', marginRight: '5px' }}>
              <p>
                {new Date(ridedisplay['date_time']).toLocaleString()}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Driver:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{ridedisplay['creator']['username']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Pick-up location:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{ridedisplay['origin']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Destination:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{ridedisplay['destination']}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
              <h4 style={{ margin: "0px" }}>Seats Remaining:</h4>
              <p style={{ margin: "0px", marginLeft: "10px" }}>{ridedisplay['destination']}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <div style={{ width: '100px', height: '30px', display: "flex", alignItems: 'center', justifyContent: 'center', marginBottom: "10px", marginRight: "10px", backgroundColor: "grey", borderRadius: '10px' }}>
                <button className='invis' style={{ width: '100px', height: '30px', backgroundColor: "grey", borderRadius: '10px' }} onClick={() => { setRidedisplayselection('chat') }}>Chat</button>
              </div>
            </div>
          </div>
        </div>
        <div className="MyRide__rightbody__Ridedetails__body">
          {ridedisplayselection !== 'chat' &&
            <>
              <h4>
                Members:
              </h4>
              {memberslist}
            </>
          }
          {ridedisplayselection === 'chat' && <Chat />}
          {ridedisplayselection === 'rating' && <Rating />}
        </div>
      </div>
    </>
  )
}

const Chat = () => {
  const { user } = useContext(UserContext);
  const { rideData, setRideData, ridedisplayselection, setRidedisplayselection, ridedisplay, setRidedisplay, myrideselection, setMyRideSelection } = useContext(RidesContext);
  const [updatechat, setUpdatechat] = useState(0);
  const [curchat, setCurchat] = useState([]);
  const inputRef = useRef(null);
  const [textinput, setTextinput] = useState("");

  const submitform = (event) => {
    event.preventDefault();
  }

  const sendchat = (text) => {
    fetch('http://127.0.0.1:8000/conversation/sendchat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + user.token
      },
      body: JSON.stringify(text)
    })
      .then(response => response.json())
      .then(data => { console.log(data) })
      .catch(error => console.log(error));
    console.log("success");
    setUpdatechat(updatechat + 1);
  }

  useEffect(() => {
    try {
      fetch('http://127.0.0.1:8000/conversation/chat/' + ridedisplay.id + '/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + user.token
        }
      })
        .then((response) => response.json())
        .then(data => { console.log(data); setCurchat(data) })
        .catch((e) => console.log(e));
    }
    catch {
      console.log('error on fetching chat')
    }
  }, [updatechat])

  try {
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
      if (item.created_by.id !== ridedisplay.creator.id) {
        display = (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ padding: '5px', margin: '8px', marginBottom: '4px', backgroundColor: 'aqua', borderRadius: '10px', width: '100px' }}>
              <p>
                <p>
                  <i>
                    {item.created_by.username}
                  </i>
                </p>
                {item.content}
              </p>
            </div>
          </div>
        )
      }
      else {
        display = (
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <div style={{ padding: '5px', margin: '8px', marginBottom: '4px', backgroundColor: 'aqua', borderRadius: '10px', width: '100px', height: 'auto' }}>
              <p>
                <p>
                  <i>
                    {item.created_by.username}
                  </i>
                </p>
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
    console.log(curchat)
    return (
      <div className="MyRide__rightbody__Ridedetails__body__Chat">
        <form className="MyRide__rightbody__Ridedetails__body__Chat__input" onSubmit={submitform}>
          <input ref={inputRef} type="text" className='bbon' style={{ width: '90%' }} />
          <button style={{ padding: '0px' }} onClick={() => { sendchat({ "conversation_id": ridedisplay.id, "content": inputRef.current.value }); setTextinput(inputRef.current.value); inputRef.current.value = "" }}>
            <img src='/assets/Iconsend.png' style={{ width: '40px', height: '18px' }} alt='icon' />
          </button>
        </form>
        {chatlog}
      </div>
    )
  }
  catch {
    return (
      <div className="MyRide__rightbody__Ridedetails__body__Chat">
        <form className="MyRide__rightbody__Ridedetails__body__Chat__input" onSubmit={submitform}>
          <input ref={inputRef} type="text" style={{ width: '90%' }} />
          <button style={{ padding: '0px' }} onClick={() => { sendchat({ "conversation": ridedisplay.id, "content": inputRef.current.value }); setTextinput(inputRef.current.value); inputRef.current.value = "" }}>
            <img src='/assets/Iconsend.png' style={{ width: '40px', height: '18px' }} alt='icon' />
          </button>
        </form>
      </div>
    )
  }
}

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