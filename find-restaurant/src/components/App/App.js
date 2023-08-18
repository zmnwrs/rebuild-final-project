import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import mapStyle from "./mapStyle";
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"


//import all these following for google find place
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxList,
  ComboboxPopover,
} from "@reach/combobox";

import HomePage from "../Pages/HomePage";
import EmptyPage from "../Pages/NotFoundPage";
import { Map } from "../Map/map";



export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/map" element={<Map />} /> 
      <Route path="/*" element={<EmptyPage />} /> 
    </Routes>
    </BrowserRouter>
  )
  // return <Map></Map>
}


