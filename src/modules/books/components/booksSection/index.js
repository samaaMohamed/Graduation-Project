import React, { Component } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  books_section,
  books_section_img,
  books_section_title,
  book_list,
  carousel_container,
  book_section_overLay,
  book_section_overLay_price,
  rate,
  book_section_overLay_icon,
  content,
  book_section_overLay_container,
} from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default class BooksSection extends Component {
  render() {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
      },
    };
    let { title, books } = this.props;
    return (
      <div className={books_section}>
        <h2 className={books_section_title}>{title}</h2>
        <section className={book_list}>
          <Carousel
            swipeable={true}
            showDots={false}
            responsive={responsive}
            infinite={true}
            autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={1000}
            removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
            keyBoardControl={true}
            customTransition="all .5"
            containerClass={carousel_container}
            transitionDuration={500}
          >
            {books &&
              books.map((book) => {
                return (
                  <section className={book_section_overLay_container}>
                    <div className={book_section_overLay}>
                      <p className={book_section_overLay_price}>{book.price}</p>
                      <p>{book.currency}</p>
                      <figcaption className={rate}>
                        <p>
                          <FontAwesomeIcon
                            className={book_section_overLay_icon}
                            icon={faStar}
                          ></FontAwesomeIcon>
                          {book.rate}
                        </p>
                      </figcaption>
                    </div>
                    <figure key={book.id} className={content}>
                      <Link to={`/books/${book.id}`}>
                        <img
                          className={books_section_img}
                          src={book.cover}
                          alt=""
                        />
                      </Link>
                    </figure>
                  </section>
                );
              })}
          </Carousel>
        </section>
      </div>
    );
  }
}
