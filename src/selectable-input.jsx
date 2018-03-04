import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import debug from 'debug';

const log = debug('@pie-labs:material-ui-calculator');

const map = {
  0: '⁰',
  1: '¹',
  2: '²',
  3: '³',
  4: '⁴',
  5: '⁵',
  6: '⁶',
  7: '⁷',
  8: '⁸',
  9: '⁹',
}

const getSuperscript = (char) => map[char];

export default class extends React.Component {


  focus() {
    this.input.focus();
  }

  componentDidMount() {
    this.applySelection();
  }

  componentDidUpdate() {
    this.applySelection();
  }

  applySelection = () => {
    const { selectionEnd, selectionStart } = this.props;
    this.input.selectionStart = selectionStart;
    this.input.selectionEnd = selectionEnd;
    log('input: ', this.input.selectionStart, this.input.selectionEnd)
  }

  onKeyUp = () => {
    log('[onKeyUp]');
    const { onSelectionChange } = this.props;

    const update = this.getUpdate();
    if (update) {
      onSelectionChange(update);
    }
  }

  onChange = event => {
    log('[onChange]');
    const { onChange } = this.props;
    //how to intercept the input and superscript if needed?
    onChange({
      target: {
        value: '?',
        selectionStart: event.target.selectionStart,
        selectionEnd: event.target.selectionEnd
      }
    })
  }

  getUpdate = () => this.input && ({
    selectionStart: this.input.selectionStart,
    selectionEnd: this.input.selectionEnd
  });

  onClick = event => {
    const { onSelectionChange } = this.props;
    const update = this.getUpdate();
    if (update) {
      onSelectionChange(update);
    }
  }

  inputRef = r => {
    this.input = r;
    const { inputRef } = this.props;
    if (inputRef) {
      inputRef(this.input);
    }
  }

  onKeyDown = e => {
    log('[onKeyDown] e.key', e.key);
    const { superscript, value, onChange } = this.props;
    if (superscript) {

      if (superscript.test(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        const sv = getSuperscript(e.key);
        if (sv) {
          const update = `${value}${sv}`;
          onChange({
            target: {
              value: update,
              selectionStart: update.length,
              selectionEnd: update.length
            }
          });
        }
      }
    }

  }

  render() {

    const { value } = this.props;
    return (
      <TextField
        inputRef={this.inputRef}
        onKeyUp={this.onKeyUp}
        onKeyDown={this.onKeyDown}
        value={value}
        onChange={this.onChange}
        onClick={this.onClick}
        InputProps={{
          disableUnderline: true,
          classes: {
            root: 'root',
            input: 'input'
          }
        }} />
    );

  }
}