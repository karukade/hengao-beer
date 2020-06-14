import React from "react";
import styled from "styled-components";

const Img = styled.img`
  display: block;
  width: 48%;
  margin-bottom: 10px;
`;

const HengaoDetectorImg: React.FC<{ src?: string }> = ({ src }) =>
  src ? <Img src={src} alt="" /> : null;

export default React.memo(HengaoDetectorImg);
