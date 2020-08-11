import Home from "modules/home";
import BookList from "modules/books/components/bookList";
import Author from "modules/books/components/author";

export default [
  { path: "/", component: Home },
  { path: "/books", component: BookList },
  { path: "/author/:id", component: Author },
];
