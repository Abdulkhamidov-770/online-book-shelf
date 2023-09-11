import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchBook from "./search_book";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../app/hooks";
import LinearProgres from "./sub_components/linear_progress";

const Navbar = () => {
  const { progress } = useAppSelector(
    (state) => state.bookShelfSlice
  );
  return (
    <>
    <Box>
      <AppBar className={"navbar"} position="static">
        <Toolbar className="flex-around">
          <Typography variant="h6" component="div">
            My BookShelf
          </Typography>
          <SearchBook />
          <Box className="d-flex">
            <Typography variant="h6" component="div" mr={2}>
              User
            </Typography>
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Log out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    {progress ? <LinearProgres /> : ""}
    </>
  )
}
export default Navbar;
