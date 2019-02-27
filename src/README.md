Dear Jesse Wolgamott,

It was a wonderful lerning on the GooleAPI and Plotly charts along with a
refreshment on Redux sagas. Below are my notes for the changes made to the
original code base.

Looking forward to talk to you soon.

Thanks, Packiarj

===============================================================================
Create Drone reducer, saga, API to get data
===============================================================================
Drone.js (Component)

1.  Subscribe to store for every 3 minutes to refresh the drone location.
2.  Redner the MapView component with lat,lan as parms.
3.  While loading, render the liner progress.
    Drone.js (Saga)
4.  Create a watcher for fecth drone
5.  In the watcher, fecth the drone data
6.  Create action for Drone reducer
    Drone.js(Reducer)
7.  Once the data is received (DRONE_DATA_RECEIVED)
8.  Extract the temprature, timestamp and create seperate arrays
9.  Get the latest co-ordinates
10. Update the store
    Update the saga index to include drone in root reducer
    Add required actions in the action.js

findDrone.js (API)
Create the API to fecth the drone date
In case of errors, should be notified using React tostify
================================================================================
Create Map, MapView components to render the google map with live co-ordinates
================================================================================
Install react-google-maps
Map.js
This takes the latitue and longitude as parms and pass to GoogleMap component
Make the default location to a constant co-ordinates (Hutson)
Becasue of developer version, the map looks darker - Dint create API key
to avoid billing

================================================================================
Create Chart and PlotChart components
================================================================================
install plotly.js, react-plotly.js
Chart.js

1.  Chart relies on the Drone component to get the temprature data.
2.  Doesn't fetch and store the drone data seperately.
3.  Subscribe to temprature and timestamp from store
4.  Render the PlotChar with the temprature and timestamp

PlotChart.js
Takes the x and y axis data and render the graph

Minor correction on the welcome note:
"We have an API documented below that return the last 30 seconds of metrics"
I believe the intention was to say 30 "minutes" however it says 30 seconds.
=================================================================================

# 2/26:

1. Removed the setInterval from Drone.js and Weather.js and addded while loop/3mins delay in respective sagas.
2. Added changes in MapView and Map components to get the city, weather.
3. Added InfoWindow with city, temprature and weather in Map component.

# 2/27:

Plan to implement selectors for the drone data using `reselect`.
