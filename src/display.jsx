import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

export class Display extends React.Component {

  render() {
    const { classes, value } = this.props;
    return (
      <div className={classes.display}>
        <Typography type="display1">{value || '0'}</Typography>
      </div>
    );
  }
}

Display.propTypes = {}

const styles = theme => ({
  display: {
    backgroundColor: theme.palette.primary[50],
    padding: theme.spacing.unit * 2,
    textAlign: 'right',
    zIndex: 1,
    position: 'relative',
    boxShadow: '0 3px 3px rgba(0, 0, 0, 0.1)'
  }
});

export default withStyles(styles)(Display);