import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Alert } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LinearProgres from "./sub_components/linear_progress";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { SET_SIGN_UP } from "../app/saga/types";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();
export default function SignUp() {
  const { progress } = useAppSelector((state) => state.bookShelfSlice);
  const dispatch = useAppDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch({
      type: SET_SIGN_UP,
      payload: {
        name: data.get("name"),
        email: data.get("email"),
        key: data.get("key"),
        secret: data.get("secret"),
      },
    });
  };
  return (
    <>
      {progress ? <LinearProgres /> : ""}
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box className="signup-box">
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Alert severity="info" sx={{ bgcolor: "#005a80"  }}>
              If have an account entering only <b>KEY</b> and <b>SECRET</b>
            </Alert>
            <Box
              noValidate
              sx={{ mt: 3 }}
              component="form"
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="name"
                    autoFocus
                    fullWidth
                    name="name"
                    label="Name"
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="key"
                    fullWidth
                    name="key"
                    label="Set any key"
                    autoComplete="keyname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="secret"
                    name="secret"
                    label="Set any secret"
                    autoComplete="new-secret"
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up (or Sign In)
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
