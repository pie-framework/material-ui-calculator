import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import SelectableInput from './selectable-input';
import Scientific from './scientific';
import { insertAt } from './utils';
import { handleInput } from './math-input';
import { styled } from '@mui/material/styles';
import Basic from './basic';
import Display from './display';
import classNames from 'classnames';
import * as colors from './colors';

export { SelectableInput };

const log = debug('@pie-framework:material-ui-calculator');

const StyledCalculator = styled('div')(({ mode }) => ({
  backgroundColor: 'white',
  maxWidth: mode === 'scientific' ? '600px' : '300px',
  '& .selectable-input': {
    width: '100%'
  },
  '& .input-root': {
    width: '100%'
  },
  '& .input': {
    width: '100%',
    fontSize: '40px',
    textAlign: 'right'
  },
  '& .input-error': {
    color: colors.error
  },
  '& .pad-holder': {
    display: 'flex'
  },
  '& .basic': {
    color: 'green'
  },
  '& .only-basic': {
    flex: '1'
  }
}));

export class Calculator extends React.Component {
  static propTypes = {
    angleMode: PropTypes.oneOf(['deg', 'rad']).isRequired,
    onAngleModeChange: PropTypes.func.isRequired,
    expr: PropTypes.string.isRequired,
    onEvaluate: PropTypes.func.isRequired,
    error: PropTypes.object,
    onClearError: PropTypes.func,
    mode: PropTypes.oneOf(['basic', 'scientific'])
  };

  constructor(props) {
    super(props);
    this.state = {
      expr: props.expr,
      selectionStart: 0,
      selectionEnd: 0
    };
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
  };

  onSelectionChange = update => {
    this.setState({
      selectionStart: update.selectionStart,
      selectionEnd: update.selectionEnd
    });
  };

  onInput = value => {
    log('[onInput]: ', value);
    const { expr, selectionStart, selectionEnd, superscript } = this.state;

    if (value === 'equals') {
      const { onEvaluate } = this.props;
      onEvaluate(expr);
      this.input.focus();
      return;
    }

    const result = handleInput(
      value,
      expr,
      selectionStart,
      selectionEnd,
      superscript
    );

    if (result) {
      if (result.passthrough) {
        this.setState({
          expr: insertAt(
            expr,
            { start: selectionStart, end: selectionEnd },
            value
          ),
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
  };

  onFocus = () => {
    this.setState({ focused: true });
  };

  onBlur = () => {
    this.setState({ focused: false });
  };

  onKeyDown = e => {
    if (
      e.key === 'ArrowRight' ||
      e.key === 'ArrowLeft' ||
      (e.key === 'a' && e.metaKey) ||
      e.key === 'Tab' ||
      e.key === 'Backspace'
    ) {
      return;
    }

    if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      e.stopPropagation();
      log('ENTER');
      const { expr } = this.state;
      const { onEvaluate } = this.props;
      onEvaluate(expr);
      return;
    }

    log('[onKeyDown] e.key', e.key);
    const { selectionStart, selectionEnd, superscript, expr } = this.state;
    const result = handleInput(
      e.key,
      expr,
      selectionStart,
      selectionEnd,
      superscript
    );
    log('[onKeyDown] result: ', result);

    if (result && result.passthrough) {
      /**
       * just let the input handle the keydown - this will go through onChange
       */
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
  };

  render() {
    const { mode, angleMode, onAngleModeChange, error } = this.props;
    const {
      expr,
      selectionStart,
      selectionEnd,
      superscript,
      focused
    } = this.state;

    return (
      <StyledCalculator mode={mode}>
        <Display
          angleMode={angleMode}
          showAngleMode={mode === 'scientific'}
          onAngleModeChange={onAngleModeChange}
          focused={focused}
          error={error}
        >
          <SelectableInput
            className="selectable-input"
            inputRef={r => (this.input = r)}
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
              root: "input-root",
              input: classNames("input", error && "input-error")
            }}
          />
        </Display>
        <div className="pad-holder">
          <Basic
            className={classNames(
              "basic",
              mode === 'basic' && "only-basic"
            )}
            onInput={this.onInput}
          />
          {mode === 'scientific' && <Scientific onInput={this.onInput} />}
        </div>
      </StyledCalculator>
    );
  }
}

export default Calculator;
