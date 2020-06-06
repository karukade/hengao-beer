import React from "react";
import styled, { keyframes } from "styled-components";

// const line = keyframes`
//   0% {
//     stroke-dasharray: 2, 85.964;
//     transform: rotate(0);
//   }

//   50% {
//     stroke-dasharray: 65.973, 21.9911;
//     stroke-dashoffset: 0;
//   }

//   100% {
//     stroke-dasharray: 2, 85.964;
//     stroke-dashoffset: -65.973;
//     transform: rotate(90deg);
//   }
// `;

const rotate = keyframes`
from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  width: 100px;
  height: 100px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 3;
  circle {
    animation: ${rotate} 1.6s linear infinite;
    box-sizing: border-box;
    stroke-width: 3px;
    stroke-dasharray: 2, 85.964;
    transform-origin: 50%;
    fill: #18a682;
  }
`;

const Spinner: React.FC = () => (
  <>
    <Wrapper>
      LOADING...
      <svg viewBox="0 0 32 32" width="32" height="32">
        <circle cx="16" cy="16" r="14"></circle>
      </svg>
    </Wrapper>
  </>
);

export default Spinner;
