import React from "react";

const HtmlElement = ({ html, text }) => {
  const content = html ? html : text.replace(/(?:\r\n|\r|\n)/g, "<br />");
  return (
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};

export default HtmlElement;
