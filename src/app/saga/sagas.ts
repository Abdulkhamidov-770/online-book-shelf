import { call, put, takeEvery } from "redux-saga/effects";
import {
  signUpApi,
  editBookApi,
  getAllBooks,
  createBookApi,
  deleteBookApi,
} from "../../api";
import {
  SetSignUp,
  SetAllBooks,
  SetCreateBook,
  SetSuccessAlert,
  SetLinearProgress,
} from "../../components/reducer/bookShelfSlice";
import {
  SET_SIGN_UP,
  SET_ALL_BOOKS,
  SET_EDIT_BOOK,
  SET_CREATE_BOOK,
  SET_DELETE_BOOK,
} from "./types";

function* setSignUp(action: any) {
  yield put(SetLinearProgress(true));
  try {
    const resp: { data: { data: string } } = yield call(signUpApi, {
      name: action.payload.name,
      email: action.payload.email,
      key: action.payload.key,
      secret: action.payload.secret,
    });
    // console.log("sign-up resp", resp);
    yield put(SetSignUp(resp?.data));
    yield put(SetLinearProgress(false));
    window.location.reload();
  } catch (error: any) {
    yield put(
      SetSignUp({
        data: {
          key: action.payload.key,
          secret: action.payload.secret,
        },
      })
    );
    yield put(SetLinearProgress(false));
    window.location.reload();
    console.log("SignUp UP err => ", error);
  }
}
function* setAllBooks(): any {
  yield put(SetLinearProgress(true));
  try {
    const resp = yield getAllBooks();
    // console.log("get all books resp", resp);
    yield put(SetAllBooks(resp?.data));
    yield put(SetLinearProgress(false));
  } catch (error: any) {
    yield put(SetLinearProgress(false));
    console.log("get all books err => ", error);
  }
}
function* setCreateBook(action: any): any {
  yield put(SetLinearProgress(true));
  try {
    const resp: { data: { data: string } } = yield call(createBookApi, {
      isbn: action.payload.isbn,
    });
    // console.log("get created book resp", resp);
    yield put(SetCreateBook(resp?.data));
    yield put(SetLinearProgress(false));
  } catch (error: any) {
    yield put(SetLinearProgress(false));
    console.log("created book err => ", error);
  }
}
function* setDeleteBook(action: any): any {
  yield put(SetLinearProgress(true));
  try {
    const resp: { data: { data: string } } = yield call(deleteBookApi, {
      id: action.payload.id,
    });
    // console.log("DELETED book resp", resp);
    yield put(SetAllBooks(resp?.data));
    yield put(SetLinearProgress(false));
  } catch (error: any) {
    yield put(SetLinearProgress(false));
    console.log("DELETED ERR => ", error);
  }
}
function* setEditBook(action: any): any {
  yield put(SetLinearProgress(true));
  try {
    const resp: { data: { data: string } } = yield call(editBookApi, {
      status: action.payload.status,
      id: action.payload.id,
    });
    // console.log("EDITED book resp", resp);
    yield put(SetSuccessAlert(true));
    yield put(SetLinearProgress(false));
  } catch (error: any) {
    yield put(SetLinearProgress(false));
    console.log("EDITED ERR => ", error);
  }
}

function* mySaga() {
  yield takeEvery(SET_SIGN_UP, setSignUp);
  yield takeEvery(SET_ALL_BOOKS, setAllBooks);
  yield takeEvery(SET_EDIT_BOOK, setEditBook);
  yield takeEvery(SET_CREATE_BOOK, setCreateBook);
  yield takeEvery(SET_DELETE_BOOK, setDeleteBook);
}
export default mySaga;
