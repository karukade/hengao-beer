import React from "react";
import styled from "styled-components";

import BtnList from "../components/BtnList";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 100vh;
  grid-template-columns: 1fr 52% 1fr;
`;

const Main = styled.div`
  grid-row: 1;
  grid-column: 2;
  display: flex;
  align-items: center;
`;

const Sides = styled.div`
  grid-row: 1;
`;

const Left = styled(Sides)`
  grid-column: 1;
`;

const Right = styled(Sides)`
  grid-column: 3;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  > video {
    border-radius: 20px;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

const VideoOverLay = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  z-index: 2;
`;

const Message = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 2;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
`;

const LimitTimer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Status = styled.div`
  position: absolute;
  left: 0;
  top: 30px;
  transform: translateX(-60%);
  z-index: 3;
`;

type PropsType = {
  video?: React.ReactNode;
  videoOverlay?: React.ReactNode;
  actionBtn?: React.ReactNode;
  message?: React.ReactNode;
  status?: React.ReactNode;
  limitTimer?: React.ReactNode;
  aside?: React.ReactNode;
};

const MainLayout: React.FC<PropsType> = ({
  video,
  videoOverlay,
  actionBtn,
  message,
  status,
  limitTimer,
  aside,
}) => {
  return (
    <Container>
      <Main>
        <VideoContainer>
          {video}
          <Status>{status}</Status>
          <VideoOverLay>
            {videoOverlay}
            <BtnList>{actionBtn}</BtnList>
          </VideoOverLay>
          <Message>{message}</Message>
          <LimitTimer>{limitTimer}</LimitTimer>
        </VideoContainer>
      </Main>
      <Right>{aside}</Right>
    </Container>
  );
};

export default MainLayout;
