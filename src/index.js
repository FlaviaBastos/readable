import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { selectCategory, fetchContent } from './actions'
import rootReducer from './reducers'
import { Provider } from 'react-redux'

const middleware = applyMiddleware(thunkMiddleware)

const store = createStore(
  rootReducer,
  compose(middleware,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

store.dispatch(selectCategory('redux'))
store
  .dispatch(fetchContent())
  .then(() => console.log(store.getState))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
