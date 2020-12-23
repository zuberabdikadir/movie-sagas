import React, { Component } from "react";
import { connect } from "react-redux";

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
    return (
      <>
        <h3 component="div">MovieList</h3>
        {this.props.reduxState.movies.map((film, index) => {
          return (
            <div key={index}>
              <h4>{film.title}</h4>
              <img
                src={film.poster}
                alt="Poster"
                onClick={() => this.getDetails(film.id)}
              ></img>
            </div>
          );
        })}
      </>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});
export default connect(mapReduxStateToProps)(MovieList);
