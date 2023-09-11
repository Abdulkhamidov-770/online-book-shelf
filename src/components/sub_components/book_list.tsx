import {Chip} from "@mui/material";
import ActionsBtn from "./actions_btn";
import { useAppDispatch } from "../../app/hooks";
import ImageList from "@mui/material/ImageList";
import IconButton from "@mui/material/IconButton";
import { SET_DELETE_BOOK } from "../../app/saga/types";
import { SetEditBook } from "../reducer/bookShelfSlice";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

type initialProps = {
  data: [
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
};
export default function BookList(props: initialProps) {
  const dispatch = useAppDispatch();
  const { data } = props;
  return (
    <ImageList className="image-list" cols={4} rowHeight={500}>
      {data &&
        data?.map((item) =>
          item?.book?.id != 0 ? (
            <ImageListItem key={item?.book?.cover}>
              <img
                className="book_img"
                src={`${
                  item?.book?.cover == ""
                    ? "https://marketplace.canva.com/EAFersXpW3g/1/0/501w/canva-blue-and-white-modern-business-book-cover-ElMldfyhTrs.jpg"
                    : item?.book?.cover
                }`}
                srcSet={`${
                  item?.book?.cover ??
                  "https://marketplace.canva.com/EAFersXpW3g/1/0/501w/canva-blue-and-white-modern-business-book-cover-ElMldfyhTrs.jpg"
                }`}
                alt={item?.book?.title}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{ height: "38%" }}
                title={item?.book?.title.slice(0, 38) + "..."}
                subtitle={
                  <>
                    <p>Author: {item?.book?.author}</p>
                    <p>Isbn code: {item?.book?.isbn}</p>
                    <p>Published year: {item?.book?.published}</p>
                    <p>Pages: {item?.book?.pages}</p>
                    <p>
                      Status:{" "}
                      <Chip
                        label={
                          item?.status == 0
                            ? "New book"
                            : item?.status == 1
                            ? "Reading now"
                            : "FINISHED"
                        }
                        color={
                          item?.status == 0
                            ? "warning"
                            : item?.status == 1
                            ? "primary"
                            : "success"
                        }
                      />
                    </p>
                  </>
                }
                actionIcon={
                  <>
                    <IconButton aria-label={`info about ${item?.book?.title}`}>
                      <ActionsBtn
                        HandleAction={(e) => {
                          if (e == "Edit") {
                            dispatch(SetEditBook(item));
                          }
                          if (e == "Delete") {
                            dispatch({
                              type: SET_DELETE_BOOK,
                              payload: { id: item?.book?.id },
                            });
                          }
                        }}
                      />
                    </IconButton>
                  </>
                }
              />
            </ImageListItem>
          ) : (
            ""
          )
        )}
    </ImageList>
  );
}
