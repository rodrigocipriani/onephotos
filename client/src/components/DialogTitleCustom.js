import { DialogTitle, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import React from "react";

const DialogTitleCustom = ({ title, onClose }) => {
  const toggleIsCommentsOpen = () => {
    onClose();
  };

  return (
    <DialogTitle
      disableTypography
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "move",
        paddingTop: 0,
        paddingBottom: 0
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "default"
        }}
      >
        {title}
      </div>
      <IconButton
        onClick={toggleIsCommentsOpen}
        style={{
          display: "flex",
          alignSelf: "flex-start"
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

DialogTitleCustom.propTypes = {
  title: PropTypes.any,
  onClose: PropTypes.func
};

DialogTitleCustom.defaultProps = {
  title: null,
  onClose: () => {
    console.log("onClose not implemented");
  }
};

export default DialogTitleCustom;
