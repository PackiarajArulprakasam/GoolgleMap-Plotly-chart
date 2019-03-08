import React, { Component } from "react";
import { connect } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import PlotChart from "./PlotChart";

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

class Chart extends Component {
  render() {
    const { loadingDrone, temprature_data, time_data } = this.props;

    if (loadingDrone) return <LinearProgress />;

    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader title="Temprature (F) around houston in last 30 mins" />
        <CardContent>
          <PlotChart temprature_data={temprature_data} time_data={time_data} />
        </CardContent>
      </Card>
    );
  }
}

const mapState = state => {
  const { temprature_data, time_data, loadingDrone } = state.drone;
  return {
    temprature_data,
    time_data,
    loadingDrone
  };
};

export default connect(mapState)(withStyles(styles)(Chart));
