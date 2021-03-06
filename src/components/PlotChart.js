import React from "react";
import Plot from "react-plotly.js";

class PlotChart extends React.Component {
  render() {
    const { temprature_data, time_data } = this.props;

    const chartData = {
      type: "scatter",
      mode: "lines",
      name: "Temprature",
      x: time_data,
      y: temprature_data,
      line: { color: "#17BECF" },
      marker: { color: "blue" }
    };

    const data = [chartData];
    return (
      <Plot
        data={data}
        layout={{
          width: 600,
          height: 400
        }}
      />
    );
  }
}

export default PlotChart;
