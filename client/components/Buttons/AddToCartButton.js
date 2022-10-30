import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../reducers/cartReducer";
import { createNotification } from "../../reducers/notificationReducer";

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const handleSubmit = () => {
    dispatch(addToCart(product));
    dispatch(createNotification(`Adding ${product.name} to cart`));
  };
  return (
    <button
      type="submit"
      className="buy-button"
      onClick={handleSubmit}
      disabled={loading[product.id]}
    >
      Add to cart
    </button>
  );
};

export default AddToCartButton;
