import styled from "styled-components";

const isAnimStartOrEnd = (state: string) =>
  state === "entering" || state === "exiting";

const AnimWrapper = styled.div<{ state: string }>`
  transition: all 0.5s ease-out;
  opacity: ${({ state }) => (isAnimStartOrEnd(state) ? 0 : 1)};
`;

export default AnimWrapper;
