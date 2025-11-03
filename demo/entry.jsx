import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from '../src';
import debug from 'debug';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';

const log = debug('@pie-framework:demo');

const GithubHolder = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(2),
  '& svg': {
    height: '24px',
    fill: grey[700],
  }
}));

const Github = () => (
  <GithubHolder>
    <svg focusable="false" viewBox="0 0 24 24">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"></path>
    </svg>
  </GithubHolder>
);

const HistoryPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  marginLeft: theme.spacing(1),
  width: '60%',
  overflow: 'scroll',
  height: '300px'
}));

const History = ({ history }) => (
  <HistoryPaper>
    <Typography variant="h6">History</Typography>
    <Pre data={history} />
  </HistoryPaper>
);

const Pre = ({ data, className }) => (
  <pre className={className}>
    {JSON.stringify(data, null, '  ')}
  </pre>
);

const DemoCalcRoot = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '& .row': {
    display: 'flex'
  }
}));

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
    const { mode } = this.props;

    return (
      <DemoCalcRoot>
        <Typography>{mode}</Typography>
        <div className="row">
          <Calculator
            mode={mode}
            onEvaluationComplete={this.onEvaluationComplete} />
          <History history={this.state.history} />
        </div>
      </DemoCalcRoot>
    );
  }
}

const DemoRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  width: '1024px',
  margin: '0 auto',
  '& .top-row': {
    display: 'flex',
    alignItems: 'center'
  },
  '& .demo': {
    paddingTop: theme.spacing(1)
  }
}));

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
    return (
      <DemoRoot>
        <div className="top-row">
          <Typography>material-ui-calculator</Typography>
          <IconButton onClick={this.onGithubClick} size="large"><Github /></IconButton>
        </div>
        <div className="demo">
          <DemoCalc mode="basic" />
          <DemoCalc mode="scientific" />
        </div>
      </DemoRoot>
    );
  }
}

const el = React.createElement(Demo, {});
ReactDOM.render(el, document.querySelector('#app'));
