import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import NumberPad from './number-pad';
import Button from 'material-ui/Button';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Backspace from 'material-ui-icons/Backspace';
import debug from 'debug';
import NewPad from './new-pad';

const log = debug('material-ui-calculator:basic');

const Pad = withStyles(theme => ({
  pad: {
    flex: '1',
    minWidth: 80
  }
}))(({ classes, children, onClick }) => (
  <IconButton
    onClick={onClick}
    className={classes.pad}>{children}</IconButton>
));

const BasicOperators = withStyles(theme => ({
  operators: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.secondary[100]
  }
}))(({ classes, onDelete, onInput }) => {
  return (
    <div className={classes.operators}>
      <Pad onClick={onDelete}><Backspace /></Pad>
      <Pad onClick={() => onInput('+')}>+</Pad>
      <Pad onClick={() => onInput('-')}>-</Pad>
      <Pad onClick={() => onInput('/')}>&#247;</Pad>
      <Pad onClick={() => onInput('*')}>&#215;</Pad>
    </div>
  );
});

export class Basic extends React.Component {

  render() {
    const {
      className,
      classes,
      onInput
    } = this.props;

    const names = classNames(classes.basic, className);
    return (
      <NewPad onInput={onInput} />
    );
  }
}

Basic.propTypes = {}

const styles = theme => ({
  basic: {
    display: 'flex'
  },
  numberPad: {
    flex: '1'
  }
});

export default withStyles(styles)(Basic);