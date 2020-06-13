import React from "react";
import { AppStateType } from "../reducers/app";

const HengaoList: React.FC<{ items: AppStateType["hengao"] }> = ({ items }) => {
  const images = items.map((item) => <img src={item} alt="" key={item} />);
  console.log("render");
  return <>{images}</>;
};

export default React.memo(HengaoList);
