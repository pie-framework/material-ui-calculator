import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from '../src';
import Button from 'material-ui/Button';
import debug from 'debug';

const log = debug('@pie-framework:demo');

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

    const { selectable } = this.state;

    return (
      <div>
        <div>
          <Calculator
            mode="scientific"
            onEvaluationComplete={this.onEvaluationComplete} />
        </div>
        <pre>
          {JSON.stringify(this.state, null, '  ')}
        </pre>
      </div>)
  }
}
const el = React.createElement(Demo, {});
ReactDOM.render(el, document.querySelector('#app'));
