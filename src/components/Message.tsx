import React from "react";
import styled from "styled-components";
import { appState, APP_STATE_TYPE } from "../actions/app";

import Icon from "../assets/img/ico-message.png";

const Div = styled.div`
  position: relative;
  font-size: 2.5vw;
  font-weight: bold;
  color: #fff;
  padding: 1em 1em 1em 82px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.42) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  &:before {
    content: "";
    position: absolute;
    left: 34px;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: url(${Icon}) no-repeat center/ contain;
  }
`;

const messages: {
  [K in APP_STATE_TYPE]?: string;
} = {
  [appState.WAIT_MAGAO]: "まずは、真顔を撮影するよ",
  [appState.TAKING_MAGAO]: "撮影中だよ、そのままじっとしててね",
  [appState.WAIT_HENGAO]: "ナイス真顔!",
  [appState.FAIL_MAGAO_TAKE]:
    "真顔撮影に失敗したみたい。。リロードしてもう一度試してみてね。顔をもう少しカメラに近づけるか、部屋を明るくするといいかも。",
  [appState.READY_HENGAO]: "変顔スタートするよ！",
  [appState.DETECTING_HENGAO]: "恥をすてろ！",
  [appState.DETECTING_HENGAO_FILL]: "最高の変顔じゃないか！",
  [appState.SUCCESS_HENGAO]: "やるじゃん！",
  [appState.FAIL_HENGAO]: "もっかいがんばろ",
};

const Message: React.FC<{ state: APP_STATE_TYPE }> = ({ state }) => {
  if (!messages[state]) return null;
  return <Div>{messages[state]}</Div>;
};

export default Message;
