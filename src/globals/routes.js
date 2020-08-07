import App from "App";
import Home from "modules/home";
import BookList from "modules/books/components/bookList";

export default [{ path: "/", component: Home }, {path: '/books', component: BookList}];
