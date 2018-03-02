import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import classNames from 'classnames';
import AngleMode from './angle-mode';

export class Display extends React.Component {

  render() {
    const { classes, value, angleMode, onAngleModeChange } = this.props;
    return (
      <div className={classes.display}>
        <AngleMode angleMode={angleMode} onChange={onAngleModeChange} />
        <div className={classes.expr}>
          <Typography type="display1">{value || '0'}</Typography>
        </div>
      </div>
    );
  }
}

Display.propTypes = {}

const styles = theme => ({
  display: {
    display: 'flex',
    backgroundColor: theme.palette.primary[50],
    padding: theme.spacing.unit * 2,
    textAlign: 'right',
    zIndex: 1,
    position: 'relative',
    boxShadow: '0 3px 3px rgba(0, 0, 0, 0.1)'
  },
  expr: {
    flex: 1
  }
});

export default withStyles(styles)(Display);