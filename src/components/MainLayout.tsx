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
    align-items: center;
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
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  border-radius: 20px;
  > video {
    position: absolute;
    top: 0;
    width: 100%;
  }
  > .video-overlay {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
    z-index: 2;
  }
  > .message {
    position: absolute;
    bottom: 0;
    z-index: 2;
  }
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
          {videoOverLay && <div className="video-overlay">{videoOverLay}</div>}
          <div className="message">{message}</div>
        </VideoContainer>
      </div>
      <div className="right"></div>
    </Container>
  );
};

export default MainLayout;
