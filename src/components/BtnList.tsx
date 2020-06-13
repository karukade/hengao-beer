import styled from "styled-components";

const BtnList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > * {
    width: 100%;
  }
  > * + * {
    margin-top: 20px;
  }
`;

export default BtnList;
