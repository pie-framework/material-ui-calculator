import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import * as colors from './colors';

const StyledPad = styled('div')(() => ({
  backgroundColor: colors.primary.main,
  '& .MuiIconButton-root': {
    width: '100%'
  }
}));

export const Pad = props => {
  const { label, className, style, value, onClick } = props;

  const handleClick = () => {
    onClick(value);
  };

  return (
    <StyledPad style={style} className={className}>
      <IconButton
        tabIndex="-1"
        onClick={handleClick}
        size="large">
        <div dangerouslySetInnerHTML={{ __html: label }} />
      </IconButton>
    </StyledPad>
  );
};

Pad.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Pad;
