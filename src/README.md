===============================================================================
Create Drone reducer, saga, API to get data
===============================================================================
Drone.js (Component)

1.  Redner the MapView component with lat,lan as parms.
2.  While loading, render the liner progress.

Drone.js (Saga)

3.  Once the FETCH_DRONE is despatched, runs the following in loop for every 3 sec.
4.  Create a watcher for fecth drone.
5.  In the watcher, fecth the drone data.
6.  Create action for Drone reducer.

Drone.js(Reducer)

7.  Once the data is received (DRONE_DATA_RECEIVED)
8.  Extract the temprature, timestamp and create seperate arrays
9.  Get the latest co-ordinates
10. Update the store
    Update the saga index to include drone in root reducer
    Add required actions in the action.js

findDrone.js (API)

11. Create the API to fecth the drone date
12. In case of errors, should be notified using React tostify

================================================================================
Create Map and MapView components
================================================================================
Install react-google-maps

Create Map, MapView components to render the google map with live co-ordinates

Map.js

13. This takes the latitue and longitude as parms and pass to GoogleMap component.
14. Make the default location to a constant co-ordinates (Hutson).
15. Becasue of developer version, the map looks darker - Dint create API key
    to avoid billing.
16. This component uses the recompose, withProps to intialize and load the Google API.

MapView.js

16. Get the city, weather data by calling the findLocationByLatLng and findWeatherById APIs.
17. Also, receives the temprature data as props.
18. Renders the Map component.

================================================================================
Create Chart and PlotChart components
================================================================================
install plotly.js, react-plotly.js
Chart.js

1.  Chart relies on the Drone component to get the temprature data.
2.  Doesn't fetch/store the drone data seperately.
3.  Subscribe to temprature and timestamp from store.
4.  Render the PlotChart with the y-axis=temprature and x-axis=timestamp

PlotChart.js
Takes the x and y axis data and render the graph

=================================================================================

1. Removed the setInterval from Drone.js and Weather.js and addded while loop/3mins delay in respective sagas.
2. Added changes in MapView and Map components to get the city, weather.
3. Added InfoWindow with city, temprature and weather in Map component.
4. Implemented selectors for the drone data using `reselect`.
