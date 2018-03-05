import React from 'react';
import PropTypes from 'prop-types';
import Calculator from './calculator';
import mathjs from 'mathjs';
import debug from 'debug';

const log = debug('@pie-labs:material-ui-calculator');

const convert = (raw) => {
  log('[convert] raw: ', raw);
  return raw
    .replace(/π/g, 'pi')
    .replace(/√/g, 'sqrt')
    .replace(/÷/g, '/')
    .replace(/×/g, '*');
}

const evaluate = (expr) => {
  try {
    return mathjs.eval(expr);
  } catch (e) {
    log('error: ', e.message);
    return undefined;
  }
}

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expr: ''
    }
  }

  onEvaluate = (expression) => {
    log('[onEvaluate] expression:', expression);
    const converted = convert(expression);
    log('[onEvaluate] converted:', converted);
    const result = evaluate(converted).toString();
    this.setState({
      expr: result
    });
  }

  render() {
    const { expr } = this.state;

    return (
      <Calculator
        mode={'scientific'}
        expr={expr}
        onEvaluate={this.onEvaluate} />
    );
  }
}

Main.propTypes = {
  mode: PropTypes.oneOf(['basic', 'scientific']).isRequired
}