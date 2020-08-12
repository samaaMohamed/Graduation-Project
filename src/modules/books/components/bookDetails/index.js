import React, { Component } from "react";
import book_photo from "assets/book.jpeg";
import {
  book_details,
  book_image,
  author,
  book_price,
  old_price,
  new_price,
  rate,
  description,
  icon,
  add_btn,
  cart_icon,
} from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default class BookDetails extends Component {
  state = {
    book: {
      cover: book_photo,
      name: "prizza girl",
      author: "mohamed",
      old_price: "$500",
      price: "$200",
      rate: 5,
      description:
        "Fresh, funny, bittersweetThis book delivers humor, humanity and hubris.--New York Times Book ReviewNamed a most anticipated book of 2020 by Vogue, Harper's Bazaar, Elle, Marie Claire, Time, People, BuzzFeed, Bustle, and moreIn the tradition of audacious and wryly funny novels like The Idiot and Convenience Store Woman comes the wildly original coming-of-age story of a pregnant pizza delivery girl who becomes obsessed with one of her customers.Eighteen years old, pregnant, and working as a pizza delivery girl in suburban Los Angeles, our charmingly dysfunctional heroine is deeply lost and in complete denial about it all. She's grieving the death of her father (whom she has more in common with than she'd like to admit), avoiding her supportive mom and loving boyfriend, and flagrantly ignoring her future.Her world is further upended when she becomes obsessed with Jenny, a stay-at-home mother new to the neighborhood, who comes to depend on weekly deliveries of pickled-covered pizzas for her son's happiness. As one woman looks toward motherhood and the other toward middle age, the relationship between the two begins to blur in strange, complicated, and ultimately heartbreaking ways.Bold, tender, propulsive, and unexpected in countless ways, Jean Kyoung Frazier's Pizza Girl is a moving and funny portrait of a flawed, unforgettable young woman as she tries to find her place in the world.",
    },
  };
  render() {
    return (
      <div className={book_details}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 co-sm-12">
              <img
                className={book_image}
                src={this.state.book.cover}
                alt="book photo"
              />
            </div>
            <div className="col-lg-8 col-md-6 co-sm-12">
              <h2>{this.state.book.name}</h2>
              <Link to="/author">
                <span className={author}>{this.state.book.author}</span>
              </Link>
              <span>(author)</span>
              <p className={book_price}>
                <span className={old_price}>{this.state.book.old_price}</span>
                <span className={new_price}>{this.state.book.price}</span>
                <FontAwesomeIcon
                  className={icon}
                  icon={faStar}
                ></FontAwesomeIcon>
                <span className={rate}>{this.state.book.rate}</span>
              </p>
              <button className={add_btn}>
                <FontAwesomeIcon
                  className={cart_icon}
                  icon={faShoppingCart}
                ></FontAwesomeIcon>
                add to cart
              </button>
              <h3>Description</h3>
              <p className={description}>{this.state.book.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
