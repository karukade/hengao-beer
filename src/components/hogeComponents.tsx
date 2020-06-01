import React from "react";

// types
import { HogeStateType } from "../reducers/hoge";
import { HogeActions } from "../containers/hogeContainer";

type PropsType = HogeActions & HogeStateType;

const HogeContainer: React.FC<PropsType> = ({
  updateEmail,
  updateName,
  name,
  email,
}) => (
  <>
    <div>
      <input
        type="text"
        onChange={(e) => {
          updateName(e.target.value);
        }}
      />{" "}
      Name: {name}
    </div>
    <div>
      <input
        type="text"
        onChange={(e) => {
          updateEmail(e.target.value);
        }}
      />{" "}
      Email: {email}
    </div>
  </>
);

export default HogeContainer;
