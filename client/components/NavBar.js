import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toskaLogo from "../assets/images/toskalogo_color.svg";
import cartImage from "../assets/images/cart.png";
import { logOutUser } from "../reducers/userReducer";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="wrapper">
      <div className="flex split-pair align-center region-tn">
        <img src={toskaLogo} alt="toska" className="logo" />
        <div className="flex gap-2">
          <Link to="/" className="text-link">
            Home
          </Link>
          {user.firstName ? (
            <>
              <span>Hi {user.firstName}</span>
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
          <Link to="/cart">
            <img src={cartImage} alt="Cart" className="cartButton" />
            {/* <div id="cartCount">{cartCount}</div> */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
