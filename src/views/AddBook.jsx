import { useState } from "react";
import instance from "../utils/api";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    author: "",
    category: "ROMANCE",
    releaseYear: 0,
    selectedImage: null
  });

  const [fileName, setFileName] = useState("");

  const handleFileChange = event => {
    setBook(prevState => {
      return { ...prevState, selectedImage: event.target.files[0] };
    });
  };

  function validateFileType() {
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
      return true;
    } else {
      alert("Only jpg/jpeg and png files are allowed!");
      return false;
    }
  }

  const handleSubmit = async event => {
    event.preventDefault();
    if (validateFileType() && book.selectedImage) {
      const formData = new FormData();
      formData.append("title", book.title);
      formData.append("desc", book.desc);
      formData.append("author", book.author);
      formData.append("category", book.category);
      formData.append("image", book.selectedImage);
      formData.append("releaseYear", book.releaseYear);

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
      // NIJE SLIKA
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
                return { ...prevState, desc: e.target.value };
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
                return { ...prevState, category: e.target.value };
              });
            }}
          >
            <option value="ROMANCE" defaultChecked>
              ROMANCE
            </option>
            <option value="FANTASY">FANTASY</option>
            <option value="SCIENCE">SCIENCE</option>
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
          <label htmlFor="book_cover_image">Book Cover Image</label>
          <input
            type="file"
            id="book_cover_image"
            accept=".png, .jpg, .jpeg"
            value={fileName}
            onChange={e => {
              setFileName(e.target.value);
              handleFileChange(e);
            }}
          />
        </div>
        <input type="submit" value="Add Book" />
      </form>
    </div>
  );
};

export default AddBook;
