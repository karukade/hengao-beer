import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkInitApp } from "../actions/app";

import MainLayout from "../components/MainLayout";
import VideoOverLay from "../components/VideoOverLay";
import Message from "../components/Message";
import Video from "../components/Video";
import HengaoDetector from "../components/HengaoDetector";
import LimitTimer from "../components/LimitTimer";
import SnapCanvas from "../components/SnapCanvas";
import HengaoList from "../components/HengaoList";

import { APP_STATE_TYPE, appState } from "../actions/app";
import { StateType } from "../reducers/";

const startHengao = (state: APP_STATE_TYPE) =>
  state === appState.DETECTING_HENGAO ||
  state === appState.DETECTING_HENGAO_FILL ||
  state === appState.SUCCESS_HENGAO ||
  state === appState.FAIL_HENGAO;

const condVideoOverlay = (state: APP_STATE_TYPE) =>
  state === appState.WAIT_MAGAO ||
  state === appState.TAKING_MAGAO ||
  state === appState.WAIT_HENGAO ||
  state === appState.READY_HENGAO ||
  state === appState.SUCCESS_HENGAO ||
  state === appState.FAIL_HENGAO;

const condHengaoList = (hengao: StateType["app"]["hengao"]) =>
  hengao.length > 0;

const Main: React.FC<{ state: APP_STATE_TYPE }> = ({ state }) => {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const { hengao } = useSelector((state: StateType) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;
    dispatch(
      thunkInitApp({ video: videoRef.current, canvas: canvasRef.current })
    );
  }, [dispatch]);
  return (
    <>
      {state}
      <SnapCanvas ref={canvasRef} />
      <MainLayout
        status={startHengao(state) && <HengaoDetector state={state} />}
        video={<Video ref={videoRef} />}
        message={<Message state={state} />}
        limitTimer={<LimitTimer state={state} />}
        videoOverLay={condVideoOverlay(state) && <VideoOverLay state={state} />}
        aside={condHengaoList(hengao) && <HengaoList items={hengao} />}
      />
    </>
  );
};

export default Main;
