import { useDispatch } from "react-redux";
import { checkoutCart } from "../../reducers/cartReducer";

const CheckoutButton = ({ disabled, address }) => {
  const dispatch = useDispatch();

  return (
    <button
      type="submit"
      className="buy-button"
      onClick={() => dispatch(checkoutCart(address))}
      disabled={disabled}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
