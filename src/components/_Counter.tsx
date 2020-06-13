import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Span = styled.span<{ fontSize: number | string; color: string }>`
  font-weight: bold;
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color }) => color};
  text-align: center;
  line-height: 1;
`;

export type CounterProps = {
  onDone: () => void;
  count: number;
  fontSize?: number | string;
  color?: string;
};

const Counter: React.FC<CounterProps> = ({
  onDone,
  count,
  fontSize = "7.9vw",
  color = "#fff",
}) => {
  const [c, setCount] = useState<number | string>(count);
  useEffect(() => {
    let innerCount = count;
    const timer = setInterval(() => {
      --innerCount;
      if (innerCount === 0) {
        if (timer) clearInterval(timer);
        onDone();
        return;
      }
      setCount((prevCount) => (prevCount as number) - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [count, onDone]);

  return (
    <Span color={color} fontSize={fontSize}>
      {c}
    </Span>
  );
};

export default React.memo(Counter);
