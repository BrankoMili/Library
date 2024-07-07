import { useNavigate, useParams, Link } from "react-router-dom";
import instance from "../utils/api";
import { useEffect, useContext, useState } from "react";
import { BooksContext } from "../context/BooksContext";
import Error from "../error/Error";
import { baseURLAddress } from "../utils/api";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";

const SingleProduct = () => {
  const { booksState, setBooksState } = useContext(BooksContext);
  const { books, loading, error } = booksState;
  const { productId } = useParams();
  const navigate = useNavigate();
  const [bookRating, setBookRating] = useState(2.2);

  const handleRating = index => {
    setBookRating(index + 1);
  };

  useEffect(() => {
    setBooksState(prevState => {
      return { ...prevState, loading: true, error: null };
    });

    instance
      .get(`/book/${productId}`)
      .then(res => {
        setBooksState(prevState => {
          console.log(res.data);
          return {
            ...prevState,
            books: [res.data],
            loading: false,
            error: null
          };
        });
      })
      .catch(err => {
        console.error("Error", err);
        setBooksState(prevState => {
          return { ...prevState, loading: false, error: err };
        });
      });
  }, []);

  if (loading) return <div className="loader"></div>;
  if (error) return <Error error={error} />;
  return (
    <div className="single_product_container">
      <section className="title_image_section">
        <h2>{books[0].title}</h2>
        <img
          src={`${baseURLAddress}${books[0].coverPageImageName}`}
          alt="book example"
        />
        <div>
          <p>Book rating</p>
          <div className="rating_container">
            {[...Array(5)].map((el, index) => {
              if (index + 1 <= bookRating) {
                return (
                  <IoStar
                    className="star_rate"
                    key={index}
                    onClick={() => handleRating(index)}
                  />
                );
              } else {
                if (bookRating % 1 === 0 || index + 1 - bookRating > 1) {
                  return (
                    <IoStarOutline
                      className="star_rate"
                      key={index}
                      onClick={() => handleRating(index)}
                    />
                  );
                } else {
                  return (
                    <IoStarHalf
                      className="star_rate"
                      key={index}
                      onClick={() => handleRating(index)}
                    />
                  );
                }
              }
            })}

            <span>{bookRating}</span>
          </div>
        </div>
      </section>

      <section className="book_details_section">
        <b>Details</b>
        <p>
          Author: <span className="bold_text">{books[0].author}</span>
        </p>
        <p>
          Publisher: <span className="bold_text">{books[0].publisher}</span>
        </p>
        <p>
          Release year:{" "}
          <span className="bold_text">{books[0].releaseYear}</span>
        </p>
        <p>
          Language: <span className="bold_text">English</span>
        </p>
        <p className="book_desc">
          Description: {books[0].description} Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Dicta quaerat aut similique ea quae
          ratione nam accusantium dolor voluptates ex magni recusandae
          provident, neque iste tempora inventore! Dignissimos, quam id?
          Excepturi odio expedita, consequuntur asperiores perspiciatis soluta,
          sed nam voluptatum veritatis accusamus natus commodi doloribus
          recusandae dicta in numquam dolore. Nulla distinctio magni sunt iusto
          dignissimos delectus eius impedit voluptatibus.
        </p>

        <Link to={baseURLAddress + books[0].pdfFileName} target="_blank">
          <button className="button_style">Read PDF</button>
        </Link>
        <button
          className="button_style"
          onClick={() => {
            navigate("/kids");
          }}
        >
          Back To All Products
        </button>
      </section>
    </div>
  );
};

export default SingleProduct;
