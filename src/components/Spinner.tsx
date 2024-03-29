import React from "react";
import styled, { keyframes } from "styled-components";
import { Transition } from "react-transition-group";

import Ico from "../assets/img/ico-message.svg";

const spin = keyframes`
50% {
  transform: scale(1.5) rotate(360deg);
}
100% {
    transform: scale(1) rotate(720deg);
  }
`;

const fadeIn = keyframes`
  100% {
    opacity: 1;
  }
`;

const Wrapper = styled.div<{ state: TransitionState }>`
  transform: ${({ state }) =>
    state === "entered" ? "translateY(0)" : "translateY(-100px)"};
  opacity: ${({ state }) => (state === "entered" ? 1 : 0)};
  transition: transform 0.2s cubic-bezier(0.58, -0.29, 0, 0.95),
    opacity 0.2s ease;
`;

const Img = styled.div`
  animation: ${spin} 1.8s cubic-bezier(0.52, 0.31, 0.39, 0.44) infinite,
    ${fadeIn} 0.2s ease forwards;
`;

const Spinner: React.FC<{ show: boolean }> = ({ show }) => (
  <Transition in={show} timeout={200} unmountOnExit>
    {(state: TransitionState) => (
      <Wrapper state={state}>
        <Img>
          <svg
            width="61"
            height="68"
            viewBox="0 0 61 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.1735 1.42291C20.3496 2.91999 14.9019 3.24564 10.2381 5.20936L3.13847 18.2516C-2.97052 23.1388 1.8435 38.6717 2.87553 44.9671C4.32829 53.8289 7.20467 63.1541 16.9169 65.5822C24.9327 67.5861 32.5448 67.4754 41.003 67.4754C51.0708 67.4754 60.4085 60.572 60.4085 50.226C60.4085 40.7322 60.0123 31.9204 58.5153 22.5639C57.6818 17.3545 54.8464 14.7245 52.3097 10.5735C46.1907 0.560573 36.1065 -1.97008 25.1735 1.42291Z"
              fill="white"
            />
            <path
              d="M25.2625 25.8446C25.2625 28.6385 25.2625 31.4324 25.2625 34.2263"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.3996 21.5476C16.2672 20.8523 15.5626 19.037 16.6859 18.9709C17.6892 18.9119 18.5887 18.1241 18.6741 19.5753C18.7034 20.0724 19.0296 21.5476 18.2606 21.5476C17.8837 21.5476 16.7696 21.7357 16.6859 21.2613C16.2272 18.6619 17.8349 22.3218 17.5289 23.3927C17.4343 23.7239 17.0485 23.3365 16.9722 23.2018C16.577 22.5044 16.6859 21.5208 16.6859 20.7523C16.6859 20.1574 16.3968 19.0361 17.3221 19.3208C18.0005 19.5296 18.4037 19.6437 18.4037 20.4024C18.4037 21.5177 17.9555 20.4531 17.688 20.132C17.3808 19.7634 17.8311 21.3095 17.8311 21.6749C17.8311 22.6269 17.4972 21.0527 17.4812 21.0386C17.2485 20.8351 17.2585 24.5274 17.2585 23.1223C17.2585 21.7446 18.7037 23.0201 18.1174 21.2613"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32.4324 20.6887C34.3333 22.1738 32.4242 22.0228 32.7347 20.0048C32.8816 19.0494 34.4612 19.4044 34.4366 20.466C34.386 22.6412 33.1786 22.8854 32.5915 20.7046C31.9556 18.3425 33.0958 19.358 33.8003 20.6887C34.0463 21.1533 34.391 20.8125 34.4366 20.4024C34.5269 19.5892 34.9348 20.2805 34.5638 20.3865C33.6232 20.6553 33.0763 19.7266 32.7824 18.9709C32.7385 18.8581 34.4366 18.2782 34.4366 19.6867C34.4366 20.8562 33.005 20.1759 33.005 20.4024"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.0508 40.7782C23.0339 40.8493 25.848 41.621 28.9001 41.621C29.7385 41.621 34.0175 41.621 32.6926 41.621"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25.6803 4.28143C21.3361 5.62965 16.43 5.92293 12.2299 7.6914L5.83621 19.4368C0.33463 23.8381 4.67 37.8266 5.59941 43.496C6.90773 51.4768 9.49811 59.8748 18.2447 62.0614C25.4635 63.8661 32.3187 63.7664 39.9359 63.7664C49.0027 63.7664 57.4119 57.5494 57.4119 48.2321C57.4119 39.6823 57.0551 31.7466 55.707 23.3204C54.9563 18.629 52.4029 16.2604 50.1184 12.5222C44.6078 3.50484 35.5262 1.2258 25.6803 4.28143Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Img>
        <div style={{ margin: "30px 0 0", fontWeight: "bold" }}>LOADING...</div>
      </Wrapper>
    )}
  </Transition>
);

export default Spinner;
