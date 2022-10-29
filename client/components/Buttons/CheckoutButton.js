import { useDispatch } from "react-redux";
import { addToCart } from "../../reducers/cartReducer";

const CheckoutButton = ({ disabled }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log("checkout");
  };
  return (
    <button
      type="submit"
      className="buy-button"
      onClick={handleSubmit}
      disabled={disabled}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
