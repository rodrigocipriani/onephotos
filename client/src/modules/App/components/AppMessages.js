import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";

const AppMessages = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { newMessage } = useSelector(state => state.appReducer);

  useEffect(() => {
    if (newMessage) {
      enqueueSnackbar(newMessage.text, {
        variant: newMessage.type || "default",
        action: (props, key) => (
          <Button
            style={{ color: "#fff" }}
            onClick={() => {
              closeSnackbar(key);
            }}
          >
            {"OK"}
          </Button>
        )
      });
    }
  }, [newMessage]);

  return <Fragment />;
};

export default AppMessages;
