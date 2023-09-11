import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { SetEmpty, SetSearchedBooks } from "./reducer/bookShelfSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "40vw",
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "62ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function SearchBook() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (value == "") {
      dispatch(SetEmpty(true));
    }
    dispatch(SetSearchedBooks(value));
  }, [value]);
  return (
    <div className="d-flex">
      <Search
        onInput={(e: any) => {
          setValue(e.target.value);
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search book…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </div>
  );
}
