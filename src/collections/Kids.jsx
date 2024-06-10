import instance, { baseURL } from "../utils/api";
import { useEffect, useContext, useState } from "react";
import { BooksContext } from "../context/BooksContext";
import { SearchContext } from "../context/SearchContext";
import Error from "../error/Error";
import ProductsList from "../products/ProductsList";
import "../products/products.css";
import "./collections.css";
import { useLocation, useNavigate } from "react-router-dom";

const Kids = () => {
  const { booksState, setBooksState } = useContext(BooksContext);
  const { searchValue } = useContext(SearchContext);
  const { books, authors, loading, error } = booksState;
  const [allCategories, setAllCategories] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // Make query string
  const baseUrl = baseURL;
  const url = new URL(baseUrl);
  const params = new URLSearchParams(location.search);

  const handleFilterChange = (filterParam = undefined, value = undefined) => {
    if (filterParam && value) {
      // Check if filter already exists
      if (params.has(filterParam) === false) {
        params.append(filterParam, value);
      } else {
        if (filterParam === "categories") {
          // Check if category already exists
          if (params.has(filterParam, value) === false) {
            params.append(filterParam, value);
          }
        } else {
          params.set(filterParam, value);
        }
      }
    }

    params.sort(); // Sort keys of search query

    url.search = params.toString();
    // Navigate to query string
    navigate(url.search);

    // API call
    instance
      .get("/book" + url.search)
      .then(res => {
        setBooksState(prevState => {
          const authorList = [];
          res.data.content.forEach(book => {
            if (authorList.includes(book.author) === false) {
              authorList.push(book.author);
            }
          });

          return {
            ...prevState,
            books: res.data.content,
            authors: authorList,
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

  // Remove Filter/Parameter
  const handleRemoveFilter = (item, filter, allFilters = false) => {
    if (item && filter) {
      params.delete(filter, item); // REMOVE PARAMETER
    }

    // DELETE ALL PARAMETERS
    if (allFilters) {
      for (let key of params.keys()) {
        params.delete(key);
      }
    }
    handleFilterChange();
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

    // IF SEARCH VALUE EXISTS
    if (searchValue) {
      params.delete("title");
      params.append("title", searchValue);
    }

    handleFilterChange();
  }, [searchValue]);

  if (loading) return <div className="loader"></div>;
  if (error) return <Error error={error} />;

  return (
    <div className="kids_container">
      <h2>Kids Collection</h2>

      <p>
        Showing 15 of {books.length} results{" "}
        {searchValue && (
          <span>
            for <b>"{searchValue}"</b>
          </span>
        )}
      </p>

      <div>
        {(params.get("author") || params.getAll("categories").length !== 0) && (
          <div>
            <b>Used filters</b>
            <p
              onClick={() => {
                handleRemoveFilter(undefined, undefined, true);
              }}
            >
              Clear All
            </p>
          </div>
        )}

        {params.getAll("categories").map((item, index) => {
          return (
            <p
              onClick={() => {
                handleRemoveFilter(item, "categories", false);
              }}
              key={index}
            >
              {item}
            </p>
          );
        })}

        <p
          onClick={() => {
            handleRemoveFilter(params.get("author"), "author", false);
          }}
        >
          {params.get("author")}
        </p>
      </div>

      <div>
        <b>Authors</b>
        {authors.map((author, index) => {
          return (
            <p
              onClick={() => {
                handleFilterChange("author", author);
              }}
              key={index}
            >
              {author}
            </p>
          );
        })}
      </div>
      <b>Categories</b>
      <ul>
        {allCategories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                handleFilterChange("categories", category);
              }}
            >
              {category}
            </li>
          );
        })}
      </ul>
      {searchValue && (
        <b>
          Showing {books.length} results for "{searchValue}"
        </b>
      )}

      <ProductsList products={books} />
    </div>
  );
};

export default Kids;
