import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import AddMovie from "../AddMovie/AddMovie";
import Details from "../Details/Details";
import MovieList from "../MovieList/MovieList";
import Header from "../Header/Header";

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <div>
            <Link to="/add-movie" replace>
              Add Movie
            </Link>
          </div>
          <Route exact path="/" component={MovieList} />
          <Route exact path="/details" component={Details} />
          <Route exact path="/add-movie" component={AddMovie} />
        </Router>
      </div>
    );
  }
}

export default App;
