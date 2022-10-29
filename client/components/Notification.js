import { useSelector } from "react-redux";

const normal = {
  color: "green",
  fontStyle: "italic",
  fontSize: 20,
  background: "lightgrey",
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};
const warning = {
  color: "yellow",
  fontStyle: "italic",
  fontSize: 20,
  background: "lightgrey",
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};
const error = {
  color: "red",
  fontStyle: "italic",
  fontSize: 20,
  background: "lightgrey",
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification);

  if (message === null) {
    return null;
  }

  const style =
    type === "ERROR" ? error : type === "WARNING" ? warning : normal;

  return <div style={style}>{message}</div>;
};

export default Notification;
