import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from '../src';
import Button from '@material-ui/core/Button';
import debug from 'debug';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { grey } from '@material-ui/core/colors';

const log = debug('@pie-framework:demo');

const Github = withStyles(theme => ({
  holder: {
    paddingTop: theme.spacing.unit * 2
  },
  github: {
    height: '24px',
    fill: grey[700],
  }
}))(({ classes }) => (
  <div className={classes.holder}>
    <svg className={classes.github} focusable="false" viewBox="0 0 24 24">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"></path>
    </svg>
  </div>
));

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

  onGithubClick = () => {
    window.location.href = 'https://github.com/pie-framework/material-ui-calculator';
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.topRow}>
          <Typography type="display3">material-ui-calculator</Typography>
          <IconButton onClick={this.onGithubClick}><Github /></IconButton>
        </div>
        <div className={classes.demo}>
          <StyledDemoCalc mode="basic" />
          <StyledDemoCalc mode="scientific" />
        </div>
      </div>
    )
  }
}

const Styled = withStyles(theme => ({
  topRow: {
    display: 'flex',
    alignItems: 'center'
  },
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
