import instance, { baseURL } from "../utils/api";
import { useEffect, useContext, useState } from "react";
import { BooksContext } from "../context/BooksContext";
import { SearchContext } from "../context/SearchContext";
import Error from "../error/Error";
import ProductsList from "../products/ProductsList";
import "../products/products.css";
import "./collections.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as CloseButton } from "../assets/close.svg";
import { ReactComponent as ArrowRight } from "../assets/arrow_right.svg";
import { ReactComponent as ArrowDown } from "../assets/arrow_down.svg";
import fileNotFound from "../assets/file_not_found.jpg";

const Collection = () => {
  const { booksState, setBooksState } = useContext(BooksContext);
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const { books, pageInfo, authors, categories, loading, error } = booksState;
  const [filterCategories, setFilterCategories] = useState({
    authors: false,
    categories: false,
    language: false,
    date_added: false
  });
  const { collectionName } = useParams();

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
          const categoriesList = [];
          res.data.content.forEach(book => {
            if (authorList.includes(book.author) === false) {
              authorList.push(book.author);
            }

            book.categoryNames.forEach(category => {
              if (categoriesList.includes(category) === false) {
                categoriesList.push(category);
              }
            });
          });

          return {
            ...prevState,
            books: res.data.content,
            pageInfo: res.data.pageable,
            authors: authorList,
            categories: categoriesList,
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
      params.forEach((value, key) => {
        // console.log(key, value);
        params.delete(key);
        setSearchValue("");
      });
    }
    handleFilterChange();
  };

  useEffect(() => {
    setBooksState(prevState => {
      return { ...prevState, loading: true, error: null };
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
    <div className="collection_container">
      <h2>
        {collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}{" "}
        Collection
      </h2>

      <main className="collection_page_container">
        <div className="collection_filters">
          <p>
            Showing <span className="bold_text">{pageInfo.pageSize}</span> of{" "}
            {books.length} results{" "}
            {searchValue && (
              <span>
                for <b>"{searchValue}"</b>
              </span>
            )}
          </p>

          {(params.get("author") ||
            params.getAll("categories").length !== 0 ||
            params.get("title")) && (
            <div className="used_filters_container">
              <p
                onClick={() => {
                  handleRemoveFilter(undefined, undefined, true);
                }}
                className="clear_all_button"
              >
                Clear All
              </p>
              {params.getAll("categories").length !== 0 && (
                <div>
                  {params.getAll("categories").map((item, index) => {
                    return (
                      <p
                        onClick={() => {
                          handleRemoveFilter(item, "categories", false);
                        }}
                        key={index}
                        className="used_filter_name"
                      >
                        <CloseButton className="close_button_img" />
                        {item}
                      </p>
                    );
                  })}
                </div>
              )}

              {params.get("author") && (
                <p
                  onClick={() => {
                    handleRemoveFilter(params.get("author"), "author", false);
                  }}
                  className="used_filter_name"
                >
                  <CloseButton className="close_button_img" />
                  {params.get("author")}
                </p>
              )}
            </div>
          )}

          <div className="sort_by_container">
            <label htmlFor="sort_by">Sort by</label>
            <select
              id="sort_by"
              onChange={e => {
                handleFilterChange("sort", e.target.value);
              }}
            >
              <option value="title,asc" defaultChecked>
                Title
              </option>
              <option value="author,asc">Author</option>
              <option value="releaseYear,asc">Release Year Asc</option>
              <option value="releaseYear,desc">Release Year Desc</option>
            </select>
          </div>

          <div className="filter_category_container">
            <div
              className="filter_category_title"
              onClick={() => {
                setFilterCategories(prevState => {
                  return { ...prevState, authors: !prevState.authors };
                });
              }}
            >
              <b>Authors</b>
              {filterCategories.authors ? (
                <ArrowDown className="arrow_img" />
              ) : (
                <ArrowRight className="arrow_img" />
              )}
            </div>
            <div className="underline_container"></div>
            {filterCategories.authors && (
              <div className="filter_list_container">
                {authors.map((author, index) => {
                  return (
                    <p
                      onClick={() => {
                        handleFilterChange("author", author);
                      }}
                      key={index}
                      className={
                        params.getAll("author").includes(author)
                          ? "bold_text"
                          : ""
                      }
                    >
                      {author}
                    </p>
                  );
                })}
              </div>
            )}
          </div>

          <div className="filter_category_container">
            <div
              className="filter_category_title"
              onClick={() => {
                setFilterCategories(prevState => {
                  return { ...prevState, categories: !prevState.categories };
                });
              }}
            >
              <b>Categories</b>
              {filterCategories.categories ? (
                <ArrowDown className="arrow_img" />
              ) : (
                <ArrowRight className="arrow_img" />
              )}
            </div>
            <div className="underline_container"></div>

            {filterCategories.categories && (
              <div className="filter_list_container">
                {categories.map((category, index) => {
                  return (
                    <p
                      key={index}
                      onClick={() => {
                        handleFilterChange("categories", category);
                      }}
                      className={
                        params.getAll("categories").includes(category)
                          ? "bold_text"
                          : ""
                      }
                    >
                      {category}
                    </p>
                  );
                })}
              </div>
            )}
          </div>

          <div className="filter_category_container">
            <div
              className="filter_category_title"
              onClick={() => {
                setFilterCategories(prevState => {
                  return { ...prevState, language: !prevState.language };
                });
              }}
            >
              <b>Language</b>
              {filterCategories.language ? (
                <ArrowDown className="arrow_img" />
              ) : (
                <ArrowRight className="arrow_img" />
              )}
            </div>
            <div className="underline_container"></div>
            {filterCategories.language && (
              <div className="filter_list_container">
                <p>English</p>
                <p>Spanish</p>
              </div>
            )}
          </div>

          <div className="filter_category_container">
            <div
              className="filter_category_title"
              onClick={() => {
                setFilterCategories(prevState => {
                  return { ...prevState, date_added: !prevState.date_added };
                });
              }}
            >
              <b>Date Added</b>
              {filterCategories.date_added ? (
                <ArrowDown className="arrow_img" />
              ) : (
                <ArrowRight className="arrow_img" />
              )}
            </div>
            <div className="underline_container"></div>
            {filterCategories.date_added && (
              <div className="filter_list_container">
                <p>Last Week</p>
                <p>Last Month</p>
                <p>Last Two Months</p>
                <p>Last Six Months</p>
              </div>
            )}
          </div>
        </div>

        {books.length !== 0 ? (
          <ProductsList products={books} />
        ) : (
          <div className="file_not_found_container">
            <p className="bold_text">No Results Found</p>
            <img src={fileNotFound} className="file_not_found_image" />
            <a href="https://www.vecteezy.com/free-vector/app">
              App Vectors by Vecteezy
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default Collection;
