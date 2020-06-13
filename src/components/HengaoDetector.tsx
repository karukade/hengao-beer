import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

//components
import Counter from "../components/_Counter";
import HengaoDetectorImg from "../components/HengaoDetectorImg";
import BeerImg from "../assets/img/img-beer.png";
import HengaoImg from "../assets/img/hengao.png";

import { detectHengao } from "../plugins/faceApi";
import {
  APP_STATE_TYPE,
  appState,
  setAppState,
  thunkSuccessHengao,
} from "../actions/app";
import { StateType } from "../reducers";

type MeterProps = {
  dashArray: string;
  isHengao: boolean;
};

const popAnim = keyframes`
50%  {transform: scale(1.2);}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 22vmax;
  height: 22vmax;
  max-width: 280px;
  max-height: 280px;
  background-color: #fff;
  box-shadow: 0 4px 44px 0 rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  &.success {
    background-color: #ff3566;
    animation: ${popAnim} 0.2s ease-out;
  }
  > svg {
    transform: rotate(-90deg) scale(1.3);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .circle {
      transition: all 0.15s;
      fill: transparent;
      stroke-width: 1.2;
      stroke-dashoffset: 0;
    }
  }
  > .counter {
    position: relative;
    z-index: 1;
  }
  .hengao-img {
    display: block;
    width: 40%;
    margin-bottom: 10px;
  }
`;

const DoneTxt = styled.div<{ isFail?: boolean }>`
  text-align: center;
  font-size: 2vw;
  font-weight: bold;
  color: ${({ isFail }) => (isFail ? "#333" : "#fff")};
  img {
    display: block;
    width: 60.8%;
    margin-bottom: 15px;
    margin: auto;
  }
`;

const getMeterProps = ({
  distance,
  isHengao,
  hengaoThreshold,
}: {
  distance: number;
  isHengao: boolean;
  hengaoThreshold: number;
}): MeterProps => {
  if (isHengao)
    return {
      dashArray: "100",
      isHengao,
    };
  const percent = (distance / hengaoThreshold) * 100;
  return {
    dashArray: `${percent} ${100 - percent}`,
    isHengao,
  };
};

const shouldGameContinue = (state: APP_STATE_TYPE) =>
  state !== appState.SUCCESS_HENGAO && state !== appState.FAIL_HENGAO;

const getCurrentState = (isHengao: boolean) =>
  isHengao ? appState.DETECTING_HENGAO_FILL : appState.DETECTING_HENGAO;

const getDoneTxt = (state: APP_STATE_TYPE) => {
  if (state === appState.SUCCESS_HENGAO)
    return <DoneTxt>ビールゲット!</DoneTxt>;
  if (state === appState.FAIL_HENGAO)
    return <DoneTxt isFail={true}>恥をすてよう</DoneTxt>;
  return null;
};

const getImg = (state: APP_STATE_TYPE) => {
  if (state === appState.DETECTING_HENGAO || state === appState.FAIL_HENGAO)
    return HengaoImg;
  if (state === appState.SUCCESS_HENGAO) return BeerImg;
};

const HengaoDetector: React.FC<{ state: APP_STATE_TYPE }> = ({ state }) => {
  const [meterProps, setMeterProps] = useState({
    dashArray: "0 100",
    isHengao: false,
  });
  const { faceApi, video } = useSelector((state: StateType) => state);
  const dispatch = useDispatch();

  const onDone = useCallback(() => {
    dispatch(thunkSuccessHengao());
  }, [dispatch]);
  const continueGame = shouldGameContinue(state);
  const doneTxt = getDoneTxt(state);

  useEffect(() => {
    if (!continueGame) return;
    let lastAppState!: string;
    let timer!: number;
    let cancel = false;

    const detectLoop = async () => {
      const result = await detectHengao(video.element, faceApi.matcher);
      if (result) {
        const meterProps = getMeterProps(result);
        const currentState = getCurrentState(result.isHengao);

        setMeterProps(meterProps);

        if (currentState !== lastAppState) {
          dispatch(setAppState(currentState));
          lastAppState = currentState;
        }
      }
      if (!cancel) timer = requestAnimationFrame(detectLoop);
    };

    detectLoop();

    return () => {
      cancelAnimationFrame(timer);
      cancel = true;
    };
  }, [dispatch, faceApi.matcher, continueGame, video.element]);

  return (
    <Wrapper className={state === appState.SUCCESS_HENGAO ? "success" : ""}>
      <svg viewBox="0 0 42 42">
        <circle
          className="circle"
          cx="21"
          cy="21"
          r="15.91549430918954"
          stroke={meterProps.isHengao ? "#FF3566" : "#D2FF51"}
          strokeDasharray={meterProps.dashArray}
        ></circle>
      </svg>
      {state === appState.DETECTING_HENGAO_FILL && (
        <>
          変顔キープ
          <Counter count={5} onDone={onDone} fontSize="6.6vw" color="#ff3566" />
        </>
      )}
      <HengaoDetectorImg src={getImg(state)} />
      {doneTxt}
    </Wrapper>
  );
};

export default HengaoDetector;
