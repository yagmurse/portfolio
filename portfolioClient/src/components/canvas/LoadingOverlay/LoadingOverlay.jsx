import React from "react";
import "./LoadingOverlay.css";

const LoadingOverlay = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingOverlay;
