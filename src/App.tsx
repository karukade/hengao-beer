import React, { useRef, useState } from "react";
import { Transition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { thunkInitApp } from "./actions/app";
import { thunkPrepareMatcher } from "./actions/faceApi";
import Instruction from "./components/Instruction";
// import Spinner from "./components/Spinner";
import UserVideo from "./components/UserVideo";
import Btn from "./components/Btn";
import AnimWrapper from "./components/AnimWrapper";

import { StateType } from "./reducers";

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VideoContainer = styled.div<{ state: string }>`
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: ${({ state }) =>
    state === "entered" ? `translateY(0)` : `translateY(-100%)`};
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const BtnContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const App: React.FC = () => {
  const [start, setStart] = useState(false);
  const ref = useRef<null | HTMLVideoElement>(null);
  const dispatch = useDispatch();
  const appState = useSelector((state: StateType) => state.app);

  const onClick = () => {
    if (!ref.current) return;
    dispatch(thunkInitApp(ref.current));
  };

  const startInstruction = () => {
    setStart(true);
  };

  const takeDefaultFace = () => {
    console.log(ref.current);
    if (!ref.current) return;
    dispatch(thunkPrepareMatcher(ref.current));
  };
  return (
    <Container>
      {/* {!appState.ready && appState.preparing && <Spinner />} */}
      <BtnContainer>
        <Transition
          in={!appState.preparing && !appState.ready}
          timeout={500}
          unmountOnExit
        >
          {(state) => (
            <AnimWrapper state={state}>
              <Btn onClick={onClick}>START</Btn>
            </AnimWrapper>
          )}
        </Transition>
        {start && (
          <div>
            <Instruction state={"prepareMatcher"} />
            <Btn onClick={takeDefaultFace}>通常の顔を撮影する</Btn>
          </div>
        )}
      </BtnContainer>
      <Transition
        onEntered={startInstruction}
        in={appState.ready}
        timeout={200}
      >
        {(state) => (
          <VideoContainer state={state}>
            <UserVideo ref={ref} />
          </VideoContainer>
        )}
      </Transition>
    </Container>
  );
};

export default App;
