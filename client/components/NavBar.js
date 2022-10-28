import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toskaLogo from "../assets/images/toskalogo_color.svg";
import cartImage from "../assets/images/cart.png";
import { logOutUser } from "../reducers/userReducer";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const cartCount = useSelector((state) =>
    state.cart.products
      ? state.cart.products.reduce(
          (prev, curr) => prev + curr.order_detail.quantity,
          0
        )
      : 0
  );
  const dispatch = useDispatch();

  return (
    <div className="wrapper">
      <div className="flex split-pair align-center region-tn">
        <img src={toskaLogo} alt="toska" className="logo" />
        <div className="flex gap-2 align-center">
          <Link to="/" className="text-link">
            Home
          </Link>
          {user.firstName ? (
            <>
              <div>Hi {user.firstName}</div>
              <button
                type="button"
                className="text-link"
                onClick={() => dispatch(logOutUser())}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-link">
              Login
            </Link>
          )}
          <Link to="/cart" className="grid text-decoration-none">
            <img
              src={cartImage}
              alt="Cart"
              className="cart-button grid-overlay"
            />
            <div className="grid-overlay cart-count">{cartCount}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
