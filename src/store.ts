import { createStore, applyMiddleware, Store, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const combinedReducers = combineReducers(reducers);

const store: Store = createStore(combinedReducers, applyMiddleware(thunk));

export default store;
