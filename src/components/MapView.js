import React, { Component } from "react";

import MapComponent from "./Map";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLatLng: {
        lat: props.latitude,
        lng: props.longitude
      },
      isMarkerShown: false
    };
  }

  componentWillReceiveProps() {
    this.setState(prevState => ({
      currentLatLng: {
        ...prevState.currentLatLng,
        lat: this.props.latitude,
        lng: this.props.longitude
      }
    }));
  }

  render() {
    return (
      <MapComponent
        isMarkerShown={true}
        onMarkerClick={this.handleMarkerClick}
        currentLocation={this.state.currentLatLng}
      />
    );
  }
}

export default MapView;
