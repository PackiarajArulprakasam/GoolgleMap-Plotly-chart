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

  //get the latest data from the 30 mins data
  const { data: droneData } = data;
  const latestData = droneData.length - 1;
  const { latitude, longitude, metric: temperatureinFahrenheit } = droneData[
    latestData
  ];

  // Sample response from drone API
  // {
  //   "timestamp": 1550548236000,
  //   "metric": 318.25215294082057,
  //   "latitude": 29.447692488381048,
  //   "longitude": -90.3764495490641,
  //   "uom": "temperature - fahrenheit",
  //   "accuracy": 48.18649481081602
  // }

  //set the y-axis = metric and x-axis = timestamp
  const temprature_data = droneData.map(data => data.metric);
  const time_data = droneData.map(data => new Date(data.timestamp));

  return {
    ...state,
    loadingDrone: false,
    latitude,
    longitude,
    temperatureinFahrenheit,
    temprature_data,
    time_data
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
