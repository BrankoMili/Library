import { useNavigate } from "react-router-dom";

const ProductsListItem = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/books/${product.id}`);
      }}
    >
      <p>{product.title}</p>
      <p>{product.author}</p>
    </div>
  );
};

export default ProductsListItem;
