import React from "react";
import "../styles/RideCreation.css"

export default function RideCreation() {
  return (
        
        <form className="form-group">
            <div className = "ride-creation-header">
                <h2>Drive</h2>
                <h2>Ride</h2>
            </div>
            <div className="ride-creation-input">
                <label htmlFor="start">Start Location</label>
                <input type="text" id="start" name="start" placeholder="Start Location"/> 
                <label htmlFor="end">End Location</label>
                <input type="text" id="end" name="end" placeholder="End Location"/>     
            </div>
        </form>
        
    );
}