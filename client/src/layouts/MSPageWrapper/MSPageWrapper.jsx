import React from "react";
import MSMenu from "../../components/MSMenu/MSMenu";
import "./MSPageWrapper.scss";

const MSPageWrapper = ({ children }) => {
  return (
    <div className="page-wrapper" id="outer-container">
      <MSMenu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <div className="content-wrapper" id="page-wrap">
        {children}
      </div>
    </div>
  );
};

export default MSPageWrapper;
