import { createSlice } from "@reduxjs/toolkit";

interface BookShelfStates {
  signup_data: Object;
  all_books: [
    {
      book: {
        author: string;
        cover: string;
        id: number;
        isbn: string;
        pages: number;
        published: number;
        title: string;
      };
      status: number | string;
    }
  ];
  searched_books: [
    {
      book: {
        author: string;
        cover: string;
        id: number;
        isbn: string;
        pages: number;
        published: number;
        title: string;
      };
      status: number | string;
    }
  ];
  created_book: {
    book: {
      author: string;
      cover: string;
      id: number;
      isbn: string;
      pages: number;
      published: number;
      title: string;
    };
  };
  edited_book: {
    book: {
      author: string;
      cover: string;
      id: number;
      isbn: string;
      pages: number;
      published: number;
      title: string;
    };
    status: number;
  };
  alertOpen: boolean;
  progress: boolean;
}
const initialState: BookShelfStates = {
  signup_data: {},
  all_books: [
    {
      book: {
        author: "",
        cover: "",
        id: 0,
        isbn: "",
        pages: 0,
        published: 0,
        title: "",
      },
      status: 0,
    },
  ],
  searched_books: [
    {
      book: {
        author: "",
        cover: "",
        id: 0,
        isbn: "",
        pages: 0,
        published: 0,
        title: "",
      },
      status: 0,
    },
  ],
  created_book: {
    book: {
      author: "",
      cover: "",
      id: 0,
      isbn: "",
      pages: 0,
      published: 0,
      title: "",
    },
  },
  edited_book: {
    book: {
      author: "",
      cover: "",
      id: 0,
      isbn: "",
      pages: 0,
      published: 0,
      title: "",
    },
    status: 0,
  },
  alertOpen: false,
  progress: false,
};
const bookShelfSlice = createSlice({
  name: "bookShelfSlice",
  initialState: initialState,
  reducers: {
    SetSignUp(state, action) {
      state.signup_data = action.payload;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          k: action.payload.data.key,
          s: action.payload.data.secret,
        })
      );
    },
    SetEmpty(state, action) {
      if (action.payload == true) {
        state.searched_books = [
          {
            book: {
              author: "",
              cover: "",
              id: 0,
              isbn: "",
              pages: 0,
              published: 0,
              title: "",
            },
            status: 0,
          },
        ];
      }
      console.log("SEARCHED", state.searched_books);
    },
    SetAllBooks(state, action) {
      console.log("action.payload all", action.payload?.data);
      state.all_books = action.payload?.data;
      console.log("all", state.all_books);
    },
    SetEditBook(state, action) {
      console.log("edited book action.payload", action.payload);
      state.edited_book = action.payload;
    },
    SetCreateBook(state, action) {
      console.log("created book action.payload", action.payload);
      state.created_book = action.payload?.data;
      state.all_books?.unshift({
        book: {
          author: action.payload?.data.author,
          cover: action.payload?.data.cover,
          id: action.payload?.data.id,
          isbn: action.payload?.data.isbn,
          pages: action.payload?.data.pages,
          published: action.payload?.data.published,
          title: action.payload?.data.title,
        },
        status: 0,
      });
    },
    SetSuccessAlert(state, action) {
      state.alertOpen = action.payload;
    },
    SetSearchedBooks(state, action) {
      for (let i = 0; i < state.all_books.length; i++) {
        if (
          state.all_books[i]?.book?.title
            .toLowerCase()
            .split(" ")
            .includes(action.payload.toLowerCase())
        ) {
          state.searched_books?.unshift(state.all_books[i]);
        }
      }
      console.log("SEARCHED", state.searched_books);
    },
    SetLinearProgress(state, action) {
      state.progress = action.payload;
    },
  },
});

export const {
  SetEmpty,
  SetSignUp,
  SetAllBooks,
  SetEditBook,
  SetCreateBook,
  SetSuccessAlert,
  SetSearchedBooks,
  SetLinearProgress,
} = bookShelfSlice.actions;
export default bookShelfSlice.reducer;
