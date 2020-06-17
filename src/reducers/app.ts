import { reducerWithInitialState } from "typescript-fsa-reducers";
import {
  setAppState,
  setCanvas,
  setHengao,
  setAppError,
  setDeviceConnected,
  setDeviceInfo,
  appState,
  APP_STATE_TYPE,
} from "../actions/app";

export type DeviceInfo = null | {
  serviceUUID: string;
  characteristicUUID: string;
  name: string;
};

export type AppStateType = {
  appState: APP_STATE_TYPE;
  canvas: HTMLCanvasElement | null;
  hengao: string[];
  deviceConnected: boolean;
  deviceInfo: DeviceInfo;
  appError: string | null;
};

const initialState: AppStateType = {
  appState: appState.WAIT_START,
  canvas: null,
  hengao: [],
  deviceConnected: false,
  deviceInfo: null,
  appError: null,
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
  }))
  .case(setDeviceConnected, (state, deviceConnected) => ({
    ...state,
    deviceConnected,
  }))
  .case(setDeviceInfo, (state, deviceInfo) => ({
    ...state,
    deviceInfo,
  }))
  .case(setAppError, (state, appError) => ({
    ...state,
    appError,
  }));
