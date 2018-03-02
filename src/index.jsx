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
      calculator: { expr: '', angleMode: 'rad' }
    }
  }

  onInput = value => {
    const calculator = reduce(this.state.calculator, value);
    log('[onInput] update: ', calculator)
    this.setState({ calculator });
  }

  onAngleModeChange = m => {
    const calculator = { ...this.state.calculator, angleMode: m }
    this.setState({ calculator });
  }

  render() {
    const { calculator } = this.state;
    const { mode } = this.props;
    return (
      <Calculator
        value={calculator}
        onInput={this.onInput}
        onAngleModeChange={this.onAngleModeChange}
        mode={mode}
      />
    );
  }
}

StatefulCalculator.propTypes = {}