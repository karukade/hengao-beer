import React, { useState } from "react";
import Spinner from "./components/Spinner";
import AppLayout from "./components/AppLayout";

const Test = () => {
  const [show, setShow] = useState(false);
  const onClick = () => setShow((show) => !show);
  return (
    <AppLayout>
      <Spinner show={show} />
      <button
        style={{ position: "absolute", left: "30px", top: "30px" }}
        onClick={onClick}
      >
        Toggle
      </button>
    </AppLayout>
  );
};

export default Test;
