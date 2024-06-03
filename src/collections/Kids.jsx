import instance from "../utils/api";
import { useEffect, useContext } from "react";
import { BooksContext } from "../context/BooksContext";
import Error from "../error/Error";
import ProductsList from "../products/ProductsList";
import "../products/products.css";
import "./collections.css";

const Kids = () => {
  const { booksState, setBooksState } = useContext(BooksContext);
  const { books, loading, error } = booksState;

  useEffect(() => {
    setBooksState(prevState => {
      return { ...prevState, loading: true, error: null };
    });

    instance
      .get("/book")
      .then(res => {
        setBooksState(prevState => {
          return {
            ...prevState,
            books: res.data,
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
    <div className="kids_container">
      <h2>Kids Collection</h2>
      <ProductsList products={books} />
    </div>
  );
};

export default Kids;
