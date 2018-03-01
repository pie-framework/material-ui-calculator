import React from 'react';
import PropTypes from 'prop-types';
import Calculator from './calculator';
import reduce from '@pie-labs/calculator-reducer';
import debug from 'debug';

const log = debug('material-ui-calculator');

export default class StatefulCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      calculator: { value: '' }
    }
  }

  onInput = value => {
    const calculator = reduce(this.state.calculator, value);
    log('[onInput] update: ', calculator)
    this.setState({ calculator });
  }

  render() {
    const { calculator } = this.state;
    return (
      <Calculator
        value={calculator}
        onInput={this.onInput}
      />
    );
  }
}

StatefulCalculator.propTypes = {}