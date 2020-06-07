import React from "react";
import ActionBtn from "../components/ActionBtn";
import { APP_STATE_TYPE } from "../actions/app";

const VideoOverLay: React.FC<{ state: APP_STATE_TYPE }> = ({ state }) => {
  if (!(state === "WAIT_MAGAO" || state === "READY_HENGAO")) return null;
  return (
    <div>
      <ActionBtn state={state} />
    </div>
  );
};

export default VideoOverLay;
