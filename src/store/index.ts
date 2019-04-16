import { createStore, Store, applyMiddleware } from 'redux';
import { UserSessionState } from './userSession/types';
import rootReducer from './rootReducer';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';

export interface ApplicationState {
    userSessionState: UserSessionState
}

const sagaMidware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMidware));

sagaMidware.run(rootSaga);

export default store; 