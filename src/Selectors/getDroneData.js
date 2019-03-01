import { createSelector } from "reselect";

// implement selectors using reselct

const getTemprature = state => state.drone.temperatureinFahrenheit;
const getLatitude = state => state.drone.latitude;
const getLongitude = state => state.drone.longitude;
const getLoadingDrone = state => state.drone.loadingDrone;

export const getDroneData = createSelector(
  [getTemprature, getLatitude, getLongitude, getLoadingDrone],
  (temperatureinFahrenheit, latitude, longitude, loadingDrone) => {
    return {
      temperatureinFahrenheit,
      latitude,
      longitude,
      loadingDrone
    };
  }
);
