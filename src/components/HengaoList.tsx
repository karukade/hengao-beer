import React from "react";
import styled from "styled-components";

import { AppStateType } from "../reducers/app";

const Wrapper = styled.ul`
  max-height: 100vh;
  overflow-y: auto;
  text-align: center;
  overflow: auto;
  > li {
    padding: 20px;
  }
  img {
    margin: auto;
    border-radius: 10px;
  }
`;

const HengaoList: React.FC<{ items: AppStateType["hengao"] }> = ({ items }) => {
  const images = items.map((item) => (
    <li key={item}>
      <img src={item} alt="" />
    </li>
  ));
  return <Wrapper>{images}</Wrapper>;
};

export default React.memo(HengaoList);
