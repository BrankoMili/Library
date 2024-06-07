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

  const handleFilterChange = (locationSearch, filterParam, value) => {
    // Set filters
    if (filterParam === "categories") {
      setFilters(prevState => {
        return {
          ...prevState,
          [filterParam]: [...prevState.categories, value]
        };
      });
    } else {
      setFilters(prevState => {
        return {
          ...prevState,
          [filterParam]: value
        };
      });
    }

    // Query string
    const baseUrl = baseURL;
    const url = new URL(baseUrl);
    const params = new URLSearchParams(locationSearch);

    if (filterParam && value) {
      if (filters.categories.length !== 0) {
        filters.categories.forEach(category => {
          params.append("categories", category);
        });
      }

      if (filterParam !== "author" && filters.author) {
        params.append("author", filters.author);
      }

      params.append(filterParam, value);
    }

    url.search = params.toString();
    // Navigate to query string
    navigate(url.search);

    // API call
    instance
      .get("/book" + url.search)
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
  };

  // Remove Filter
  const handleRemoveFilter = item => {
    setFilters(prevState => {
      const filteredArr = prevState.categories.filter(categoryItem => {
        return categoryItem !== item;
      });
      return { ...prevState, categories: filteredArr };
    });
  };

  useEffect(() => {
    setBooksState(prevState => {
      return { ...prevState, loading: true, error: null };
    });

    instance
      .get("/book/categories")
      .then(res => {
        setAllCategories(res.data);
      })
      .catch(err => {
        console.error("Error", err);
      });

    const params = new URLSearchParams(location.search);
    handleFilterChange(params.toString());
  }, []);

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
                handleRemoveFilter(item);
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
            handleFilterChange(undefined, "author", "Yuval Noah Harari");
          }}
        >
          Yuval Noah Harari
        </p>

        <p
          onClick={() => {
            handleFilterChange(undefined, "author", "Walter Isaacson");
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
                handleFilterChange(undefined, "categories", category);
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
