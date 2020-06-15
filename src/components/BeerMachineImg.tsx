import React from "react";
import styled from "styled-components";

import BeerGif from "../assets/img/beer.gif";

const Img = styled.img`
  border-radius: 10px;
  margin: auto;
`;

const Wrapper = styled.figure`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  > figcaption {
    text-align: center;
    width: 100%;
    font-weight: bold;
    color: #fff;
    padding: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }
`;

const BeerMachineImg: React.FC = () => (
  <Wrapper>
    <Img src={BeerGif} alt="" />
    <figcaption>ビールお酌マシン</figcaption>
  </Wrapper>
);

export default BeerMachineImg;
