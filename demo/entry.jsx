import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from '../src';

const Demo = () => <Calculator />
const el = React.createElement(Demo, {});
ReactDOM.render(el, document.querySelector('#app'));
