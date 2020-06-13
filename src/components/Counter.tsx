import React, { useEffect, useState } from "react";
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
  hasCircle?: boolean;
  fontSize?: number | string;
  color?: string;
  doneTxt: string;
};

const Counter: React.FC<CounterProps> = ({
  onDone,
  count,
  fontSize = "7.9vw",
  doneTxt,
  color = "#fff",
}) => {
  const [c, setCount] = useState<number | string>(count);
  const msCount = count * 1000;
  useEffect(() => {
    const to = new Date().getTime() + msCount;
    let timer = setInterval(() => {
      const dur = to - new Date().getTime();
      setCount((count) => {
        if (count === doneTxt) return count;
        const int = (count as number) - 1;
        return int === 0 ? doneTxt : int;
      });
      if (dur <= -1) {
        clearInterval(timer);
        onDone();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [doneTxt, msCount, onDone]);

  return (
    <Span color={color} fontSize={fontSize}>
      {c}
    </Span>
  );
};

export default React.memo(Counter);
