import { useSelector } from "react-redux";

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification);

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
