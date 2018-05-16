import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import * as colors from './colors';

export const Pad = props => {
  const { label, classes, theme, style, value, onClick } = props;

  const names = classNames(classes.pad, theme && theme.root);

  const handleClick = () => {
    onClick(value);
  };

  return (
    <div style={style} className={names}>
      <IconButton
        tabIndex="-1"
        className={classes.button}
        onClick={handleClick}
      >
        <div dangerouslySetInnerHTML={{ __html: label }} />
      </IconButton>
    </div>
  );
};

Pad.propTypes = {
  label: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(() => {
  return {
    pad: {
      backgroundColor: colors.primary.main
    },
    button: {
      width: '100%'
    }
  };
})(Pad);
