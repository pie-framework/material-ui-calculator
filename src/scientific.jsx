import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Pad from './pad';
import classNames from 'classnames';
import { AngleInput, UnaryInput, Inputs, LogInput } from './symbols';
import * as colors from './colors';

const items = [
  '(',
  ')',

  Inputs.PI,
  LogInput.LOG,
  AngleInput.SIN,
  AngleInput.COS,
  AngleInput.TAN,
  LogInput.NATURAL_LOG,
  AngleInput.ASIN,
  AngleInput.ACOS,
  AngleInput.ATAN,
  { label: 'n!', value: '!' },
  { label: '√', value: UnaryInput.SQUARE_ROOT },
  { label: 'x²', value: UnaryInput.SQUARE },
  { label: 'x³', value: UnaryInput.CUBE },
  { label: 'x<sup>y</sup>', value: '^' },
  Inputs.FRACTION,
  Inputs.EXPONENT,
  UnaryInput.ABS
];

export class Scientific extends React.Component {
  static propTypes = {
    onInput: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    activeMode: PropTypes.oneOf(['deg', 'rad'])
  };

  render() {
    const { onInput, classes, activeMode } = this.props;
    return (
      <div className={classes.scientific}>
        {items.map((i, index) => {
          const props = typeof i === 'string' ? { label: i, value: i } : i;
          const active = props.label === activeMode;
          return (
            <Pad
              theme={{
                root: classNames(
                  classes.pad,
                  i && classes[i.kind],
                  active && classes.active
                )
              }}
              active={props.label === activeMode}
              onClick={onInput}
              key={index}
              {...props}
            />
          );
        })}
      </div>
    );
  }
}

Scientific.propTypes = {};

const styles = () => ({
  scientific: {
    paddingLeft: '1px',
    display: 'grid',
    gridGap: '1px',
    flex: 0.5,
    gridTemplateColumns: 'repeat(4, 1fr)'
  },
  pad: {
    backgroundColor: colors.secondary.light
  }
});

export default withStyles(styles)(Scientific);
