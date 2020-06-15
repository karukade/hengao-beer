import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { setAppState, appState } from "../actions/app";
import BtnList from "../components/BtnList";
import Btn from "../components/Btn";
import Dialog from "../components/Dialog";
import DeviceSettingModal from "../components/DeviceSettingModal";

const Instructions = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  width: 100%;
  max-width: 75vmax;
`;

const Instruction = styled.dl`
  flex-basis: 33.333%;
  padding: 0 26px;
  font-weight: bold;
  text-align: center;
  dt {
    border: solid #333 3px;
    border-radius: 50%;
    width: 68px;
    height: 68px;
    font-size: 30px;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    background-color: rgba(255, 255, 255, 0.7);
  }
  dd {
    font-size: 1.7vmax;
    line-height: 1.8;
    letter-spacing: 0.02em;
    text-shadow: 0 0 3px #fff;
  }
`;

const Start: React.FC = () => {
  const [dialogShow, setDialogShow] = useState(false);
  const dispatch = useDispatch();
  const onClick = () => dispatch(setAppState(appState.START_APP));
  const showDialog = () => setDialogShow(true);
  const closeDialog = () => setDialogShow(false);
  return (
    <>
      <Instructions>
        <Instruction>
          <dt>1</dt>
          <dd>
            変顔を判定するために
            <br />
            基準となる真顔を
            <br />
            撮影するよ。
          </dd>
        </Instruction>
        <Instruction>
          <dt>2</dt>
          <dd>
            真顔が撮影できたら
            <br />
            変顔スタート！
          </dd>
        </Instruction>
        <Instruction>
          <dt>3</dt>
          <dd>
            制限時間内で変顔を
            <br />
            ５秒間維持できれば
            <br />
            ビールゲット！
          </dd>
        </Instruction>
      </Instructions>
      <BtnList>
        <Btn onClick={showDialog}>BLEデバイス情報をセットして遊ぶ</Btn>
        <Btn onClick={onClick}>デバイスなしで遊ぶ</Btn>
      </BtnList>
      <Dialog onClose={closeDialog} show={dialogShow}>
        <DeviceSettingModal />
      </Dialog>
    </>
  );
};

export default Start;
