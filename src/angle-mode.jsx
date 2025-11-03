import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import * as colors from './colors';

const AngleDiv = styled('div')(({ theme, active }) => ({
  cursor: 'pointer',
  fontFamily: theme.typography.fontFamily,
  textTransform: 'uppercase',
  color: active ? colors.primary.main : colors.disabled
}));

const Angle = ({ onChange, type, angleMode }) => (
  <AngleDiv
    onClick={() => onChange(type)}
    active={angleMode === type}
  >
    {type}
  </AngleDiv>
);

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
