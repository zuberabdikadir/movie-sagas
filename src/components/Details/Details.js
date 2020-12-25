import React, { Component } from "react";
import { connect } from "react-redux";

class Details extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_GENRES" });
  }

  render() {
    return (
      <div>
        {/* {JSON.stringify(this.props.reduxState.details)} */}
        <img
          src={this.props.reduxState.details.poster}
          alt={this.props.reduxState.details.title}
        />
        <h2>{this.props.reduxState.details.title}</h2>
        <p>{this.props.reduxState.details.description}</p>
        <p>{this.props.reduxState.details.name}</p>
        <button onClick={() => this.props.history.push("/")}>
          Back to MovieList
        </button>
      </div>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});
export default connect(mapReduxStateToProps)(Details);
