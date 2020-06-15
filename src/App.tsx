import React from "react";
import { useSelector } from "react-redux";

import AppLayout from "./components/AppLayout";
import Main from "./pages/Main";
import Start from "./pages/Start";
import Error from "./pages/Error";
import { appState } from "./actions/app";
import { StateType } from "./reducers";
import { APP_STATE_TYPE } from "./actions/app";

const App = () => {
  const {
    app: { appState: state },
  } = useSelector((state: StateType) => state);
  const page = (state: APP_STATE_TYPE) => {
    switch (state) {
      case appState.WAIT_START:
        return <Start />;
      case appState.APP_ERROR:
        return <Error />;
      default:
        return <Main state={state} />;
    }
  };
  return <AppLayout>{page(state)}</AppLayout>;
};

export default App;
