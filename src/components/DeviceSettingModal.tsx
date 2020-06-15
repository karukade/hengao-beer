import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Btn from "../components/Btn";
import Input from "../components/Input";
import { setAppState, setDeviceInfo, appState } from "../actions/app";
import { DeviceInfo } from "../reducers/app";

type StateType = Partial<Exclude<DeviceInfo, null>>;

const Wrapper = styled.div`
  > * + * {
    margin-top: 20px;
  }
`;

const BtnWrapper = styled.div`
  margin-top: 36px;
  text-align: center;
  > * + * {
    margin-top: 20px;
  }
`;

const DeviceSettingModal: React.FC = () => {
  const dispatch = useDispatch();
  const [deviceInfo, setInfo] = useState<StateType>({
    serviceUUID: "",
    characteristicUUID: "",
    name: "",
  });
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((state) => ({
      ...state,
      [name]: value,
    }));
  }, []);
  const onClick = useCallback(() => {
    const isValid = Object.values(deviceInfo).every((s) => Boolean(s));
    console.log(deviceInfo);
    if (isValid) dispatch(setDeviceInfo(deviceInfo as DeviceInfo));
    dispatch(setAppState(appState.START_APP));
  }, [deviceInfo, dispatch]);

  return (
    <Wrapper>
      <Input label="Service UUID" onChange={onChange} name="serviceUUID" />
      <Input
        label="Characteristic UUID"
        onChange={onChange}
        name="characteristicUUID"
      />
      <Input label="Name" onChange={onChange} name="name" />
      <BtnWrapper>
        <Btn onClick={onClick}>Start</Btn>
        <p>
          やっぱりデバイスなしでいいやという方は入力せずスタートを押してください。
        </p>
      </BtnWrapper>
    </Wrapper>
  );
};

export default DeviceSettingModal;
