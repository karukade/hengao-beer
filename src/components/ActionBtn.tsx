import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkPrepareMatcher } from "../actions/faceApi";
import Btn from "../components/Btn";
import { APP_STATE_TYPE, appState } from "../actions/app";
import { AppThunk } from "../reducers";
import { Action } from "typescript-fsa";

type Actions = {
  [K in APP_STATE_TYPE]?: () => AppThunk | Action<any>;
};

const actions: Actions = {
  [appState.WAIT_MAGAO]: thunkPrepareMatcher,
};

const labels: {
  [K in APP_STATE_TYPE]?: string;
} = {
  [appState.WAIT_MAGAO]: "通常の顔を撮影する",
};

const ActionBtn: React.FC<{ state: APP_STATE_TYPE }> = ({ state }) => {
  const dispatch = useDispatch();
  if (!actions[state]) return null;
  const clickHandler = () => {
    dispatch(actions[state]?.());
  };
  return (
    <div>
      <Btn onClick={clickHandler}>{labels?.[state]}</Btn>
    </div>
  );
};

export default ActionBtn;
