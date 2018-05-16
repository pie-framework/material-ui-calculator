import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import * as colors from './colors';

const Angle = withStyles(theme => ({
  mode: {
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
    textTransform: 'uppercase',
    color: colors.disabled
  },
  active: {
    color: colors.primary.main
  }
}))(({ classes, onChange, type, angleMode }) => (
  <div
    onClick={() => onChange(type)}
    className={classNames(classes.mode, angleMode === type && classes.active)}
  >
    {type}
  </div>
));

const AngleMode = ({ className, angleMode, onChange }) => (
  <div className={className}>
    <Angle type="deg" onChange={onChange} angleMode={angleMode} />
    <Angle type="rad" onChange={onChange} angleMode={angleMode} />
  </div>
);

AngleMode.propTypes = {
  className: PropTypes.string,
  angleMode: PropTypes.oneOf(['deg', 'rad']),
  onChange: PropTypes.func.isRequired
};

export default AngleMode;
