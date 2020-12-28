import React, { Component } from "react";
import { connect } from "react-redux";
import MovieItem from "../MovieItem/MovieItem";
import "./MovieList.css";
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

  render() {
    return (
      <div>
        <h3>MovieList</h3>
        <div className="movie-container">
          {this.props.reduxState.movies.map((movie, index) => {
            return (
              <MovieItem
                key={index}
                movie={movie}
                getDetails={this.getDetails}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});
export default connect(mapReduxStateToProps)(MovieList);
