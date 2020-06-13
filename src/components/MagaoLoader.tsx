import React from "react";
import styled from "styled-components";

const Loader = styled.div`
  font-size: 40px;
  color: #fff;
`;

const MagaoLoader: React.FC<{ ready: boolean }> = ({ ready }) => (
  <Loader>{ready ? "撮影完了！" : "真顔撮影中..."}</Loader>
);

export default MagaoLoader;
