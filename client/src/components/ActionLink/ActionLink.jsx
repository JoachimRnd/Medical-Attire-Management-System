import React from "react";
import { Link } from "react-router-dom";
const ActionLink = (props) => {
  return <Link to={props.path}>{props.arrow}</Link>;
};

export default ActionLink;
