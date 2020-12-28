import React, { Component } from "react";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  dense: {
    marginTop: 29,
  },
  menu: {
    width: 400,
  },
});

class AddMovie extends Component {
  state = {
    title: "",
    poster: "",
    description: "",
    genre_id: "",
  };

  componentDidMount() {
    this.props.dispatch({ type: "FETCH_GENRES" });
  }

  saveMovie = () => {
    this.props.dispatch({ type: "ADD_MOVIE", payload: this.state });
    this.setState({
      title: "",
      poster: "",
      description: "",
      genre_id: "",
    });
    this.props.history.push("/");
  };
  handleChange = (event, propertyName) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };

  cancel = () => {
    this.props.history.push("/");
  };

  render() {
    // const { classes } = this.props;
    return (
      <div>
        <form className="movie-input">
          <TextField
            label="Title"
            variant="outlined"
            type="text"
            onChange={(event) => this.handleChange(event, "title")}
          />
          <br />
          <TextField
            variant="outlined"
            className="movie-input"
            type="text"
            label="Url"
            onChange={(event) => this.handleChange(event, "poster")}
          />
          <br />
          <TextField
            variant="outlined"
            type="text"
            label="Description"
            onChange={(event) => this.handleChange(event, "description")}
          />
          <br />
          <FormControl>
            <InputLabel>Genre</InputLabel>
            <Select
              autoWidth="true"
              value={this.state.genre_id}
              onChange={(event) => this.handleChange(event, "genre_id")}
            >
              {this.props.reduxState.genres.map((genre, i) => (
                <MenuItem key={i} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <div className="submit-form-btns">
            <Button
              variant="contained"
              color="primary"
              onClick={this.saveMovie}
            >
              add movie
            </Button>
            <Button variant="contained" color="primary" onClick={this.cancel}>
              cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});
export default connect(mapReduxStateToProps)(withStyles(styles)(AddMovie));
