import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../reducers/loadingReducer";
import { notification } from "../utils/notificationHelper";

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification);
  const cart = useSelector((state) => state.cart);
  localStorage.setItem("cart", JSON.stringify(cart));

  const dispatch = useDispatch();

  useEffect(() => {
    notification.setLoading = (isLoading) => dispatch(setLoading(isLoading));
  }, [dispatch]);

  if (message === null) {
    return <div className="notification notification-standby">E-commerce</div>;
  }

  const style =
    type === "ERROR"
      ? "notification-error"
      : type === "WARNING"
      ? "notification-warning"
      : "notification-normal";

  return <div className={`notification ${style}`}>{message}</div>;
};

export default Notification;
