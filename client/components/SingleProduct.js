import { Link } from "react-router-dom";
import AddToCartButton from "./Buttons/AddToCartButton";

const SingleProduct = ({ product }) => (
  <div className="polaroid">
    <Link to={`/products/${product.id}`}>
      <img src={product.image_url} alt="product" />
    </Link>
    <div className="container">
      <p>{product.name}</p>
      <p>Rs. {product.price}</p>
      <AddToCartButton product={product} />
    </div>
  </div>
);

export default SingleProduct;
