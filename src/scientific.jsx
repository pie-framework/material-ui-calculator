import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Pad from './pad';

const items = [
  '(',
  ')',
  'ln',
  'e',
  { label: 'x²', value: 'square' },
  { label: 'x³', value: 'cube' },
  'log',
  'sin',
  'tan',
  'cos',
  { label: '√', value: 'sqrt' },
  'π',
  '∘',
  'rad',
]

export class Scientific extends React.Component {

  render() {
    const { onInput, classes } = this.props;
    return (
      <div className={classes.scientific}>
        {items.map((i, index) => {
          const props = typeof i === 'string' ? { label: i, value: i } : i;
          return (
            <Pad
              theme={{
                root: classes.pad
              }}
              onClick={onInput}
              key={index}
              {...props} />
          );
        })}
      </div>
    );
  }
}

Scientific.propTypes = {}

const styles = theme => ({
  scientific: {
    display: 'grid',
    gridGap: '1px',
    flex: 0.5,
    gridTemplateColumns: 'repeat(4, 1fr)'
  },
  pad: {
    backgroundColor: theme.palette.secondary[300]
  }
});

export default withStyles(styles)(Scientific);