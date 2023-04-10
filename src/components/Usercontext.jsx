import { createContext } from "react";

export const UserContext = createContext(null);
export const SelectionContext = createContext("blank");
export const Marker1Context = createContext({lat: 1.352178, 
    lng: 103.804899});
export const Marker2Context = createContext({lat: 1.352178, 
    lng: 103.804899});
export const CarparkMarkerContext = createContext([])
export const PathContext = createContext([])
export const ProfileContext = createContext("blank");
export const TaxiContext = createContext([])
export const LocationContext = createContext([])