import React from "react";

import "@reach/combobox/styles.css";

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
export function Search({ setMarkers, addNewHistory }) {
    const {
      ready,
      value,
  
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete();
  
  
    return (
      <>
        <Combobox
          data-testid="combobox"
          onSelect={async (address) => {
            try {
              setValue(address, false)
              clearSuggestions()
  
              const results = await getGeocode({ address });
              console.log("result", results[0]);
              results.map((result) => {
                addNewHistory(address)
              })
              const { lat, lng } = await getLatLng(results[0])
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
          style={ {width: "500px" }}
            value={value}
  
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder="Enter a restaurant"
          />
          <ComboboxPopover style={{ zIndex: 9999999999 }}>
            <ComboboxList>
              {console.log(data)}
              {status === "OK" &&
                data.map(({ place_id, description,  }) => {
                  //setHistory([...history, ...[description]]);
                  return <ComboboxOption key={place_id} value={description} />
                })}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
  
        {/* {history.map((e) => {
            return <h3>The name is {e}</h3>
          })} */}
      </>
    );
  }