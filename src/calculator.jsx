import React from 'react';
import { withStyles } from 'material-ui/styles';
import Display from './display';
import Basic from './basic';
import Scientific from './scientific';
import debug from 'debug';

const log = debug('material-ui-calculator:calculator');

class Calculator extends React.Component {

  onClick = () => {


  }

  render() {
    const {
      classes,
      mode,
      onInput,
      value } = this.props;

    log('value: ', value);
    return (
      <div className={classes.calculator}>
        <Display value={value.value} />
        <div className={classes.padHolder}>
          <Basic
            className={classes.basic}
            onInput={onInput} />
          {mode === 'scientific' && <Scientific />}
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