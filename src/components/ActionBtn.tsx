import React from "react";
import { useDispatch } from "react-redux";

import { thunkGetMatcher, setAppState } from "../actions/app";
import Btn from "../components/Btn";
import { appState } from "../actions/app";
import { AppThunk } from "../reducers";
import { Action } from "typescript-fsa";

type ActionKeys = "TAKE_MAGAO" | "RESTART";

type Actions = {
  [K in ActionKeys]?: () => AppThunk | Action<any>;
};

const actions: Actions = {
  TAKE_MAGAO: thunkGetMatcher,
  RESTART: () => setAppState(appState.READY_HENGAO),
};

const ActionBtn: React.FC<{ action: ActionKeys }> = ({ children, action }) => {
  const dispatch = useDispatch();
  if (!actions[action]) return null;
  const clickHandler = () => {
    dispatch(actions[action]?.());
  };
  return <Btn onClick={clickHandler}>{children}</Btn>;
};

export default ActionBtn;
