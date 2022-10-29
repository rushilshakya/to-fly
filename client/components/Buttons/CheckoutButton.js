import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkoutCart } from "../../reducers/cartReducer";
import { createNotification } from "../../reducers/notificationReducer";

const CheckoutButton = ({ address }) => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    dispatch(checkoutCart(address));
    dispatch(createNotification("Submitting your order"));
  };

  const isDisabled = () => {
    if (clicked) return clicked;
    else return !address.address;
  };

  return (
    <button
      type="submit"
      className="buy-button"
      onClick={handleClick}
      disabled={isDisabled()}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
