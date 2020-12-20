import React, { Component } from "react";
import { connect } from "react-redux";
import MovieItem from "../MovieItem/MovieItem.js";

import { GridList, ListSubheader } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "150",
    height: "150",
  },
});

class MovieList extends Component {
  componentDidMount() {
    console.log("will fetch");
    this.props.dispatch({ type: "FETCH_MOVIES" });
    console.log("post fetch");
  }

  getDetails = (id) => {
    this.props.dispatch({ type: "GET_DETAILS", payload: id });
    this.props.history.push("/details/");
  };

  addFavorite = (film) => {
    this.props.dispatch({ type: "SET_FAVORITE", payload: film });
  };

  render() {
    const classes = this.props;

    return (
      <div className={classes.root}>
        <ListSubheader component="div">MovieList</ListSubheader>
        <GridList cellHeight={180} className={classes.gridList}>
          {this.props.reduxState.movies.map((film, index) => (
            <MovieItem movie={film} getDetails={this.getDetails} />
          ))}
        </GridList>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});
export default withStyles(styles)(connect(mapReduxStateToProps)(MovieList));
