import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import LinearProgress from '@material-ui/core/LinearProgress';

class TableComponent extends PureComponent {
    render(){
        const {movies, page, moviesLength, isPending, onChangePage} = this.props;

        return(
          <Fragment>
            {isPending && <LinearProgress color="secondary" />}
            <TablePagination
              component="div"
              count={parseInt(moviesLength)}
              rowsPerPage={10}
              rowsPerPageOptions={[]}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={onChangePage}
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Poster</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Year</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map(movie => (
                  <TableRow key={movie.imdbID}>
                    <TableCell align="left">
                      <a href={`https://www.imdb.com/title/${movie.imdbID}/`}>
                        <img 
                          src={movie.Poster === 'N/A' ? './assets/Placeholder.jpg' : movie.Poster} 
                          height="120px" 
                          alt={movie.Title} />
                      </a>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <a href={`https://www.imdb.com/title/${movie.imdbID}/`}>{movie.Title}</a>
                    </TableCell>
                    <TableCell>{movie.Type.charAt(0).toUpperCase()+movie.Type.slice(1)}</TableCell>
                    <TableCell align="right">{movie.Year}</TableCell>
                  </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Fragment>);
    }
}

TableComponent.propTypes = {
    movies: PropTypes.array,
    page: PropTypes.number,
    moviesLength: PropTypes.string,
    onChangePage: PropTypes.func,
    isPending: PropTypes.bool,
};

export default TableComponent;