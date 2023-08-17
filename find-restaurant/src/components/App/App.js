import React from "react"
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from "date-fns";//formatting
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
    ComboboxPopover
} from "@reach/combobox"

// Following is to define the googlemap and marker
const libraries = ["places"];

const mapContainerStyle = {
    width: "100%",
    height: "500px"
}

const center = {
    lat: -37.81218719482422,
    lng: 144.96229553222656,
};

//This style is from Snazzy Map website
const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,
}

function Search() {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => -37.81, lng: () => 144.96 },
            //radius: 200 * 1000,
        },
    })


    return (
        <div>
            <Combobox
                onSelect={async (address) => {
                    try {
                        const results = await getGeocode({ address });
                            console.log(results[0]);

                    } catch (error) {
                console.log("error!")
            }

            console.log(address);
                }} >
            <ComboboxInput
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                disabled={!ready}
                placeholder="Enter a restaurant" />
              <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
        </div >
    )
}

export default function App() {
    //check loading status
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
        libraries,
    });

    // This is the maker location info:
    const [markers, setMarkers] = React.useState([]);
    //debug -- should be null not []
    const [selected, setSelected] = React.useState(null);

    //React-call back function: useCallBack will returen a memozied version of the callback that only changes if one of the inputs has changed --reactjs-hooks references
    const onMapClick = React.useCallback((event) => {
        setMarkers(current => [...current,
        {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
        },
        ]);
    }, [])

    //useState -cause rerender  vs  useRef -retain state without rerender
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    if (loadError) return "Error loading"
    if (!isLoaded) return "loading"


    return (
        <div>
            <h1>Find a restaurant here to share with your friends</h1>
            <Search />
            <br />
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
                options={options}
                /*    onClick={(event) => {
                       setMarkers(current => [...current,
                       {
                           lat: event.latLng.lat(),
                           lng: event.latLng.lng(),
                           time: new Date(),
   
                       },
                       ]);
                   }} */
                //above the event is moving to onMapClick
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (<
                    Marker key={marker.time.toISOString()}  //Use timestamp as the unique key, add marker here with onclick
                    position={{ lat: marker.lat, lng: marker.lng }}

                    onClick={() => {
                        setSelected(marker);
                    }}
                />
                ))}

                {selected ? (
                    <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}>
                        <div>
                            <h2>What is infor window</h2>
                            <p>xxxxxx{formatRelative(selected.time, new Date())}</p>
                        </div>
                    </InfoWindow>
                ) : null}

            </GoogleMap>
        </div>

    );
}