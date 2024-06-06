import instance, { baseURL } from "../utils/api";
import { useEffect, useContext, useState } from "react";
import { BooksContext } from "../context/BooksContext";
import Error from "../error/Error";
import ProductsList from "../products/ProductsList";
import "../products/products.css";
import "./collections.css";
import { useLocation, useNavigate } from "react-router-dom";

const Kids = () => {
  const { booksState, setBooksState } = useContext(BooksContext);
  const { books, loading, error } = booksState;
  const [allCategories, setAllCategories] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    author: ""
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Make query string and navigate to new link
  const navigateToQueryString = () => {
    const baseUrl = baseURL;
    const url = new URL(baseUrl);
    const params = new URLSearchParams();

    if (filters.categories.length !== 0) {
      filters.categories.forEach(category => {
        params.append("categories", category);
      });
    }
    if (filters.author) {
      params.append("author", filters.author);
    }

    url.search = params.toString();
    navigate(url.search);
  };

  useEffect(() => {
    setBooksState(prevState => {
      return { ...prevState, loading: true, error: null };
    });
    instance
      .get("/book" + location.search)
      .then(res => {
        setBooksState(prevState => {
          return {
            ...prevState,
            books: res.data.content,
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

    instance
      .get("/book/categories")
      .then(res => {
        setAllCategories(res.data);
      })
      .catch(err => {
        console.error("Error", err);
      });
    navigateToQueryString();
  }, [location.search, filters]);

  // useEffect(() => {
  //   navigateToQueryString();
  // }, [location.search, filters]);

  if (loading) return <div className="loader"></div>;
  if (error) return <Error error={error} />;

  return (
    <div className="kids_container">
      <h2>Kids Collection</h2>
      <div>
        <b>Selected categories:</b>
        {filters.categories.map((item, index) => {
          return (
            <p
              key={index}
              onClick={() => {
                setFilters(prevState => {
                  const filteredArr = prevState.categories.filter(
                    categoryItem => {
                      return categoryItem !== item;
                    }
                  );
                  return { ...prevState, categories: filteredArr };
                });
              }}
            >
              {item}
            </p>
          );
        })}
      </div>

      <div>
        <b>Authors</b>
        <p
          onClick={() => {
            setFilters(prevState => {
              return {
                ...prevState,
                author: "Yuval Noah Harari"
              };
            });
          }}
        >
          Yuval Noah Harari
        </p>

        <p
          onClick={() => {
            setFilters(prevState => {
              return {
                ...prevState,
                author: "Walter Isaacson"
              };
            });
          }}
        >
          Walter Isaacson
        </p>
      </div>
      <b>Categories</b>
      <ul>
        {allCategories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                setFilters(prevState => {
                  return {
                    ...prevState,
                    categories: [...prevState.categories, category]
                  };
                });
                // navigateToQueryString();
              }}
            >
              {category}
            </li>
          );
        })}
      </ul>
      <ProductsList products={books} />
    </div>
  );
};

export default Kids;
