// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import '../assets/application.scss';

// import faker from 'faker';
// @ts-ignore
// eslint-disable-next-line import/order
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(<App gon={gon} />, document.getElementById('root'));
