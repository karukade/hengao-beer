import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-size: 30px;
  padding: 0.5em;
  text-align: center;
  border-radius: 100px;
  color: #fff;
  background: linear-gradient(to right, #ff416c, #ff4b2b);
  box-shadow: 0px 13px 30px 0px #ff050563;
  border: none;
  min-width: 300px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    transform: scale(0.99);
    box-shadow: 0px 5px 20px 0px #ff050563;
  }
`;

const Btn: React.FC<{ onClick: () => void }> = ({ onClick, children }) => (
  <Button onClick={onClick}>{children}</Button>
);

export default Btn;
