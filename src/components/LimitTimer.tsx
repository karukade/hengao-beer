import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { APP_STATE_TYPE, appState, setAppState } from "../actions/app";

//components
import Counter from "./Counter";

const LimitTimer: React.FC<{ state: APP_STATE_TYPE }> = ({ state }) => {
  const dispatch = useDispatch();
  const onFailed = useCallback(() => {
    dispatch(setAppState(appState.FAIL_HENGAO));
  }, [dispatch]);
  return <Counter count={20} onDone={onFailed} fontSize="6.6vw" color="#000" />;
};

export default LimitTimer;
