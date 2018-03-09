import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from '../src';
import Button from 'material-ui/Button';
import debug from 'debug';
import { withStyles } from 'material-ui/styles';

const log = debug('@pie-framework:demo');

class DemoCalc extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      history: []
    }
  }

  onEvaluationComplete = (expression, result) => {
    const { history } = this.state;
    history.push({ expression, result });
    this.setState({ history });
  }

  render() {
    const { mode, classes } = this.props;

    return (
      <div>
        <Calculator
          mode={mode}
          onEvaluationComplete={this.onEvaluationComplete} />
        <pre className={classes.pre}>
          {JSON.stringify(this.state, null, '  ')}
        </pre>
      </div>
    );
  }
}

const StyledDemoCalc = withStyles(theme => ({
  pre: {
    textAlign: 'center'
  }
}))(DemoCalc);

class Demo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      history: []
    }
  }

  onSelectionChange = selection => {

    this.setState({
      selectable: {
        value: this.state.selectable.value,
        selectionStart: selection.selectionStart,
        selectionEnd: selection.selectionEnd
      }
    })
  }

  onChange = event => {
    // console.log(event.target)
    console.log(event.target.selectionStart);
    console.log(event.target.selectionEnd);
    const selectable = {
      value: event.target.value,
      selectionStart: event.target.selectionStart,
      selectionEnd: event.target.selectionEnd
    }
    log('[onChange] update - selectable ', selectable);
    this.setState({ selectable });
  }

  onEvaluationComplete = (expression, result) => {
    this.state.history.push({ expression, result });
    this.setState({ history: this.state.history });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.demo}>
        <StyledDemoCalc mode="basic" />
        <StyledDemoCalc mode="scientific" />
      </div>)
  }
}

const Styled = withStyles(theme => ({
  demo: {
    margin: '0 auto',
    textAlign: 'center'
  }
}))(Demo);
const el = React.createElement(Styled, {});
ReactDOM.render(el, document.querySelector('#app'));
