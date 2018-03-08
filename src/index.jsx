import React from 'react';
import PropTypes from 'prop-types';
import Calculator from './calculator';
import debug from 'debug';
import { calculate, AngleMode } from '@pie-framework/expression-parser';


const log = debug('@pie-framework:material-ui-calculator');

const evaluate = (expr, angleMode) => {
  try {
    const angleMode = angleMode === 'deg' ? AngleMode.DEGREES : AngleMode.RADIANS;
    const result = calculate(expr, { angleMode });
    log('result: ', result);
    return result.value.toString();
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
    const result = evaluate(expression, 'rad');
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