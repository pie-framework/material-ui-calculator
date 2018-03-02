import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import grey from 'material-ui/colors/grey';

const Angle = withStyles(theme => ({
  mode: {
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
    textTransform: 'uppercase',
    color: grey[500]
  },
  active: {
    color: theme.palette.primary[500]
  }
}))(({ classes, onChange, type, angleMode }) => (
  <div
    onClick={() => onChange(type)}
    className={classNames(classes.mode, angleMode === type && classes.active)}>
    {type}
  </div>
));


const AngleMode = ({ angleMode, onChange }) => (
  <div>
    <Angle type="deg" onChange={onChange} angleMode={angleMode} />
    <Angle type="rad" onChange={onChange} angleMode={angleMode} />
  </div>
);

export default AngleMode;