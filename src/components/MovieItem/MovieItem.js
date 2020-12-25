import React, { Component } from "react";
import "./MovieItem.css";

import { connect } from "react-redux";

class MovieItem extends Component {
  render() {
    return (
      <div className="movie">
        <img src={this.props.movie.poster} alt={this.props.movie.title}></img>
        <div className="movie-info">
          <h3>{this.props.movie.title}</h3>
        </div>
        <div className="movie-over">
          <h2> Overview:</h2>
          <p>{this.props.reduxState.details.description}</p>

          <button onClick={() => this.props.getDetails(this.props.movie.id)}>
            More Details
          </button>
        </div>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});
export default connect(mapReduxStateToProps)(MovieItem);
