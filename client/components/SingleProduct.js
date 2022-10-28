import AddToCartButton from "./Buttons/AddToCartButton";

const SingleProduct = ({ product }) => (
  <div className="polaroid">
    <img src={product.image_url} alt="product" />
    <div className="container">
      <p>{product.name}</p>
      <p>Rs. {product.price}</p>
      <AddToCartButton product={product} />
    </div>
  </div>
);

export default SingleProduct;
