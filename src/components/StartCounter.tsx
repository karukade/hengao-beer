import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";

import { setAppState, appState } from "../actions/app";
import Counter, { CounterProps } from "./Counter";

const fillCircle = keyframes`
  from {
    stroke-dashoffset: 100
  }
  to {
    stroke-dashoffset: 0
  }
`;

const Wrapper = styled.div<{ count: number }>`
  position: relative;
  width: 60%;
  padding-top: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 7.9vw;
  color: #fff;
  > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  .circle {
    fill: rgba(0, 0, 0, 0.4);
    stroke: #fff;
    stroke-dasharray: 100;
    stroke-dashoffset: 0;
    animation: ${fillCircle} 1s;
    animation-iteration-count: ${({ count }) => count};
  }
  .counter {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin: auto;
  }
`;

const StartCounter: React.FC<Pick<CounterProps, "count">> = (props) => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const dispatch = useDispatch();
  const onDone = useCallback(() => {
    setIsDone(true);
    // GO!になって1秒後にゲームをスタートする
    setTimeout(() => dispatch(setAppState(appState.DETECTING_HENGAO)), 1000);
  }, [dispatch]);
  return (
    <Wrapper count={props.count}>
      <svg viewBox="0 0 42 42">
        <circle
          className="circle"
          cx="21"
          cy="21"
          r="15.91549430918954"
        ></circle>
      </svg>
      <div className="counter">
        {isDone ? "GO!" : <Counter count={props.count} onDone={onDone} />}
      </div>
    </Wrapper>
  );
};

export default StartCounter;
