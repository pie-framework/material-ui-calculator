import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import debug from 'debug';

const log = debug('@pie-labs:material-ui-calculator');

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

  render() {

    const { value } = this.props;
    return (
      <TextField
        inputRef={this.inputRef}
        onKeyUp={this.onKeyUp}
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