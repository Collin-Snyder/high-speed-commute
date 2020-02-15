import React from "react";

const Stoplight = ({color}) => {
  return <span className={`stoplight ${color}light`}></span>;
};

export default Stoplight;