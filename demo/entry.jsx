import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from '../src';
import Button from 'material-ui/Button';
import debug from 'debug';

const log = debug('@pie-labs:demo');

class Demo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectable: {
        value: 'foo',
        selectionStart: 1,
        selectionEnd: 1
      }
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

  render() {

    const { selectable } = this.state;

    return (
      <div>
        {JSON.stringify(this.state, null, '  ')}
        <div>
          <p>Selectable Input: </p>
          <Button onClick={() => this.si.focus()}>focus</Button>
          {/* <SelectableInput
            superscript={/[0-9]/}
            ref={r => this.si = r}
            value={selectable.value}
            onChange={this.onChange}
            onSelectionChange={this.onSelectionChange}
            selectionStart={selectable.selectionStart}
            selectionEnd={selectable.selectionEnd}
          /> */}

        </div>
        <div>
          <Calculator mode="scientific" />
        </div>
      </div>)
  }
}
const el = React.createElement(Demo, {});
ReactDOM.render(el, document.querySelector('#app'));
