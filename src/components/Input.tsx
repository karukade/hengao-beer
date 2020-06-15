import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  border: none;
  background-color: #efefef;
  border-radius: 4px;
  padding: 0.5em;
  font-size: 1.7vmax;
`;

const StyledLabel = styled.span`
  display: block;
  font-size: 1.2vmax;
  margin-bottom: 0.5em;
`;

const Input: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
  }
> = ({ onChange, label, ...attrs }) => (
  <div>
    <StyledLabel>{label}</StyledLabel>
    <StyledInput onChange={onChange} {...attrs} />
  </div>
);

export default Input;
