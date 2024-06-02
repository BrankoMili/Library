import { useState } from "react";
import instance from "../utils/api";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    author: "",
    category: "",
    releaseYear: "",
    publisher: "",
    image: null,
    pdf: null
  });

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
    console.log(book);
  };

  // Validate Book cover image format
  function validateImageFile() {
    if (book.image !== null) {
      let idxDot = book.image.name.lastIndexOf(".") + 1;
      let extFile = book.image.name
        .substr(idxDot, book.image.name.length)
        .toLowerCase();
      if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
        return true;
      } else {
        alert("Only jpg/jpeg and png files are allowed!");
        return false;
      }
    } else {
      alert("Book cover image is not selected.");
      return false;
    }
  }

  // Validate Book PDF file
  function validatePDFFile() {
    if (book.pdf !== null) {
      let idxDot = book.pdf.name.lastIndexOf(".") + 1;
      let extFile = book.pdf.name
        .substr(idxDot, book.pdf.name.length)
        .toLowerCase();
      if (extFile === "pdf") {
        return true;
      } else {
        alert("Only pdf files are allowed!");
        return false;
      }
    } else {
      alert("PDF file is not selected.");
      return false;
    }
  }

  const handleSubmit = async event => {
    event.preventDefault();
    if (/*validateImageFile() && validatePDFFile()*/ true) {
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
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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
        <div>
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
        <div>
          <label>Category</label>
          <select
            onChange={e => {
              setBook(prevState => {
                console.log(prevState);
                return {
                  ...prevState,
                  category: prevState.category + "," + e.target.value
                };
              });
            }}
          >
            <option value="Romance" defaultChecked>
              Romance
            </option>
            <option value="Fiction">Fiction</option>
            <option value="Literature">Literature</option>
          </select>
        </div>
        <div>
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
        <div>
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
        <div>
          <label>Book Cover Image</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            value=""
            onChange={e => {
              handleBookImage(e);
            }}
          />
        </div>
        <div>
          <label>Book PDF file</label>
          <input
            type="file"
            accept=".pdf"
            value=""
            onChange={e => {
              handlePDF(e);
            }}
          />
        </div>
        <input type="submit" value="Add Book" />
      </form>
    </div>
  );
};

export default AddBook;
