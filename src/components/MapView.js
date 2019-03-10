import React, { Component } from "react";
import { toast } from "react-toastify";
import MapComponent from "./Map";
import API from "../store/api";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLatLng: {
        lat: props.latitude,
        lng: props.longitude
      },
      weather_state_name: null,
      city: null,
      temperatureinFahrenheit: null,
      isInfoOpen: false
    };
  }

  // Check if the props changed or the map pin is clicked, if yes re-render
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props ||
      nextState.isInfoOpen !== this.state.isInfoOpen
      ? true
      : false;
  }

  /**
   * componentWillReceiveProps - deprecated.
   * so, changed the from componentWillReceiveProps to componentDidUpdate.
   * Moved the Ajax calls to get the city and weather info from componentDidUpdate
   * to handleMarkerClick. This significantly reduced the # of network calls.
   * to fetch the weather data ONLY when the pin is clicked.
   * and implemented the shouldComponentUpdate to avoid unwanted renders.
   * This fixed the chained network calls.
   **/

  componentDidUpdate(prevProps, prevState) {
    const { latitude, longitude, temperatureinFahrenheit } = this.props;
    const temperature_rounded = Math.round(temperatureinFahrenheit * 100) / 100;

    this.setState({
      ...this.state,
      currentLatLng: {
        lat: latitude,
        lng: longitude
      },
      temperatureinFahrenheit: temperature_rounded
    });
  }

  handleMarkerClick = async () => {
    if (this.state.isInfoOpen)
      this.setState({ ...this.setState, isInfoOpen: !this.state.isInfoOpen });
    else
      try {
        // Call findLocationByLatLng API to get the woeid
        const { latitude, longitude } = this.props;
        const latlon = [latitude, longitude].join(",");
        const { data: location } = await API.findLocationByLatLng(latlon);
        const woeid = location[0].woeid;

        // Call findWeatherbyId API to get the city and weather
        const { data } = await API.findWeatherbyId(woeid);
        const weather = data.consolidated_weather[0];
        const { weather_state_name } = weather;
        const { title: city } = data;

        this.setState({
          ...this.state,
          city,
          weather_state_name,
          isInfoOpen: true
        });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data);
        }
      }
  };

  render() {
    return (
      <MapComponent
        isMarkerShown={true}
        onMarkerClick={this.handleMarkerClick}
        currentLocation={this.state.currentLatLng}
        temperatureinFahrenheit={this.state.temperatureinFahrenheit}
        city={this.state.city}
        weather={this.state.weather_state_name}
        isInfoOpen={this.state.isInfoOpen}
      />
    );
  }
}

export default MapView;
