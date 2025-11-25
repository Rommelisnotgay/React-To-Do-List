import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment } from "react";
import Alert from "@mui/material/Alert";

export default function Toast({ open, msg }) {
  const action = (
    <Fragment>
      <IconButton size="small" aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Note archived"
        action={action}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
