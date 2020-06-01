import { connect } from "react-redux";
import FaceApiComponent from "../components/faceApiComponent";
import { prepareFaceApi } from "../actions/face-api";
import { loadWidgets } from "../plugins/face-api";

import { Action } from "typescript-fsa";
import { Dispatch } from "redux";
import { StateType } from "../store";

export type FaceApiActions = {
  prepareFaceApi: () => void;
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const mapDispatchToProps = (
  dispatch: Dispatch<
    Action<any>
  > /*ここ3つdispatchなげるとしてどう定義していいかわからない*/
): FaceApiActions => ({
  prepareFaceApi: async () => {
    dispatch(prepareFaceApi.started(true));
    await loadWidgets();
    dispatch(prepareFaceApi.done({ result: false, params: true }));
  },
});

const mapStateToProps = (state: StateType) => ({ ...state.faceApi });

export default connect(mapStateToProps, mapDispatchToProps)(FaceApiComponent);
