import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useEffect, useState } from "react";
import { IToastProps } from "./IToast";
import { eventEmitter } from "@/core/common/functions/generateEventEmitter";

export const Toast = () => {
  const [props, setProps] = useState<IToastProps>({
    open: false,
    message: "",
    autoHideDuration: 3000,
    severity: "error",
  });

  const handleShowAlert = (props: IToastProps) => {
    setTimeout(() => {
      setProps({ ...props, open: true });
    }, 0);

    const timer = setTimeout(() => {
      setProps((prev) => ({ ...prev, open: false }));
    }, props.autoHideDuration ?? 3000);

    const removeTimer = setTimeout(() => {
      setProps((prev) => ({ ...prev, open: false }));
    }, (props.autoHideDuration ?? 3000) + 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  };

  useEffect(() => {
    eventEmitter.on("showAlert", handleShowAlert);

    return () => {
      eventEmitter.off("showAlert", handleShowAlert);
    };
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setProps((prev) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar open={props.open} message={props.message} onClose={handleClose}>
      <Alert variant="filled" severity={props.severity} onClose={handleClose}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};
