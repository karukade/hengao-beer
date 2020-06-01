import React from "react";
import Spinner from "./Spinner";

import { FaceApiStateType } from "../reducers/face-api";
import { FaceApiActions } from "../containers/faceApiContainer";

const FaceApiComponents: React.FC<FaceApiStateType & FaceApiActions> = ({
  preparing,
  prepareFaceApi,
  error,
}) => (
  <>
    <button onClick={() => prepareFaceApi()}>PREPARE Face API</button>
    {preparing && <Spinner />}
  </>
);

export default FaceApiComponents;
