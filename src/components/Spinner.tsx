import React from "react";
import styled, { keyframes } from "styled-components";

import Ico from "../assets/img/ico-message.png";

const spin = keyframes`
100% {
    transform: rotate(720deg);
  }
`;

const fadeIn = keyframes`
  100% {
    opacity: 1;
  }
`;

const Img = styled.img`
  animation: ${spin} 2.5s cubic-bezier(0.38, 0.12, 0.56, 0.9) infinite,
    ${fadeIn} 0.2s ease forwards;
`;

const Spinner: React.FC = () => <Img src={Ico} />;

export default Spinner;
