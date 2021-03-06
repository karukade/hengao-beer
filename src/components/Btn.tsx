import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-size: 1.8vmax;
  font-weight: bold;
  padding: 1em 1.5em;
  text-align: center;
  border-radius: 100px;
  color: #333;
  background-color: #fff;
  box-shadow: 0px 13px 39px 11px rgba(0, 0, 0, 0.1);
  border: none;
  min-width: 300px;
  transition: all 0.2s ease;
  line-height: 1;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    transform: scale(0.99);
    box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Btn: React.FC<{ onClick: () => void }> = ({ onClick, children }) => (
  <Button onClick={onClick}>{children}</Button>
);

export default Btn;
