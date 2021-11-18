import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore} from 'redux'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import App from './App';
import reducers from './store/reducer/index'
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import reportWebVitals from './reportWebVitals';

const store = createStore(reducers, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store = {store}>
    <Router>
        <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
