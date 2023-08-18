import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import mapStyle from "../App/mapStyle";
import { Search } from "./Search";
import { Link } from "react-router-dom";

const libraries = ["places"];

const mapContainerStyle = {

  width: "100%",
  height: "500px",
};

const center = {
  lat: -37.81218719482422,
  lng: 144.96229553222656,
};

//This style is from Snazzy Map website
const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

export function Map()  {

      //check loading status
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries,
  });

  // This is the maker location info:
  const [markers, setMarkers] = React.useState([]);
  //debug -- should be null not []
  const [selected, setSelected] = React.useState(null);

  const [history, setHistory] = useState([])

  const addNewHistory = React.useCallback((value) => {
    console.log("addNewHistory")
    if (!history.includes(value)) {
      setHistory([...history, ...[value]]);
    }
  })


  //React-call back function: useCallBack will returen a memozied version of the callback that only changes if one of the inputs has changed --reactjs-hooks references
  const onMapClick = React.useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  // //useState -cause rerender  vs  useRef -retain state without rerender
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading";
  if (!isLoaded) return "loading";

  return (
    <div class="flex-container" data-testid = "flex-container">
      <div class="flex-item" data-testid="flex-item">
      <h1>Find a restaurant here to share with your friends</h1>
      <Search setMarkers={setMarkers} addNewHistory ={addNewHistory} />
      <br />
      {history.map((e) => {
        return <h3>The name is {e}</h3>
      })}
      </div>
      
      <div class="flex-item" data-testid="flex-item">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        options={options}
        //above the event is moving to onMapClick
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()} //Use timestamp as the unique key, add marker here with onclick
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}>
            <div>
              <h2>Should put the name and address here</h2>
              {/* <p>xxxxxx{formatRelative(selected.time, new Date())}</p> */}
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      </div>
      <Link to={'/'}>
        <span>Back to Home</span>
      </Link>
    </div>
  );
}