import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import debug from 'debug';

const log = debug('@pie-framework:material-ui-calculator');

export default class SelectableInput extends React.Component {
  static propTypes = {
    onKeyDown: PropTypes.func,
    inputRef: PropTypes.func,
    onSelectionChange: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    selectionEnd: PropTypes.number,
    selectionStart: PropTypes.number,
    className: PropTypes.string,
    theme: PropTypes.object,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

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
    if (this.input) {
      const { selectionEnd, selectionStart } = this.props;
      this.input.selectionStart = selectionStart;
      this.input.selectionEnd = selectionEnd;
      log('input: ', this.input.selectionStart, this.input.selectionEnd);
    }
  };

  onKeyUp = () => {
    log('[onKeyUp]');
    const { onSelectionChange } = this.props;

    const update = this.getUpdate();
    if (update) {
      onSelectionChange(update);
    }
  };

  onChange = event => {
    log('[onChange]');
    const { onChange } = this.props;

    onChange({
      target: {
        value: event.target.value,
        selectionStart: event.target.selectionStart,
        selectionEnd: event.target.selectionEnd
      }
    });
  };

  getUpdate = () =>
    this.input && {
      selectionStart: this.input.selectionStart,
      selectionEnd: this.input.selectionEnd
    };

  onClick = () => {
    const { onSelectionChange } = this.props;
    const update = this.getUpdate();
    if (update) {
      onSelectionChange(update);
    }
  };

  inputRef = r => {
    this.input = r;
    const { inputRef } = this.props;
    if (inputRef) {
      inputRef(this.input);
    }
  };

  onKeyDown = e => {
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  render() {
    const { value, className, theme, onFocus, onBlur } = this.props;

    const inputTheme = theme ? theme : {};
    return (
      <TextField
        className={className}
        inputRef={this.inputRef}
        onKeyUp={this.onKeyUp}
        onKeyDown={this.onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={this.onChange}
        onClick={this.onClick}
        InputProps={{
          disableUnderline: true,
          classes: inputTheme
        }}
      />
    );
  }
}
