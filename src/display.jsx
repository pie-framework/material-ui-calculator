import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import AngleMode from './angle-mode';
import * as colors from './colors';

const StyledDisplay = styled('div')(({ theme, focused, error }) => ({
  display: 'flex',
  backgroundColor: colors.primary.light,
  padding: theme.spacing(2),
  transition: 'background-color 200ms linear',
  textAlign: 'right',
  position: 'relative',
  boxShadow: '0 3px 3px rgba(0, 0, 0, 0.1)',
  borderBottom: focused ? 'solid 1px rgba(0,0,0,1.0)' : 'solid 1px rgba(0,0,0,0.0)',
  '& .angle-mode': {
    alignSelf: 'center'
  },
  '& .expr': {
    flex: 1,
    paddingLeft: theme.spacing(1)
  }
}));

export class Display extends React.Component {
  static propTypes = {
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
      angleMode,
      onAngleModeChange,
      children,
      focused,
      error,
      showAngleMode
    } = this.props;

    return (
      <StyledDisplay focused={focused} error={error}>
        {showAngleMode && (
          <AngleMode
            className="angle-mode"
            angleMode={angleMode}
            onChange={onAngleModeChange}
          />
        )}
        <div className="expr">{children} </div>
      </StyledDisplay>
    );
  }
}

export default Display;
