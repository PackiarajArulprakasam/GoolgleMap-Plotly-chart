import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { getDroneData } from "../Selectors/getDroneData";
import { createSelector } from "reselect";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import MapView from "./MapView";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});

const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    margin: "5% 25%"
  }
};

class Drone extends Component {
  componentDidMount() {
    console.log("from drone componentDidMount");
    this.props.onLoad();
  }
  render() {
    const {
      loadingDrone,
      latitude,
      longitude,
      temperatureinFahrenheit
    } = this.props;

    if (loadingDrone) return <LinearProgress />;

    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader title="Live drone tracking" />
        <CardContent>
          <MapView
            latitude={latitude}
            longitude={longitude}
            temperatureinFahrenheit={temperatureinFahrenheit}
          />
          <div id="myDiv" />
        </CardContent>
      </Card>
    );
  }
}

// Using reslect for mapState on top of the field level selectors from getDroneData.js

const mapStateSelector = createSelector(
  getDroneData,
  ({ temperatureinFahrenheit, latitude, longitude, loadingDrone }) => ({
    temperatureinFahrenheit,
    latitude,
    longitude,
    loadingDrone
  })
);

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DRONE
    })
});

export default connect(
  mapStateSelector,
  mapDispatch
)(withStyles(styles)(Drone));
