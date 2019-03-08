import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MapComponent = compose(
  withProps({
    // for withScripts
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    // for withGoogleMap
    containerElement: <div style={{ height: `400px`, width: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs, // HOC - initializes the map component ( MapComponent)
  withGoogleMap // HOC - loads the Google Maps Javascript API v3
)(props => {
  return (
    <GoogleMap
      defaultZoom={4}
      defaultCenter={{
        lat: 29.7604,
        lng: -95.3698
      }}
    >
      {props.isMarkerShown && (
        <Marker
          position={{
            lat: props.currentLocation.lat,
            lng: props.currentLocation.lng
          }}
          onClick={props.onMarkerClick}
        >
          {props.isInfoOpen && (
            <InfoWindow>
              <div>
                Weather in {props.city}: {props.weather} and{" "}
                {props.temperatureinFahrenheit}˚F
                <br />
              </div>
            </InfoWindow>
          )}
        </Marker>
      )}
    </GoogleMap>
  );
});

export default MapComponent;
