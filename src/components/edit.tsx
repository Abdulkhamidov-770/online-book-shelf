import * as React from "react";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { SetEditBook } from "./reducer/bookShelfSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SET_ALL_BOOKS, SET_EDIT_BOOK } from "../app/saga/types";

export default function ReviewForm() {
  const edited_book = useAppSelector(
    (state) => state.bookShelfSlice.edited_book
  );
  const dispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(
      SetEditBook({
        book: edited_book?.book,
        status: event.target.value as string,
      })
    );
  };
  const HandleEdit = () => {
    dispatch({
      type: SET_EDIT_BOOK,
      payload: {
        status: Number(edited_book?.status),
        id: edited_book?.book?.id,
      },
    });
    setTimeout(() => {
      dispatch({ type: SET_ALL_BOOKS });
    }, 1000);
  };
  return (
    <div className="review-form">
      <Typography variant="h6" gutterBottom>
        {edited_book?.book?.title} details
      </Typography>
      <Grid container spacing={2}>
        {(edited_book?.book != null || edited_book?.book != undefined) &&
          Object.keys(edited_book?.book)?.map((key, i) => (
            <Grid item xs={12} sm={12} key={i}>
              <TextField
                disabled
                value={Object.values(edited_book?.book)[i]}
                id={key}
                name={key}
                label={key == "cover" ? "Image URL" : key}
                fullWidth
                autoComplete="given-id"
                variant="standard"
              />
            </Grid>
          ))}
        <Grid item xs={12} sm={12}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-label">
              Status this book
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={edited_book?.status + ""}
              label="Status this book"
              onChange={handleChange}
            >
              <MenuItem value={0}>New book</MenuItem>
              <MenuItem value={1}>Reading now</MenuItem>
              <MenuItem value={2}>Finished</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} mt={2}>
          <Button
            onClick={HandleEdit}
            variant="contained"
            color="success"
            fullWidth
          >
            Save (change only status)
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
