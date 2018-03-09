import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import classNames from 'classnames';
import AngleMode from './angle-mode';
import SelectableInput from './selectable-input';

export class Display extends React.Component {

  render() {
    const {
      classes,
      angleMode,
      onAngleModeChange,
      children,
      focused,
      error,
      showAngleMode
    } = this.props;

    const names = classNames(classes.display, focused && classes.focused, error && classes.error);
    return (
      <div className={names}>
        {showAngleMode && <AngleMode
          className={classes.angleMode}
          angleMode={angleMode}
          onChange={onAngleModeChange} />}
        <div className={classes.expr}>{children} </div>
      </div>
    );
  }
}

Display.propTypes = {}

const styles = theme => ({
  angleMode: {
    alignSelf: 'center'
  },
  display: {
    display: 'flex',
    backgroundColor: theme.palette.primary[50],
    padding: theme.spacing.unit * 2,
    textAlign: 'right',
    zIndex: 1,
    position: 'relative',
    boxShadow: '0 3px 3px rgba(0, 0, 0, 0.1)',
    borderBottom: 'solid 1px rgba(0,0,0,0.0)'
  },
  focused: {
    backgroundColor: theme.palette.primary[50],
    borderBottom: 'solid 1px rgba(0,0,0,1.0)'
  },
  error: {
  },
  expr: {
    flex: 1,
    paddingLeft: theme.spacing.unit
  }
});

export default withStyles(styles)(Display);