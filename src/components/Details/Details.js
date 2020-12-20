import React, { Component } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class Details extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_GENRES" });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        {JSON.stringify(this.props.reduxState.details)}
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={this.props.reduxState.details.poster}
              alt={this.props.reduxState.details.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.reduxState.details.title}
              </Typography>
              <Typography component="p">
                {this.props.reduxState.details.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button onClick={(event) => this.props.history.push("/")}>
              Back to MovieList
            </Button>
          </CardActions>
        </Card>
      </>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});
export default withStyles(styles)(connect(mapReduxStateToProps)(Details));
