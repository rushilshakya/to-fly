import { useDispatch } from "react-redux";
import { addToCart } from "../../reducers/cartReducer";
import { createNotification } from "../../reducers/notificationReducer";

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addToCart(product));
    dispatch(createNotification(`Adding ${product.name} to cart`));
  };
  return (
    <button type="submit" className="buy-button" onClick={handleSubmit}>
      Add to cart
    </button>
  );
};

export default AddToCartButton;
