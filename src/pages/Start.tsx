import React from "react";
import { useDispatch } from "react-redux";

import { setAppState, appState } from "../actions/app";
import AppLayout from "../components/AppLayout";
import Btn from "../components/Btn";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const onClick = () => dispatch(setAppState(appState.START_APP));
  return <Btn onClick={onClick}>START</Btn>;
};

export default App;
