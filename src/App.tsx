import React from "react";
import { useSelector } from "react-redux";

import AppLayout from "./components/AppLayout";
import Main from "./pages/Main";
import Start from "./pages/Start";

import { appState } from "./actions/app";
import { StateType } from "./reducers";

const App = () => {
  const {
    app: { appState: state },
  } = useSelector((state: StateType) => state);
  return (
    <AppLayout>
      {state === appState.WAIT_START ? <Start /> : <Main state={state} />}
    </AppLayout>
  );
};

export default App;
