import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    button: {
      marginRight: '2px',
    },
});

class Controls extends PureComponent {
    render(){
        const { 
            classes, 
            title, 
            year,
            isPending, 
            onFieldChange, 
            onDataFetch,
            onClearControls,
        } = this.props;

        return(
          <Fragment>
            <div>
              <TextField
              id="movie-title"
              fullWidth
              value={title}
              label="Movie title"
              onChange={onFieldChange('title')}
              margin="normal"
            />
            </div>
            <div>
              <TextField
                id="movie-year"
                fullWidth
                value={year}
                label="Movie year"
                onChange={onFieldChange('year')}
                margin="normal"
            />
            </div>
            <div>
              <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={isPending}
              onClick={onDataFetch}
            >
              Fetch Movies
              </Button>

              <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={onClearControls}
            >
              Clear
              </Button>
            </div>
          </Fragment>
        );
    }
}

Controls.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    year: PropTypes.string,
    isPending: PropTypes.bool,
    onFieldChange: PropTypes.func,
    onDataFetch: PropTypes.func,
    onClearControls: PropTypes.func,
};

export default withStyles(styles)(Controls);