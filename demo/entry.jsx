import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from '../src';
import Button from 'material-ui/Button';
import debug from 'debug';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

const log = debug('@pie-framework:demo');

const History = withStyles(theme => ({
  history: {
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    width: '60%',
    overflow: 'scroll',
    height: '300px'
  }
}))(({ classes, history }) => (
  <Paper className={classes.history}>
    <Typography type="title">History</Typography>
    <Pre data={history} />
  </Paper>
));

const Pre = ({ data, className }) => (
  <pre className={className}>
    {JSON.stringify(data, null, '  ')}
  </pre>
);

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
      <div className={classes.root}>
        <Typography type="display1">{mode}</Typography>
        <div className={classes.row}>
          <Calculator
            mode={mode}
            onEvaluationComplete={this.onEvaluationComplete} />
          <History history={this.state.history} />
        </div>
      </div>
    );
  }
}

const StyledDemoCalc = withStyles(theme => ({
  root: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3
  },
  pre: {
    textAlign: 'center'
  },
  row: {
    display: 'flex'
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
      <div className={classes.root}>
        <Typography type="display3">material-ui-calculator</Typography>
        <div className={classes.demo}>
          <StyledDemoCalc mode="basic" />
          <StyledDemoCalc mode="scientific" />
        </div>
      </div>
    )
  }
}

const Styled = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit,
    width: '1024px',
    margin: '0 auto'
  },
  demo: {
    paddingTop: theme.spacing.unit
  }
}))(Demo);
const el = React.createElement(Styled, {});
ReactDOM.render(el, document.querySelector('#app'));
