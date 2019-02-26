import * as actions from "../actions";

const initialState = {
  loadingDrone: true,
  temperature: "",
  latitude: 0,
  longitude: 0,
  timestamp: null,
  data: {}
};

const droneDataRecevied = (state, action) => {
  const { data } = action;

  if (!data) return state;
  //set the
  const latestData = data["data"].length - 1;
  const { latitude, longitude } = data["data"][latestData];

  // Sample response from API
  // {
  //   "timestamp": 1550548236000,
  //   "metric": 318.25215294082057,
  //   "latitude": 29.447692488381048,
  //   "longitude": -90.3764495490641,
  //   "uom": "temperature - fahrenheit",
  //   "accuracy": 48.18649481081602
  // }

  const tempratureData = [...data["data"]];

  //set the y-axis = metric and x-axis = timestamp
  const temprature = tempratureData.map(data => data.metric);
  const time = tempratureData.map(data => new Date(data.timestamp));

  return {
    ...state,
    loadingDrone: false,
    latitude,
    longitude,
    temprature,
    time
  };
};

const handlers = {
  [actions.DRONE_DATA_RECEIVED]: droneDataRecevied
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
