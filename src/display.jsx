import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import classNames from 'classnames';
import AngleMode from './angle-mode';
import SelectableInput from './selectable-input';

const Field = withStyles(theme => ({
  root: {
    fontSize: '40px'
  },
  input: {
    textAlign: 'right',
    padding: 0,
    margin: 0
  }
}))(({ value,
  classes,
  onFocus,
  onBlur,
  onChange,
  onSelectionChange,
  onEnter,
  inputRef }) => {

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      onEnter();
    }
  }

  return (

    <SelectableInput
      inputRef={inputRef}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      onSelectionChange={onSelectionChange}
      onKeyDown={onKeyDown}
      InputProps={{
        disableUnderline: true,
        classes: {
          root: classes.root,
          input: classes.input
        }
      }} />
  )
});

export class Display extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      focused: false
    }
  }

  onFocus = () => {
    this.setState({ focused: true });
  }

  onBlur = () => {
    this.setState({ focused: false });
  }

  render() {
    const {
      classes,
      value,
      angleMode,
      onAngleModeChange,
      onChange,
      onSelectionChange,
      onEnter,
      inputRef } = this.props;

    const { focused } = this.state;
    const names = classNames(classes.display, focused && classes.focused);
    return (
      <div className={names}>
        <AngleMode angleMode={angleMode} onChange={onAngleModeChange} />
        <div className={classes.expr}>
          <Field value={value}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={onChange}
            onSelectionChange={onSelectionChange}
            onEnter={onEnter}
            inputRef={inputRef} />
        </div>
      </div>
    );
  }
}

Display.propTypes = {}

const styles = theme => ({
  display: {
    display: 'flex',
    backgroundColor: theme.palette.primary[50],
    padding: theme.spacing.unit * 2,
    textAlign: 'right',
    zIndex: 1,
    position: 'relative',
    boxShadow: '0 3px 3px rgba(0, 0, 0, 0.1)',
    borderBottom: 'solid 1px rgba(0,0,0,0.0)'
  },
  focused: {
    backgroundColor: theme.palette.primary[50],
    borderBottom: 'solid 1px rgba(0,0,0,0.2)'
  },
  expr: {
    flex: 1
  }
});

export default withStyles(styles)(Display);