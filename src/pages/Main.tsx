import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkInitApp } from "../actions/app";

import MainLayout from "../components/MainLayout";
import Message from "../components/Message";
import Video from "../components/Video";
import HengaoDetector from "../components/HengaoDetector";
import LimitTimer from "../components/LimitTimer";
import StartCounter from "../components/StartCounter";
import SnapCanvas from "../components/SnapCanvas";
import HengaoList from "../components/HengaoList";
import ActionBtn from "../components/ActionBtn";
import MagaoLoader from "../components/MagaoLoader";

import { APP_STATE_TYPE, appState, setAppState } from "../actions/app";
import { StateType } from "../reducers/";

const components = (state: APP_STATE_TYPE) => {
  switch (state) {
    case appState.WAIT_MAGAO:
      return {
        actionBtn: (
          <ActionBtn action="TAKE_MAGAO">通常の顔を撮影する</ActionBtn>
        ),
      };

    case appState.TAKING_MAGAO:
    case appState.WAIT_HENGAO:
      return {
        videoOverlay: <MagaoLoader ready={state === appState.WAIT_HENGAO} />,
      };

    case appState.READY_HENGAO:
      return {
        videoOverlay: <StartCounter count={3} />,
      };

    case appState.DETECTING_HENGAO:
    case appState.DETECTING_HENGAO_FILL:
      return {
        status: <HengaoDetector state={state} />,
        limitTimer: <LimitTimer state={state} />,
      };

    case appState.SUCCESS_HENGAO:
    case appState.FAIL_HENGAO:
      return {
        status: <HengaoDetector state={state} />,
        actionBtn: (
          <>
            <ActionBtn action="RESTART">リトライ変顔</ActionBtn>
            <ActionBtn action="TAKE_MAGAO">
              もう一度通常の顔を撮影する
            </ActionBtn>
          </>
        ),
      };

    default:
      return {};
  }
};

const condHengaoList = (hengao: StateType["app"]["hengao"]) =>
  hengao.length > 0;

const Main: React.FC<{ state: APP_STATE_TYPE }> = ({ state }) => {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const { hengao } = useSelector((state: StateType) => state.app);
  const waitHengao = state === appState.WAIT_HENGAO;
  const dispatch = useDispatch();

  // video要素をmount後に初期化する
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;
    dispatch(
      thunkInitApp({ video: videoRef.current, canvas: canvasRef.current })
    );
  }, [dispatch]);

  // 真顔撮影完了後1500ms待ってからスタートする
  useEffect(() => {
    let timer!: number;
    if (waitHengao) {
      timer = setTimeout(
        () => dispatch(setAppState(appState.READY_HENGAO)),
        1500
      );
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [dispatch, waitHengao]);

  return (
    <>
      <SnapCanvas ref={canvasRef} />
      <MainLayout
        video={<Video ref={videoRef} />}
        message={<Message state={state} />}
        aside={condHengaoList(hengao) && <HengaoList items={hengao} />}
        {...components(state)}
      />
    </>
  );
};

export default Main;
