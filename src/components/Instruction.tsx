import React from "react";
import styled from "styled-components";

const Div = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: #fff;
  padding: 1em;
`;

const instructions = {
  prepareMatcher: "まずは、通常の顔をとるよ。",
  beforeStart:
    "ノーマルモードの顔がとれたよ！変顔の準備ができたらSTARTを押してとびっきりの変顔をみせてくれよな！",
  playingNice: "ナイス変顔！その調子！",
};

const Instruction: React.FC<{ state: keyof typeof instructions }> = ({
  state,
}) => {
  return <Div>{instructions[state]}</Div>;
};

export default Instruction;
