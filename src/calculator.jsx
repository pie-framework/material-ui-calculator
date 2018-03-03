import React from 'react';
import { withStyles } from 'material-ui/styles';
import Display from './display';
import Basic from './basic';
import Scientific from './scientific';
import debug from 'debug';

const log = debug('material-ui-calculator:calculator');

class Calculator extends React.Component {

  handleInput = (i) => {
    const { onInput } = this.props;
    onInput(i);
    this.input.focus();
  }

  render() {
    const {
      classes,
      mode,
      onInput,
      onAngleModeChange,
      onChange,
      onEnter,
      value } = this.props;

    return (
      <div className={classes.calculator}>
        <Display
          inputRef={r => this.input = r}
          value={value.expr}
          angleMode={value.angleMode}
          onAngleModeChange={onAngleModeChange}
          onChange={onChange}
          onEnter={onEnter} />
        <div className={classes.padHolder}>
          <Basic
            className={classes.basic}
            onInput={this.handleInput} />
          {mode === 'scientific' && (
            <Scientific
              onInput={this.handleInput} />
          )}
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  calculator: {
    backgroundColor: theme.palette.primary[100],
    display: 'inline-block',
    minWidth: '500px'
  },
  padHolder: {
    display: 'flex'
  },
  basic: {
    width: '100%'
  }
});

export default withStyles(styles)(Calculator);