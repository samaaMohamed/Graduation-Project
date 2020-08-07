import React, { Component } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  books_section,
  books_section_img,
  books_section_title,
  book_list,
  carousel_container
} from "./style.module.css";

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
            removeArrowOnDeviceType={["desktop","tablet", "mobile"]}
            keyBoardControl={true}
            customTransition="all .5"
            containerClass={carousel_container}
            transitionDuration={500}
          >
            {books && books.map((book) => {
              return (
                <figure key={book.id}>
                  <Link to={`/books/${book.id}`}>
                    <img
                      className={books_section_img}
                      src={book.cover}
                      alt=""
                    />
                  </Link>
                </figure>
              );
            })}
          </Carousel>
        </section>
      </div>
    );
  }
}
