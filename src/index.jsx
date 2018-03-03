import React from 'react';
import PropTypes from 'prop-types';
import Calculator from './calculator';
import reduce, { Inputs } from '@pie-labs/calculator-reducer';
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

  onEnter = () => {
    log('[onEnter]');
    const calculator = reduce(this.state.calculator, Inputs.EQUALS);
    log('[onEnter] calculator: ', calculator);
    this.setState({ calculator });
  }

  onChange = e => {
    const calculator = { ...this.state.calculator, expr: e.target.value };
    this.setState({ calculator });
  }

  render() {
    const { calculator } = this.state;
    const { mode } = this.props;

    log('expr: ', calculator.expr);
    return (
      <Calculator
        value={calculator}
        onInput={this.onInput}
        onAngleModeChange={this.onAngleModeChange}
        onChange={this.onChange}
        onEnter={this.onEnter}
        mode={mode}
      />
    );
  }
}

StatefulCalculator.propTypes = {}