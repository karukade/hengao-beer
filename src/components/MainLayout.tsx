import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 100vh;
  grid-template-columns: 1fr 52% 1fr;
  > .main {
    grid-row: 1;
    grid-column: 2;
    display: flex;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  > .left {
    grid-row: 1;
    grid-column: 1;
  }
  > .right {
    grid-row: 1;
    grid-column: 3;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  > video {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    z-index: 1;
  }
`;

const VideoOverlay = styled.div`
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
  position: relative;
  z-index: 2;
`;

type PropsType = {
  video?: React.ReactNode;
  videoOverLay?: React.ReactNode;
  message?: React.ReactNode;
  status?: React.ReactNode;
};

const MainLayout: React.FC<PropsType> = ({
  video,
  videoOverLay,
  message,
  status,
}) => {
  return (
    <Container>
      <div className="main">
        {status}
        <VideoContainer>
          {video}
          {videoOverLay && <VideoOverlay>{videoOverLay}</VideoOverlay>}
          <Message>{message}</Message>
        </VideoContainer>
      </div>
      <div className="right"></div>
    </Container>
  );
};

export default MainLayout;
