import { Context, MakeStore, createWrapper } from 'next-redux-wrapper';
import { AnyAction, applyMiddleware, createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer, RootState, reducer } from './reducers/index';




const makeStore: MakeStore<RootState> = (context: Context) => createStore(reducer, applyMiddleware(thunk))

export const wrapper = createWrapper<RootState>(makeStore, {debug: true})

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>

