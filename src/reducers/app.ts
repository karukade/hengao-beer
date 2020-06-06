import { reducerWithInitialState } from "typescript-fsa-reducers";
import { initApp } from "../actions/app";

export type AppStateType = {
  preparing: boolean;
  ready: boolean;
};

const initialState: AppStateType = {
  preparing: false,
  ready: false,
};

export const appReducer = reducerWithInitialState(initialState)
  .case(initApp.started, (state) => ({
    ...state,
    preparing: true,
  }))
  .case(initApp.done, (state) => ({
    ...state,
    preparing: false,
    ready: true,
  }))
  .case(initApp.done, (state) => ({
    ...state,
    error: true,
    preparing: false,
    ready: true,
  }));
