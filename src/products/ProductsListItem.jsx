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
      <div className="single_book">
        <img
          src={`${baseURLAddress}${product.coverPageImageName}`}
          alt="book example"
          className="single_book_photo"
        />
        <div>
          <b>{product.title}</b>
          <p>{product.author}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductsListItem;
