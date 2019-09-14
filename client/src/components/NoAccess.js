import React from "react";
import { redirectToList } from "../redirection";

const NoAccess = () => {
  setTimeout(redirectToList, 5000);
  return (
    <div className="ui container">
      <div className="ui negative message">
        <div className="header">You do not have access to this page</div>
        <p>Only the stream creator can delete/edit the stream</p>
      </div>
      <div className="ui divider"></div>
      <div style={{ textAlign: "center" }}>
        <div className="ui inline active loader" />
        <p>Redirecting you to the stream list</p>
      </div>
    </div>
  );
};

export default NoAccess;
