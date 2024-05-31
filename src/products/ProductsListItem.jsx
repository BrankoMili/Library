import { useNavigate } from "react-router-dom";

const ProductsListItem = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/books/${product.id}`);
      }}
      className="single_book_container"
    >
      <img
        src={`http://localhost:8080/api/book/view/${product.coverPageImageName}`}
        alt="book example"
        className="single_book_photo"
      />
      <p>{product.title}</p>
      <p>{product.author}</p>
    </div>
  );
};

export default ProductsListItem;
