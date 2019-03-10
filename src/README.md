Create Drone reducer, saga, API to get data
Drone.js (Component)

1.  Redner the MapView component with lat,lan as parms.
2.  While loading, render the liner progress.

Drone.js (Saga)

3.  Once the FETCH_DRONE is dispatched, runs the following in loop for every 3 sec.
4.  Create a watcher for fetch drone.
5.  In the watcher, fetch the drone data.
6.  Create action for Drone reducer.

Drone.js(Reducer)

7.  Once the data is received (DRONE_DATA_RECEIVED)
8.  Extract the temperature, timestamp and create separate arrays
9.  Get the latest co-ordinates
10. Update the store
    Update the saga index to include drone in root reducer
    Add required actions in the action.js

findDrone.js (API)

11. Create the API to fetch the drone date
12. In case of errors, should be notified using React toastify

Create Map and MapView components

Install react-google-maps

Create Map, MapView components to render the google map with live co-ordinates

Map.js

13. This takes the latitude and longitude as parms and pass to Google Map component.
14. Make the default location to a constant co-ordinates (Hutson).
15. Because of developer version, the map looks darker - Dint create API key
    to avoid billing.
16. This component uses the recompose, with Props to initialize and load the Google API.

MapView.js

16. Get the city, weather data by calling the findLocationByLatLng and findWeatherById APIs.
17. Also, receives the temperature data as props.
18. Renders the Map component.

Create Chart and Plot Chart components

install plotly.js, react-plotly.js
Chart.js

1.  Chart relies on the Drone component to get the temperature data.
2.  Doesn't fetch/store the drone data separately.
3.  Subscribe to temperature and timestamp from store.
4.  Render the Plot Chart with the y-axis=temperature and x-axis=timestamp

PlotChart.js
Takes the x and y axis data and render the graph

1. Removed the set Interval from Drone.js and Weather.js and added while loop/3mins delay in respective sagas.
2. Added changes in MapView and Map components to get the city, weather.
3. Added Info Window with city, temperature and weather in Map component.
4. Implemented selectors for the drone data using `reselect`.

Recent changes:
MapView.js

Issue:
The chained network calls were due to the change from componentWillReceiveProps to componentDidUpdate. Should have implemented the shouldComponentUpdate method to avoid
unwanted rendering and execution of componentDidUpdate which implements the ajax calls to get the city and weather data.

Fix made:
Changed the recent implementation of componentWillReceiveProps to componentDidUpdate
and implemented the shouldComponentUpdate to avoid unwanted network calls.
