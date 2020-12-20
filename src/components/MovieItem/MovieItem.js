import React, { Component } from "react";

import { connect } from "react-redux";
import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
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

class MovieItem extends Component {
  state = {
    fav: false,
  };

  addFavorite = (index) => {
    this.setState({ fav: !this.state.fav });
  };

  render() {
    return (
      <GridListTile>
        <img
          src={this.props.movie.poster}
          alt={this.props.movie.title}
          onClick={() => this.getDetails(this.props.movie.id)}
        />
        <GridListTileBar
          title={this.props.movie.title}
          actionIcon={
            <IconButton
              aria-label={`add ${this.props.movie.title} to favorites`}
              variant="contained"
              onClick={() => this.addFavorite(this.props.movie.id)}
            ></IconButton>
          }
        />
      </GridListTile>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});
export default withStyles(styles)(connect(mapReduxStateToProps)(MovieItem));
