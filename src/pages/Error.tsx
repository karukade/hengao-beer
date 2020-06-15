import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { StateType } from "../reducers/";

const Message = styled.p`
  font-size: 1.7vmax;
  text-align: center;
  font-weight: bold;
`;

const Error: React.FC = () => {
  const err = useSelector((state: StateType) => state.app.appError);
  const message: {
    [key: string]: string;
  } = {
    NotAllowedError:
      "カメラの使用が許可されていないようです。URLバーのカメラアイコンから許可して遊んでね。",
    NotFoundError: "カメラが見つかりません。カメラを接続して遊んでね。",
    MediaDeviceNotSupport:
      "ブラウザがカメラをサポートしていません。。Chromeで遊んでね。",
  };
  console.log(err, "😇");
  return (
    <Message>
      {err && message[err]
        ? message[err]
        : "原因不明なエラーが発生しました。。リロードしてやり直してみてください。"}
    </Message>
  );
};

export default Error;
