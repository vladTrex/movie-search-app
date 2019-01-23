import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Emoticon from '@material-ui/icons/InsertEmoticon';

import TableComponent from './partial/TableComponent';
import Controls from './partial/Controls';
import { API_URL } from '../constants/app';

const initialState = {
  title: '',
  searchResult: [],
  page: 0,
  isPending: false,
  resultLength: 0,
  searched: false,
};

class Home extends PureComponent {
  state = initialState;

  handleTitleChange = event => {
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
      isPending: true,
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
        isPending: false,
        resultLength: result.totalResults,
      });
    } catch (e) {
      this.setState({ isPending: false });
      throw new Error();
    }
  };
  clearSearch = () => {
    this.setState(initialState);
  };
  renderTable = () => {
    const { searchResult, page, resultLength, isPending } = this.state;

    if (!resultLength || resultLength < 1) return <h2>No search result</h2>;

    return (
      <TableComponent
        movies={searchResult}
        page={page}
        moviesLength={resultLength}
        isPending={isPending}
        onChangePage={this.handleChangePage}
      />
    );
  };

  render() {
    const { isPending, resultLength, searched, title } = this.state;
    
    return (
      <Grid container spacing={24}>
        <Grid item xs={3}>
          Search results: {resultLength || 0}
          <Controls 
            onTitleChange={this.handleTitleChange}
            onDataFetch={() => this.onFetchMovies(0)}
            onClearControls={this.clearSearch}
            title={title} 
            isPending={isPending} 
            />
        </Grid>
        <Grid item xs={9}>
          {!searched ? (
            <h3>
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

export default Home;
