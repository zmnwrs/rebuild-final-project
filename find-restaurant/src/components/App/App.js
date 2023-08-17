import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import mapStyle from "./mapStyle";

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

// Following is to define the googlemap and marker
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


function Search({ setMarkers}) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete();
  
    return (
        <Combobox
          onSelect={async (address) => {
            try {
              setValue(address, false)
              clearSuggestions()
  
              const results = await getGeocode({ address });
              console.log(results[0]);
              const {lat, lng} = await getLatLng(results[0])
              setMarkers((current) => [
                ...current,
                {
                  lat,
                  lng,
                  time: new Date(),
                },
              ]);
            } catch (error) {
              console.log("error!");
            }
          }}
        >
          <ComboboxInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder="Enter a restaurant"
          />
          <ComboboxPopover style={{zIndex: 9999999999}}>
            <ComboboxList>
              {console.log(data)}
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
    );
  }


export default function App() {
  //check loading status
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCUq9TdIsCUNEYgfZB2AmQm2jjwbgPsJXY",
    libraries,
  });

  // This is the maker location info:
  const [markers, setMarkers] = React.useState([]);
  //debug -- should be null not []
  const [selected, setSelected] = React.useState(null);

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
    <div>
      <h1>Find a restaurant here to share with your friends</h1>
      <Search setMarkers={setMarkers}/>
      <br />
      
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        options={options}
        //above the event is moving to onMapClick
        onClick={onMapClick}
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
  );
}


