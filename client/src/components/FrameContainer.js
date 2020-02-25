import React from "react";

const FrameContainer = ({ url, frameStyles }) => {
  const frameStylesMerged = {
    ...{
      width: "100vw",
      height: "80vh",
      border: "none",
      display: "fixed"
    },
    ...frameStyles
  };

  return (
    <object
      data={url}
      type="text/html"
      style={frameStylesMerged}
      allowFullScreen={true}
      mozallowfullscreen="true"
      msallowfullscreen="true"
      webkitallowfullscreen="true"
    >
      <p>Página não encontrada</p>
    </object>
  );
};

export default FrameContainer;
