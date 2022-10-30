import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import loginService from "../services/login";
import { populateUser } from "../reducers/userReducer";
import { createNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(createNotification("logging in user"));

      const loggedUser = await loginService.login({
        email,
        password,
      });
      dispatch(populateUser(loggedUser));
      navigate("/");
    } catch (e) {
      dispatch(createNotification(e.response.data.error, "ERROR"));
      console.log(`error is ${e.response.data.error}`);
    }
  };

  return (
    <div className="wrapper region-md flow-md padding-top-0">
      {user.token ? (
        <div>You are logged in as {user.email}</div>
      ) : (
        <>
          <h2>Login</h2>

          <form onSubmit={(event) => handleSubmit(event)}>
            <div>
              Email
              <input
                value={email}
                id="username"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              Password
              <input
                type="password"
                value={password}
                id="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button type="submit" className="margin-top-1 buy-button">
              login
            </button>
          </form>
          <p>
            Not registered? please <Link to="/signup">sign up</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default LoginForm;
