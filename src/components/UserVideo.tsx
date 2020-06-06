import React from "react";
import styled from "styled-components";

const Video = styled.video`
  display: block;
  position: absolute;
  min-width: 100vw;
  min-height: 100vh;
  z-index: 1;
`;

export default React.forwardRef<HTMLVideoElement>((props, ref) => (
  <Video ref={ref} />
));
