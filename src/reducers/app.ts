import { reducerWithInitialState } from "typescript-fsa-reducers";
import {
  setAppState,
  setCanvas,
  setHengao,
  appState,
  APP_STATE_TYPE,
} from "../actions/app";

export type AppStateType = {
  appState: APP_STATE_TYPE;
  canvas: HTMLCanvasElement | null;
  hengao: string[];
};

const initialState: AppStateType = {
  appState: appState.WAIT_START,
  canvas: null,
  hengao: [],
};

export const appReducer = reducerWithInitialState(initialState)
  .case(setAppState, (state, appState) => ({
    ...state,
    appState,
  }))
  .case(setHengao, (state, dataUrl) => ({
    ...state,
    hengao: [...state.hengao, dataUrl],
  }))
  .case(setCanvas, (state, canvas) => ({
    ...state,
    canvas,
  }));
