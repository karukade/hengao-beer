import React from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  position: absolute;
  opacity: 0;
`;

export default React.forwardRef<HTMLCanvasElement>((props, ref) => (
  <Canvas width="300" height="300" ref={ref} />
));
