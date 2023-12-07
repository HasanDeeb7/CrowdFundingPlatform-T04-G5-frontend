import React from "react";
import { Hearts } from "react-loader-spinner";
import "./Loading.css";

function Loading() {
  return (
    <div className="loadingContainer">
      <Hearts
        height="130"
        width="130"
        color="var(--light-gold-clr)"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loading;
