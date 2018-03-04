import React from 'react';
import PropTypes from 'prop-types';
import reduce, { Inputs } from '@pie-labs/calculator-reducer';
import debug from 'debug';
import SelectableInput from './selectable-input';
import Scientific from './scientific';
export { SelectableInput }

const log = debug('@pie-labs:material-ui-calculator');

/** 1. an input with 
 * selectionStart
 * selectionEnd
 * value
 * 
 * onSelectionChange
 * onValueChange
 */

const insertAt = (src, position, value) => {
  return [src.slice(0, position), value, src.slice(position)].join('');
}

export default class StatefulCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expr: '',
      angleMode: 'rad',
      selectionStart: 0,
      selectionEnd: 0
    }
  }

  onInput = value => {
    log('[onInput]: ', value);
    switch (value) {

      case '^': {
        const e = insertAt(this.state.expr, this.state.selectionStart, 'ʸ');
        this.setState({
          expr: e,
          selectionStart: this.state.selectionStart,
          selectionEnd: this.state.selectionEnd + 1
        });
        this.input.focus();
      }
    }
    // const calculator = reduce(this.state.calculator, value);
    // log('[onInput] update: ', calculator)
    // this.setState({ calculator });
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
    this.setState({
      expr: e.target.value,
      selectionStart: e.target.selectionStart,
      selectionEnd: e.target.selectionEnd
    });
  }

  onSelectionChange = update => {
    this.setState({
      selectionStart: update.selectionStart,
      selectionEnd: update.selectionEnd,
    });
  }

  render() {
    const { angleMode, expr, selectionStart, selectionEnd } = this.state;

    return (
      <div>
        {JSON.stringify(this.state, null, '  ')}
        <div>
          <SelectableInput
            inputRef={r => this.input = r}
            onChange={this.onChange}
            onSelectionChange={this.onSelectionChange}
            value={expr}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
            onKeyDown={this.onKeyDown} />
        </div>
        <Scientific
          onInput={this.onInput} />
      </div>
    );
  }
}

StatefulCalculator.propTypes = {}