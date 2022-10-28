import { useDispatch } from "react-redux";
import { addToCart } from "../../reducers/cartReducer";

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addToCart(product));
  };
  return (
    <button type="submit" className="buy-button" onClick={handleSubmit}>
      Add to cart
    </button>
  );
};

export default AddToCartButton;
