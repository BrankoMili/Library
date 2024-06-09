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
  const [filters, setFilters] = useState({
    categories: [],
    author: ""
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Make query string
  const baseUrl = baseURL;
  const url = new URL(baseUrl);
  const params = new URLSearchParams(location.search);

  const handleFilterChange = (filterParam = undefined, value = undefined) => {
    // Set filters
    // Check filter arguments
    if (filterParam && value) {
      if (filterParam === "categories") {
        setFilters(prevState => {
          if (prevState[filterParam].includes(value) === false) {
            return {
              ...prevState,
              [filterParam]: [...prevState[filterParam], value]
            };
          }
          return {
            ...prevState
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
    }

    if (filterParam && value) {
      // Check if filter already exists
      if (params.has(filterParam) === false) {
        params.append(filterParam, value);
      } else {
        if (filterParam === "categories") {
          // Check if category already exists
          if (params.has(filterParam, value) === false) {
            params.delete(filterParam);

            if (filters[filterParam].length !== 0) {
              filters[filterParam].forEach(item => {
                params.append(filterParam, item);
              });
            }
            params.append(filterParam, value);
          }
        } else {
          params.set(filterParam, value);
        }
      }
    }

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
    // Remove item from state
    if (filter === "categories") {
      setFilters(prevState => {
        const filteredArr = prevState[filter].filter(listItem => {
          return listItem !== item;
        });
        return { ...prevState, [filter]: filteredArr };
      });
    } else {
      setFilters(prevState => {
        return {
          ...prevState,
          [filter]: ""
        };
      });
    }
    if (item && filter) {
      params.delete(filter, item); // REMOVE PARAMETER
    }

    // DELETE ALL PARAMETERS
    if (allFilters) {
      for (let key of params.keys()) {
        params.delete(key);
        setFilters(prevState => {
          return { ...prevState, categories: [], author: "" };
        });
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
      <div>
        <b>Used filters</b>
        <p
          onClick={() => {
            handleRemoveFilter(undefined, undefined, true);
          }}
        >
          Clear All
        </p>
        {filters.categories.map((item, index) => {
          return (
            <p
              key={index}
              onClick={() => {
                handleRemoveFilter(item, "categories");
              }}
            >
              {item}
            </p>
          );
        })}
        {Object.keys(filters).map((key, index) => {
          if (key !== "categories") {
            return (
              <p
                key={index}
                onClick={() => {
                  handleRemoveFilter(filters[key], key);
                }}
              >
                {filters[key]}
              </p>
            );
          }
        })}
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
