import { reducerWithInitialState } from "typescript-fsa-reducers";
import { setAppState } from "../actions/app";
import { APP_STATE_TYPE, appState } from "../actions/app";

export type AppStateType = {
  appState: APP_STATE_TYPE;
};

const initialState: AppStateType = {
  appState: appState.WAIT_START,
};

export const appReducer = reducerWithInitialState(initialState).case(
  setAppState,
  (state, appState) => ({
    ...state,
    appState,
  })
);
