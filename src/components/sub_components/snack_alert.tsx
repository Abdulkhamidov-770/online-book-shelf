import { forwardRef } from "react";
import { Snackbar } from "@mui/material";
import { useAppDispatch} from "../../app/hooks";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SetSuccessAlert } from "../reducer/bookShelfSlice";

type SnackProps = {
  alertSatate: boolean;
};

export default function SnackAlert(props: SnackProps) {
  const dispatch = useAppDispatch();
  const HandleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(SetSuccessAlert(false));
  };
  return (
    <>
      <Snackbar
        onClose={HandleClose}
        autoHideDuration={2000}
        open={props.alertSatate}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={HandleClose} severity="success" sx={{ width: "100%" }}>
          Muvaffaqqiyatli yakunlandi!
        </Alert>
      </Snackbar>
    </>
  );
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
