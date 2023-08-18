import React, { useState } from "react";
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
import './map.css'



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

export function Map() {

  //check loading status
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries,
  });

  // This is the maker location info:
  const [markers, setMarkers] = React.useState([]);
  //debug -- should be null not []
  const [selected, setSelected] = React.useState(null);

  const [LatestPosition, setLatestPosition] = React.useState(-1);

  const [history, setHistory] = useState([])

  const addNewHistory = React.useCallback((value) => {
    console.log("addNewHistory")
    if (!history.includes(value)) {
      setHistory([...history, ...[value]]);
    }
  })

  console.log("selected", selected)
  console.log("markers", markers)


  //React-call back function: useCallBack will returen a memozied version of the callback that only changes if one of the inputs has changed --reactjs-hooks references
  /*   const onMapClick = React.useCallback((event) => {
      setMarkers((current) => [
        ...current,
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date(),
        },
      ]);
    }, []);
   */
  // //useState -cause rerender  vs  useRef -retain state without rerender
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading";
  if (!isLoaded) return "loading";

  return (
    <div>
      <h1>Find a restaurant here to share with your friends</h1>
        <Search setMarkers={setMarkers} addNewHistory={addNewHistory} />
        <br />
    <div className="Map" >
      <div >
         <div className="list">
         <h4 className="section-title">Shared restaurants list here</h4>
        {history.map((e) => {
          return <h4>{e}</h4>
        })}
        </div>
      </div>

      <div className="list">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          options={options}
          //above the event is moving to onMapClick
          // onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {markers.map((marker, idk) => (
            <Marker
              key={marker.time.toISOString()} //Use timestamp as the unique key, add marker here with onclick
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                console.log("here on click")
                setSelected(marker);
                setLatestPosition(idk)
              }}
            />
          ))}

          {selected ? (
            <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}>
              <div>
                <h2>{history[LatestPosition]} </h2>
                {/* <p>xxxxxx{formatRelative(selected.time, new Date())}</p> */}
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
      </div>
      <Link to={'/'}>
        <button>Back to Home</button>
      </Link>
    </div>
   
  );
}