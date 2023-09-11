import { useState } from "react";
import BookList from "./sub_components/book_list";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, TextField } from "@mui/material";
import { SET_CREATE_BOOK } from "../app/saga/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export default function BookListApp() {
  const dispatch = useAppDispatch();
  const [book, addBook] = useState("");
  const { all_books, searched_books } = useAppSelector(
    (state) => state.bookShelfSlice
  );
  const HandleAddBook = () => {
    dispatch({
      type: SET_CREATE_BOOK,
      payload: {
        isbn: book,
      },
    });
  };
  return (
    <>
      <Box className={"add-box"}>
        <TextField
          inputProps={{
            color: "white",
          }}
          fullWidth
          id="fullWidth"
          label="ISBN code..."
          onInput={(e: any) => {
            addBook(e.target.value);
          }}
        />
        <Button
          className="btn"
          color="success"
          variant="contained"
          endIcon={<AddIcon />}
          onClick={HandleAddBook}
        >
          create book
        </Button>
      </Box>
      {all_books?.length > 0 ? (
        <BookList
          data={
            searched_books.length > 1 && searched_books[0]?.book?.id != 0
              ? searched_books
              : all_books
          }
        />
      ) : (
        <div className="empty_shelf">
          <InfoIcon color="success" fontSize="large" />
          There are no books in the library yet...
        </div>
      )}
    </>
  );
}
