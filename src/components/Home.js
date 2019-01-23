import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Emoticon from '@material-ui/icons/InsertEmoticon';
import { withStyles } from '@material-ui/core/styles';

import TableComponent from './partial/TableComponent';

import { API_URL } from '../constants/app';

const initialState = {
  title: '',
  searchResult: [],
  page: 0,
  pending: false,
  resultLength: 0,
  searched: false,
};

const styles = () => ({
  button: {
    marginRight: '2px',
  },
});

class Home extends PureComponent {
  state = initialState;

  handleChange = event => {
    this.setState({
      title: event.target.value,
    });
  };

  handleChangePage = (event, page) => {
    return this.setState({ page }, () => this.onFetchMovies(page + 1));
  };

  onFetchMovies = async page => {
    const { title } = this.state;

    this.setState({
      pending: true,
      searched: true,
    });

    try {
      const url =
        page === 0
          ? `${API_URL}&s=${title}`
          : `${API_URL}&s=${title}&page=${page}`;

      const response = await fetch(url);
      const result = await response.json();

      this.setState({
        searchResult: result.Search,
        pending: false,
        resultLength: result.totalResults,
      });
    } catch (e) {
      this.setState({ pending: false });
      throw new Error();
    }
  };
  clearSearch = () => {
    this.setState(initialState);
  };
  renderTable = () => {
    const { searchResult, page, resultLength, pending } = this.state;

    if (!resultLength || resultLength < 1) return <h2>No search result</h2>;

    return (
      <TableComponent
        movies={searchResult}
        page={page}
        moviesLength={resultLength}
        pending={pending}
        onChangePage={this.handleChangePage}
      />
    );
  };

  render() {
    const { pending, resultLength, searched, title } = this.state;
    const { classes } = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={3}>
          Search results: {resultLength || 0}
          <div>
            <TextField
              id="movie-title"
              fullWidth
              value={title}
              label="Movie title"
              onChange={this.handleChange}
              margin="normal"
            />
          </div>
          <div>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={pending}
              onClick={() => this.onFetchMovies(0)}
            >
              Fetch Movies
            </Button>

            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={this.clearSearch}
            >
              Clear
            </Button>
          </div>
        </Grid>
        <Grid item xs={9}>
          {!searched ? (
            <h3>
              {' '}
              <Emoticon /> Movie search application. Try to find interesting
              movies.
            </h3>
          ) : (
            this.renderTable()
          )}
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
