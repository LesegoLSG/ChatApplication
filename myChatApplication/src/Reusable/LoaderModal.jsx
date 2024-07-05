import React from "react";

const LoaderModal = () => {
  return (
    // Overlay to cover the whole screen and darken the background slightly
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      {/* Container for the bouncing dots */}
      <div className="flex space-x-2">
        {/* Each dot with bouncing animation */}
        <div
          className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
};

export default LoaderModal;
