import React from "react";

export default React.forwardRef<HTMLVideoElement>((props, ref) => (
  <video ref={ref} />
));
