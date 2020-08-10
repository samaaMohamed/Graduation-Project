import App from "App";
import Home from "modules/home";
import BookList from "modules/books/components/bookList";
import Auther from "modules/books/components/auther";

export default [
  { path: "/", component: Home },
  { path: "/books", component: BookList },
  { path: "/auther", component: Auther },
];
