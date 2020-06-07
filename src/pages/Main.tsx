import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkInitApp } from "../actions/app";

import MainLayout from "../components/MainLayout";
import VideoOverLay from "../components/VideoOverLay";
import Instruction from "../components/Instruction";
import Video from "../components/Video";

import { APP_STATE_TYPE } from "../actions/app";

const Main: React.FC<{ state: APP_STATE_TYPE }> = ({ state }) => {
  const ref = useRef<null | HTMLVideoElement>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!ref.current) return;
    dispatch(thunkInitApp(ref.current));
  }, [dispatch]);
  return (
    <MainLayout
      video={<Video ref={ref} />}
      videoOverLay={<VideoOverLay state={state} />}
      message={<Instruction state={"prepareMatcher"} />}
    />
  );
};

export default Main;
