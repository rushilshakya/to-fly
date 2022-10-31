import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import AddToCartButton from "./Buttons/AddToCartButton";

const ProductDetail = () => {
  let { id } = useParams();
  const product = useSelector((state) =>
    state.products.find((x) => x.id == id)
  );
  return (
    <div className="wrapper region-md flow-md padding-top-0">
      {product ? (
        <div className="polaroid">
          <img src={product.image_url} alt="product" />
          <div className="container">
            <p>{product.name}</p>
            <p>Rs. {product.price}</p>
            <AddToCartButton product={product} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetail;
