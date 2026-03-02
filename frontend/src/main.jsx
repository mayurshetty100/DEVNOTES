import React from 'react';
import ReactDOM from 'react-dom/client';// for core methods of react such as .render and .createroot
import {BrowserRouter} from 'react-router-dom';//for routing in react
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    //enables routing accross entire app
  <React.StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </React.StrictMode>
);