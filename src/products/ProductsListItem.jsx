import { useNavigate } from "react-router-dom";
import { baseURLAddress } from "../utils/api";

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
        src={`${baseURLAddress}${product.coverPageImageName}`}
        alt="book example"
        className="single_book_photo"
      />
      <p>{product.title}</p>
      <p>{product.author}</p>
    </div>
  );
};

export default ProductsListItem;
