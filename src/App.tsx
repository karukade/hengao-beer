import React, { lazy, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import AppLayout from "./components/AppLayout";
import Spinner from "./components/Spinner";

import { appState } from "./actions/app";
import { StateType } from "./reducers";
import { APP_STATE_TYPE } from "./actions/app";

const Start = lazy(() => import("./pages/Start"));
const Error = lazy(() => import("./pages/Error"));
const Main = lazy(() => import("./pages/Main"));

const getPage = async (state: APP_STATE_TYPE): Promise<React.ReactNode> => {
  switch (state) {
    case appState.WAIT_START: {
      return <Start />;
    }
    case appState.APP_ERROR: {
      return <Error />;
    }
    default: {
      return <Main state={state} />;
    }
  }
};

const App = () => {
  const {
    app: { appState: state },
  } = useSelector((state: StateType) => state);
  const [view, setView] = useState<React.ReactNode>(null);

  useEffect(() => {
    const loadPages = async () => {
      const page = await getPage(state);
      setView(page);
    };
    loadPages();
  }, [state]);

  return (
    <AppLayout>
      <React.Suspense fallback={<Spinner show={!!view} />}>
        {view}
      </React.Suspense>
    </AppLayout>
  );
};

export default App;
