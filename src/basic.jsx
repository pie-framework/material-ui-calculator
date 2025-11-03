import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Pad from './pad';

const items = [
  { label: 'C', value: 'clear' },
  { label: '±', value: 'plus-minus' },
  '%',
  { label: '&#247;', value: '/', kind: 'operator' },
  '7',
  '8',
  '9',
  { label: '&#215;', value: '*', kind: 'operator' },
  '4',
  '5',
  '6',
  { label: '-', value: '-', kind: 'operator' },
  '1',
  '2',
  '3',
  { label: '+', value: '+', kind: 'operator' },
  '0',
  '.',
  { label: '=', value: 'equals', kind: 'operator' }
];

const StyledBasic = styled('div')(({ theme }) => ({
  flex: 0.5,
  gridGap: '1px',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  '& .operator': {
    backgroundColor: theme.palette.secondary.light
  }
}));

export class Basic extends React.Component {
  static propTypes = {
    onInput: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  render() {
    const { onInput, className } = this.props;

    return (
      <StyledBasic className={className}>
        {items.map((i, index) => {
          const props = typeof i === 'string' ? { label: i, value: i } : i;
          const positionStyle =
            props.label === '0'
              ? {
                  gridColumn: '1/3'
                }
              : {};

          return (
            <Pad
              key={index}
              style={positionStyle}
              className={i.kind === 'operator' ? 'operator' : ''}
              {...props}
              onClick={onInput}
            />
          );
        })}
      </StyledBasic>
    );
  }
}

export default Basic;
