import ProductsListItem from "./ProductsListItem";

const ProductsList = ({ products }) => {
  return (
    <div className="products_list_container">
      {[
        ...products.map(product => {
          return <ProductsListItem key={product.id} product={product} />;
        })
      ]}
    </div>
  );
};

export default ProductsList;
