import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import AngleMode from './angle-mode';
import * as colors from './colors';

export class Display extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    angleMode: PropTypes.oneOf(['deg', 'rad']),
    onAngleModeChange: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    focused: PropTypes.bool,
    error: PropTypes.object,
    showAngleMode: PropTypes.bool
  };

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

    const names = classNames(
      classes.display,
      focused && classes.focused,
      error && classes.error
    );
    return (
      <div className={names}>
        {showAngleMode && (
          <AngleMode
            className={classes.angleMode}
            angleMode={angleMode}
            onChange={onAngleModeChange}
          />
        )}
        <div className={classes.expr}>{children} </div>
      </div>
    );
  }
}

const styles = theme => ({
  angleMode: {
    alignSelf: 'center'
  },
  display: {
    display: 'flex',
    backgroundColor: colors.primary.light,
    padding: theme.spacing.unit * 2,
    transition: 'background-color 200ms linear',
    textAlign: 'right',
    position: 'relative',
    boxShadow: '0 3px 3px rgba(0, 0, 0, 0.1)',
    borderBottom: 'solid 1px rgba(0,0,0,0.0)'
  },
  focused: {
    borderBottom: 'solid 1px rgba(0,0,0,1.0)'
  },
  error: {},
  expr: {
    flex: 1,
    paddingLeft: theme.spacing.unit
  }
});

export default withStyles(styles)(Display);
