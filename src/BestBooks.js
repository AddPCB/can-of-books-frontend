import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
console.log(process.env.REACT_APP_DEV_ENV);
function BestBooks() {
  const [books, setBooks] = useState([]);
  // We are using useEffect instead of componentDidMount because functional components are better.
  useEffect(() => {
    async function fetchData() {
      try {
        const API = process.env.REACT_APP_DEV_ENV === "development" ? "http://localhost:8080/books" : "/books";
        const response = await axios.get(API);
        // Store the book data returned from the api in state.
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
      {/* We use a ternary operator to conditionally render either the Bootstrap Carousel or the "No Books Found" message. */}
      {books.length > 0 ? (
        <Carousel>
          {/* map over the books array and render each book in a Carousel.Item component. */}
          {books.map((book) => (
            <Carousel.Item key={book._id}>
              <img className="d-block w-100" src={book.imageUrl} alt={book.title} />
              <Carousel.Caption>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        // render no books found when there are no books in the state array.
        <h3>No Books Found :(</h3>
      )}
    </>
  );
}

export default BestBooks;
