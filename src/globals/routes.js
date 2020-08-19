import Home from "modules/home";
import BookList from "modules/books/components/bookList";
import Author from "modules/books/components/author";
import Contacts from "modules/contact";
import Login from "modules/account/components/login";
import Register from "modules/account/components/register";
import BookDetails from "modules/books/components/bookDetails";
import CartPage from "modules/order/components/cart";

export default [
  { path: "/", component: Home },
  { path: "/books", component: BookList },
  { path: "/author/:id", component: Author },
  { path: "/contact", component: Contacts },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/books/:id", component: BookDetails },
  { path: "/cart", component: CartPage },
];
