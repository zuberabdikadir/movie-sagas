import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.js";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put, all } from "redux-saga/effects";
import axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
  yield all([
    yield takeEvery("FETCH_MOVIES", fetchMovie),
    yield takeEvery("GET_DETAILS", getDetails),
    yield takeEvery("FETCH_GENRES", getGenres),
    yield takeEvery("ADD_MOVIE", addMovie),
  ]);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// GET Saga
function* fetchMovie() {
  console.log("index fetch movie");
  try {
    const response = yield axios.get("/api/movie");
    yield put({ type: "SET_MOVIES", payload: response.data });
  } catch (error) {
    console.log("error getting movie posters", error);
  }
}
function* getDetails(action) {
  console.log("index fetch details");
  try {
    const response = yield axios.get("/api/movie/" + action.payload);
    yield put({ type: "SET_DETAILS", payload: response.data });
  } catch (error) {
    console.log("error getting movie description", error);
  }
}
function* getGenres() {
  try {
    const response = yield axios.get("/api/genre");
    yield put({ type: "SET_GENRES", payload: response.data });
  } catch (error) {
    console.log("error getting genre description", error);
  }
}
function* addMovie(action) {
  console.log("Adding movie");
  try {
    yield axios.post("/api/movie/", action.payload);
    yield fetchMovie();
  } catch (error) {
    console.log("error adding movie", error);
  }
}

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES":
      return action.payload;
    default:
      return state;
  }
};
// stores the details
const details = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    details,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
