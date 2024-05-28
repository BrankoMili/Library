import { useNavigate, useParams } from "react-router-dom";
import instance from "../utils/api";
import { useEffect, useContext } from "react";
import { BooksContext } from "../context/BooksContext";
import Error from "../error/Error";

const SingleProduct = () => {
  const { booksState, setBooksState } = useContext(BooksContext);
  const { books, loading, error } = booksState;
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setBooksState(prevState => {
      return { ...prevState, loading: true, error: null };
    });

    instance
      .get(`/book/${productId}`)
      .then(res => {
        setBooksState(prevState => {
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
    <div>
      SingleProduct
      <button
        className="button_style"
        onClick={() => {
          navigate("/kids");
        }}
      >
        Back To All Products
      </button>
    </div>
  );
};

export default SingleProduct;
