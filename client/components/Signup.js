import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import userService from "../services/users";
import { populateUser } from "../reducers/userReducer";
import { createNotification } from "../reducers/notificationReducer";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(createNotification("Registering new user"));

      const loggedUser = await userService.register({
        email,
        password,
        firstName,
        lastName,
      });
      dispatch(populateUser(loggedUser));
      navigate("/");
    } catch (e) {
      dispatch(createNotification(e.response.data.error, "ERROR"));
    }
  };

  return (
    <div className="wrapper region-md flow-md padding-top-0">
      {user.token ? (
        <div>You are logged in as {user.email}</div>
      ) : (
        <>
          <h2>Sign up</h2>

          <form onSubmit={(event) => handleSubmit(event)}>
            <div>
              Email
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div>
              First name
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div>
              Last name
              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <button type="submit" className="margin-top-1 buy-button">
              Register
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Signup;
