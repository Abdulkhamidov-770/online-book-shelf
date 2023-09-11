import { useEffect } from "react";
import { Grid } from "@mui/material";
import Navbar from "./components/navbar";
import SignUp from "./components/sign_up";
import ReviewForm from "./components/edit";
import { SET_ALL_BOOKS } from "./app/saga/types";
import BookListApp from "./components/book_list_app";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import SnackAlert from "./components/sub_components/snack_alert";
import HashApp from "./hash_generator";

function App() {
  const dispatch = useAppDispatch();
  const { alertOpen } = useAppSelector((state) => state.bookShelfSlice);
  useEffect(() => {
    // const a = MD5("salom")
    // console.log('hashhhh', a);
    
    dispatch({ type: SET_ALL_BOOKS });
  }, []);
  return (
    <div className="App">
      {localStorage.getItem("auth") ? ( // localstorage method => is only for test project, this method is not safe
        <>
          <SnackAlert alertSatate={alertOpen} />
          <Navbar />
          <Grid container spacing={3} alignItems={"center"}>
            <Grid item xs={12} md={8} lg={8} pl={1} mb={14}>
              <BookListApp />
            </Grid>
            <Grid item xs={12} md={4} lg={4} mb={14}>
              <ReviewForm />
            </Grid>
          </Grid>
        </>
      ) : (
        <SignUp />
      )}
      {/* <HashApp/> */}
    </div>
  );
}
export default App;
