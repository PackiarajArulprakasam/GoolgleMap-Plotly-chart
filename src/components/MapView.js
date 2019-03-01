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

  async componentDidUpdate() {
    // Get the city, weather and update the local state
    const { latitude, longitude } = this.props;
    try {
      // Call findLocationByLatLng API to get the woeid

      const latlon = [latitude, longitude].join(",");
      const data = await API.findLocationByLatLng(latlon);
      const id = data["data"][0].woeid;

      // Call findWeatherbyId API to get the city and weather
      const weatherData = await API.findWeatherbyId(id);
      const weather = weatherData["data"].consolidated_weather[0];
      const { weather_state_name } = weather;
      const { title: city } = weatherData["data"];

      const temperature_rounded =
        Math.round(this.props.temperatureinFahrenheit * 100) / 100;

      this.setState({
        ...this.state,
        currentLatLng: {
          lat: latitude,
          lng: longitude
        },
        temperatureinFahrenheit: temperature_rounded,
        city,
        weather_state_name
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data);
      }
    }
  }

  handleMarkerClick = () => {
    this.setState({ ...this.setState, isInfoOpen: !this.state.isInfoOpen });
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
