import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ActionBtn from "../components/ActionBtn";
import StartCounter from "../components/StartCounter";
import BtnList from "../components/BtnList";
import MagaoLoader from "../components/MagaoLoader";
import { APP_STATE_TYPE, appState, setAppState } from "../actions/app";

const isRestart = (state: APP_STATE_TYPE) =>
  state === appState.FAIL_HENGAO || state === appState.SUCCESS_HENGAO;

const getBtnLabel = (state: APP_STATE_TYPE) => {
  if (state === appState.WAIT_MAGAO) return "通常の顔を撮影する";
  if (isRestart(state)) return "もう一度通常の顔を撮影する";
};

const VideoOverLay: React.FC<{ state: APP_STATE_TYPE }> = ({ state }) => {
  //TODO: StartCounterとActionBtnはそれぞれMountされるタイミングが違うので分けたい。
  const btnLabel = getBtnLabel(state);
  const dispatch = useDispatch();
  const waitHengao = state === appState.WAIT_HENGAO;
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
      {state === appState.READY_HENGAO && <StartCounter count={3} />}
      {(state === appState.TAKING_MAGAO || state === appState.WAIT_HENGAO) && (
        <MagaoLoader ready={waitHengao} />
      )}
      <BtnList>
        {isRestart(state) && (
          <ActionBtn action="RESTART">リトライ変顔</ActionBtn>
        )}
        {(isRestart(state) || state === appState.WAIT_MAGAO) && (
          <ActionBtn action="TAKE_MAGAO">{btnLabel}</ActionBtn>
        )}
      </BtnList>
    </>
  );
};

export default VideoOverLay;
