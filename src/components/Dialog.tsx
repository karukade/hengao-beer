import React from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";

type TransitionState = "entering" | "entered" | "exiting" | "exited";

const duration = 150;

const BackDrop = styled.div<{ state: TransitionState }>`
  opacity: ${({ state }) => (state === "entered" ? 1 : 0)};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  transition: opacity ${duration}ms cubic-bezier(0.34, 0, 1, 0.98);
`;

const Content = styled.div<{ state: TransitionState }>`
  position: relative;
  min-width: 60%;
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  transform: ${({ state }) =>
    state === "entered" ? "translateY(0)" : "translateY(-15px)"};
  transition: transform ${duration}ms cubic-bezier(0.34, 0, 1, 0.98);
`;

const CloseBtn = styled.button`
  position: absolute;
  cursor: pointer;
  border: none;
  width: 20px;
  height: 20px;
  right: 10px;
  top: 10px;
  &:before,
  &:after {
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    content: "";
    height: 2px;
    width: 100%;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

type PropsType = {
  onClose?: () => void;
  show: boolean;
};

const DeviceSettingModal: React.FC<PropsType> = ({
  onClose,
  show,
  children,
}) => {
  const onCloseClick = () => {
    if (onClose) onClose();
  };
  return (
    <Transition in={show} timeout={duration} unmountOnExit>
      {(state: TransitionState) => (
        <BackDrop state={state}>
          <Content state={state}>
            <CloseBtn onClick={onCloseClick} />
            {children}
          </Content>
        </BackDrop>
      )}
    </Transition>
  );
};

export default DeviceSettingModal;
