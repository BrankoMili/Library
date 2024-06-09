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

  const handleFilterChange = (
    filterParam = undefined,
    value = undefined,
    removedFilter = {
      item: "",
      filter: "",
      removeItem: false
    }
  ) => {
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

    // Query string
    const baseUrl = baseURL;
    const url = new URL(baseUrl);
    const params = new URLSearchParams(location.search);

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

    // Remove item filter
    if (removedFilter.removeItem) {
      params.delete(removedFilter.filter, removedFilter.item);
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
  const handleRemoveFilter = (item, filter) => {
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

    handleFilterChange(undefined, undefined, {
      item: item,
      filter: filter,
      removeItem: true
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

    handleFilterChange();
  }, []);

  if (loading) return <div className="loader"></div>;
  if (error) return <Error error={error} />;

  return (
    <div className="kids_container">
      <h2>Kids Collection</h2>
      <div>
        <b>Used filters</b>
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
        <p
          onClick={() => {
            handleFilterChange("author", "Yuval Noah Harari");
          }}
        >
          Yuval Noah Harari
        </p>

        <p
          onClick={() => {
            handleFilterChange("author", "Walter Isaacson");
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
                handleFilterChange("categories", category);
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
