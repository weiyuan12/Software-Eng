import React, { useState, useEffect } from 'react';
import credentials from '../Credentials';
import { Map, GoogleApiWrapper } from 'google-maps-react';

function DynamicMap(props) {
    // initial center is singapore
    const [mapCenter, setMapCenter] = useState({
      lat: 1.352178, 
      lng: 103.804899
    });
  
    return (
        <Map
            google={props.google}
            zoom={11}
            style={{width: '100%', height: '100%'}}
            initialCenter={mapCenter}
            center={mapCenter}
        />
    );
}
  
export default GoogleApiWrapper({
    apiKey: credentials.GOOGLE_API_KEY,
})(DynamicMap);