// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import '../assets/application.scss';

// import faker from 'faker';
// @ts-ignore
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(<App gon={gon}/>, document.getElementById('root'));


console.log('gon', gon);
