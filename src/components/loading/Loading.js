import React from "react";

const Loading = ({message}) => {
  return (
    <div className="fixed top-0 left-0 z-[9999] flex h-screen w-screen items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-transparent rounded-md p-3">
        <p className="text-sm text-white">{message}...</p>
      </div>
    </div>
  );
};

export default Loading;
