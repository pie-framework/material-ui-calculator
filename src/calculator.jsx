import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import SelectableInput from './selectable-input';
import Scientific from './scientific';
import { insertAt } from './utils';
import { handleInput } from './math-input';
import { withStyles } from 'material-ui/styles';
import Basic from './basic';
import Display from './display';
import classNames from 'classnames';

export { SelectableInput }

const log = debug('@pie-framework:material-ui-calculator');

export class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expr: props.expr,
      selectionStart: 0,
      selectionEnd: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const { expr, error } = nextProps;
    log('[componentWilReceiveProps] expr: ', expr, this.state.expr);

    log('error: ', error, this.props.error);
    if (error !== this.props.error) {
      return;
    }

    if (expr !== this.state.expr) {
      this.setState({
        expr,
        selectionStart: expr.length,
        selectionEnd: expr.length
      });
    }
  }

  onChange = e => {
    this.props.onClearError();
    this.setState({
      expr: e.target.value,
      selectionStart: e.target.selectionStart,
      selectionEnd: e.target.selectionEnd,
      superscript: e.target.superscript
    });
  }

  onSelectionChange = update => {
    this.setState({
      selectionStart: update.selectionStart,
      selectionEnd: update.selectionEnd,
    });
  }

  onInput = value => {
    log('[onInput]: ', value);
    const { expr, selectionStart, selectionEnd, superscript } = this.state;

    if (value === 'equals') {
      const { onEvaluate } = this.props;
      onEvaluate(expr);
      this.input.focus();
      return;
    }

    if (value === 'clear') {
      this.setState({ expr: '', selectionStart: 0, selectionEnd: 0 });
      this.input.focus();
      return;
    }

    if (value === 'plus-minus') {
      const update = expr.indexOf('-') === 0 ? expr.substring(1) : `-${expr}`;
      const added = update.length > expr.length;
      const selectionStart = this.state.selectionStart + (added ? 1 : -1);
      const selectionEnd = this.state.selectionEnd + (added ? 1 : -1);
      this.setState({ expr: update, selectionStart, selectionEnd });
      this.input.focus();
      return;
    }

    const result = handleInput(value, expr, selectionStart, selectionEnd, superscript);

    if (result) {
      if (result.passthrough) {
        this.setState({
          expr: insertAt(expr, { start: selectionStart, end: selectionEnd }, value),
          selectionStart: selectionStart + value.length,
          selectionEnd: selectionEnd + value.length,
          superscript
        });
      } else {
        this.setState({
          expr: result.value,
          selectionStart: result.selectionStart,
          selectionEnd: result.selectionEnd,
          superscript: result.superscript
        });
      }
    }
    this.input.focus();
  }

  onFocus = () => {
    this.setState({ focused: true });
  }

  onBlur = () => {
    this.setState({ focused: false });
  }

  onKeyDown = e => {

    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' ||
      (e.key === 'a' && e.metaKey) || e.key === 'Tab' || e.key === 'Backspace') {
      return;
    }

    if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      e.stopPropagation();
      log('ENTER');
      const { expr } = this.state;
      const { onEvaluate } = this.props;
      onEvaluate(expr)
      return;
    }

    log('[onKeyDown] e.key', e.key);
    const { selectionStart, selectionEnd, superscript, expr } = this.state;
    const result = handleInput(e.key, expr, selectionStart, selectionEnd, superscript);
    log('[onKeyDown] result: ', result);

    if (result && result.passthrough) {
      //just let the input handle the keydown
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (result) {

      this.setState({
        expr: result.value,
        selectionStart: result.selectionStart,
        selectionEnd: result.selectionEnd,
        superscript: result.superscript
      });
    }
  }

  render() {
    const { classes, mode, angleMode, onAngleModeChange, error } = this.props;
    const {
      expr,
      selectionStart,
      selectionEnd,
      superscript,
      focused } = this.state;

    const names = classNames(classes.calculator, mode === 'scientific' ? classes.scientificCalculator : classes.basicCalculator);
    return (
      <div className={names}>
        <Display
          angleMode={angleMode}
          showAngleMode={mode === 'scientific'}
          onAngleModeChange={onAngleModeChange}
          focused={focused}
          error={error}>
          <SelectableInput
            className={classes.selectableInput}
            inputRef={r => this.input = r}
            onChange={this.onChange}
            onSelectionChange={this.onSelectionChange}
            value={expr}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
            onKeyDown={this.onKeyDown}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            superscript={superscript}
            theme={{
              root: classes.root,
              input: classNames(classes.input, error && classes.inputError)
            }} />
        </Display>
        <div className={classes.padHolder}>
          <Basic
            className={classes.basic, mode === 'basic' && classes.onlyBasic}
            onInput={this.onInput} />
          {mode === 'scientific' && (
            <Scientific
              onInput={this.onInput} />
          )}
        </div>
      </div>
    );
  }
}

Calculator.propTypes = {
  angleMode: PropTypes.oneOf(['deg', 'rad']).isRequired,
  onAngleModeChange: PropTypes.func.isRequired,
  expr: PropTypes.string.isRequired,
  onEvaluate: PropTypes.func.isRequired,
  error: PropTypes.object,
  onClearError: PropTypes.func
}

export default withStyles(theme => ({
  calculator: {
    backgroundColor: 'white'
  },
  basicCalculator: {
    maxWidth: '300px'
  },
  scientificCalculator: {
    maxWidth: '600px'
  },
  selectableInput: {
    width: '100%'
  },
  root: {
    width: '100%'
  },
  input: {
    width: '100%',
    fontSize: '40px',
    textAlign: 'right'
  },
  inputError: {
    color: 'red'
  },
  padHolder: {
    display: 'flex'
  },
  basic: {
    color: 'green'
  },
  onlyBasic: {
    flex: '1'
  }
}))(Calculator);
