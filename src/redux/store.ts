import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose, type Reducer } from 'redux';
import {thunk} from 'redux-thunk';
import nodesReducer from './reducer/nodesReducer';
import type { NodeState } from '../types';

const rootReducer = combineReducers({
  nodes: nodesReducer as unknown as Reducer<NodeState>,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
);

export { store };
export type AppDispatch = typeof store.dispatch;
