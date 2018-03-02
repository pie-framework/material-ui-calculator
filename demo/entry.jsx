import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from '../src';

const Demo = () => <Calculator mode="scientific" />
const el = React.createElement(Demo, {});
ReactDOM.render(el, document.querySelector('#app'));
