import { useState, useEffect } from "react";
import instance from "../utils/api";
import "./user_pages.css";
import { ReactComponent as Arrow_down } from "../assets/arrow_down.svg";
import Error from "../error/Error";
import { ReactComponent as Close_image } from "../assets/close.svg";
import { ReactComponent as Error_image } from "../assets/error.svg";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    author: "",
    category: [],
    releaseYear: "",
    publisher: "",
    image: null,
    pdf: null
  });
  const [categoriesWindow, setCategoriesWindow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [notification, setNotification] = useState({
    notification_title: "",
    notification_text: "",
    show: false
  });
  const [timer, setTimer] = useState(undefined);

  useEffect(() => {
    setLoading(true);
    setError(null);

    instance
      .get("/book/categories")
      .then(res => {
        setAllCategories(res.data);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        console.error("Error", err);
        setLoading(false);
        setError(err);
      });
  }, []);

  // Handle Book image / update state
  const handleBookImage = event => {
    setBook(prevState => {
      return { ...prevState, image: event.target.files[0] };
    });
  };

  // Handle PDF file / update state
  const handlePDF = event => {
    setBook(prevState => {
      return { ...prevState, pdf: event.target.files[0] };
    });
  };

  // Validate Book cover image format
  const validateImageFile = () => {
    if (book.image !== null) {
      let idxDot = book.image.name.lastIndexOf(".") + 1;
      let extFile = book.image.name
        .substr(idxDot, book.image.name.length)
        .toLowerCase();
      if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
        return true;
      } else {
        // alert("Only jpg/jpeg and png files are allowed!");
        return false;
      }
    } else {
      // alert("Book cover image is not selected.");
      return false;
    }
  };

  // Validate Book PDF file
  const validatePDFFile = () => {
    if (book.pdf !== null) {
      let idxDot = book.pdf.name.lastIndexOf(".") + 1;
      let extFile = book.pdf.name
        .substr(idxDot, book.pdf.name.length)
        .toLowerCase();
      if (extFile === "pdf") {
        return true;
      } else {
        // alert("Only pdf files are allowed!");
        return false;
      }
    } else {
      // alert("PDF file is not selected.");
      return false;
    }
  };

  const validateTextInputs = () => {
    const nameRegex = /^[A-Za-z0-9\s\-_,\.;:()]{2,50}$/;
    const descriptionRegex = /^[A-Za-z0-9\s\-_,\.;:()]{2,200}$/;

    let notification_title = "";
    let notification_text = "";

    const showNotification = () => {
      if (timer === undefined) {
        setNotification(prevState => {
          return {
            ...prevState,
            notification_title: notification_title,
            notification_text: notification_text,
            show: true
          };
        });
      }
    };

    if (nameRegex.test(book.title) === false) {
      notification_title = "Invalid book title";
      showNotification();
      return false;
    }

    if (descriptionRegex.test(book.description) === false) {
      notification_title = "Invalid description";
      showNotification();
      return false;
    }

    if (nameRegex.test(book.author) === false) {
      notification_title = "Invalid book author name";
      showNotification();
      return false;
    }

    if (nameRegex.test(book.publisher) === false) {
      notification_title = "Invalid book publisher";
      showNotification();
      return false;
    }

    if (book.category.length === 0) {
      notification_title = "Invalid categories";
      notification_text = "Categories field is empty";
      showNotification();
      return false;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (validateTextInputs() && validateImageFile() && validatePDFFile()) {
      const formData = new FormData();
      formData.append("title", book.title);
      formData.append("description", book.description);
      formData.append("author", book.author);
      formData.append("category", book.category);
      formData.append("releaseYear", book.releaseYear);
      formData.append("publisher", book.publisher);
      formData.append("image", book.image);
      formData.append("pdf", book.pdf);

      instance
        .post("/book", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log("Image uploaded successfully:", response.data);
          // Handle successful upload response
        })
        .catch(error => {
          console.error("Error uploading image:", error);
          // Handle upload errors
        });
    } else {
      setTimer(
        setTimeout(() => {
          setNotification(prevState => {
            return { ...prevState, show: false };
          });
          setTimer(undefined);
        }, 3000)
      );
    }
  };

  if (loading) return <div className="loader"></div>;
  if (error) return <Error error={error} />;
  return (
    <div className="addbook_container">
      <div>
        <h3 onClick={() => console.log(book)}>Insert new book</h3>
        {notification.show && (
          <div id="notification_container">
            <Error_image id="error_icon" />
            <div className="text_notification_container">
              <b>{notification.notification_title}</b>
              <p>{notification.notification_text}</p>
            </div>
            <Close_image
              id="close_notification_icon"
              onClick={() => {
                clearTimeout(timer);
                setTimer(undefined);
                setNotification(prevState => {
                  return { ...prevState, show: false };
                });
              }}
            />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input_field_container">
            <label htmlFor="book_title">Title</label>
            <input
              type="text"
              id="book_title"
              onChange={e => {
                setBook(prevState => {
                  return { ...prevState, title: e.target.value };
                });
              }}
            />
          </div>
          <div className="input_field_container">
            <label htmlFor="book_desc">Description</label>
            <input
              type="text"
              id="book_desc"
              onChange={e => {
                setBook(prevState => {
                  return { ...prevState, description: e.target.value };
                });
              }}
            />
          </div>
          <div className="input_field_container">
            <label htmlFor="book_author">Author</label>
            <input
              type="text"
              id="book_author"
              onChange={e => {
                setBook(prevState => {
                  return { ...prevState, author: e.target.value };
                });
              }}
            />
          </div>

          <div className="select-list input_field_container">
            <label>Categories</label>
            <div
              className="title"
              onClick={() => {
                setCategoriesWindow(!categoriesWindow);
              }}
            >
              Select Categories <Arrow_down className="arrow_down_image" />
              <div className="selected_categories_list">
                {book.category.length === 0
                  ? "Please select..."
                  : book.category.map((element, index) => {
                      return <p key={index}>- {element}</p>;
                    })}
              </div>
            </div>
            <div
              className={
                categoriesWindow
                  ? "select-options display_block"
                  : "select-options"
              }
              onClick={e => {
                if (e.target.type === "checkbox") {
                  if (e.target.checked) {
                    setBook(prevState => {
                      return {
                        ...prevState,
                        category: [...prevState.category, e.target.value]
                      };
                    });
                  } else {
                    setBook(prevState => {
                      const newArray = [...prevState.category].filter(item => {
                        return item !== e.target.value;
                      });
                      return {
                        ...prevState,
                        category: newArray
                      };
                    });
                  }
                }
              }}
            >
              {allCategories.map((category, index) => {
                return (
                  <div className="option" key={index}>
                    <input type="checkbox" id={index} value={category} />
                    <label htmlFor={index}>{category}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="input_field_container">
            <label htmlFor="book_release_year">Release Year</label>
            <input
              type="number"
              id="book_release_year"
              onChange={e => {
                setBook(prevState => {
                  return { ...prevState, releaseYear: e.target.value };
                });
              }}
            />
          </div>
          <div className="input_field_container">
            <label htmlFor="publisher">Publisher</label>
            <input
              type="text"
              id="publisher"
              onChange={e => {
                setBook(prevState => {
                  return { ...prevState, publisher: e.target.value };
                });
              }}
            />
          </div>
          <div className="input_field_container">
            <label>Book Cover Image</label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={e => {
                handleBookImage(e);
              }}
            />
          </div>
          <div className="input_field_container">
            <label>Book PDF file</label>
            <input
              type="file"
              accept=".pdf"
              onChange={e => {
                handlePDF(e);
              }}
            />
          </div>
          <input type="submit" value="Add Book" className="button_style" />
        </form>
      </div>
    </div>
  );
};

export default AddBook;
