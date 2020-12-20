import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import AddMovie from "../AddMovie/AddMovie";
import Details from "../Details/Details";
import MovieList from "../MovieList/MovieList";

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <h1>Movies!</h1>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/details">Details</Link>
              </li>
              <li>
                <Link to="/add-movie">Add Movie</Link>
              </li>
            </ul>
          </div>
          <Route exact path="/" component={MovieList} />
          <Route path="/details" component={Details} />
          <Route path="/add-movie" component={AddMovie} />
        </Router>
      </div>
    );
  }
}

export default App;
