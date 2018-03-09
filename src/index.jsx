import React from 'react';
import PropTypes from 'prop-types';
import Calculator from './calculator';
import debug from 'debug';
import { calculate, AngleMode } from '@pie-framework/expression-parser';


const log = debug('@pie-framework:material-ui-calculator');

const evaluate = (expr, angleMode) => {
  try {
    const angleMode = angleMode === 'deg' ? AngleMode.DEGREES : AngleMode.RADIANS;
    return calculate(expr, { angleMode });
  } catch (e) {
    log('error: ', e.message);
    return { value: '', error: e };
  }
}

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expr: '',
      angleMode: 'rad'
    }
  }

  onEvaluate = (expression) => {
    const result = evaluate(expression, 'rad');

    if (this.props.onEvaluationComplete && !result.error) {
      this.props.onEvaluationComplete(expression, result.value);
    }

    this.setState({
      expr: (result.value || expression).toString(),
      error: result.error
    });
  }

  onAngleModeChange = angleMode => {
    this.setState({ angleMode });
  }

  onClearError = () => {
    if (this.state.error) {
      this.setState({ error: undefined });
    }
  }

  render() {
    const { mode } = this.props;
    const { expr, angleMode, error } = this.state;
    return (
      <Calculator
        mode={mode}
        angleMode={angleMode}
        onAngleModeChange={this.onAngleModeChange}
        expr={expr}
        error={error}
        onClearError={this.onClearError}
        onEvaluate={this.onEvaluate} />
    );
  }
}

Main.propTypes = {
  mode: PropTypes.oneOf(['basic', 'scientific']).isRequired
}