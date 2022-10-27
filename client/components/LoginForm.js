import { useState } from "react";
import loginService from "../services/login";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({ token: null });

  const handleSubmit = async (event, { email, password }) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({
        email,
        password,
      });
      setUser(loggedUser);
      console.log("logged in!");
      // blogService.setToken(loggedUser.token);
      // window.localStorage.setItem(
      //   "loggedNoteappUser",
      //   JSON.stringify(loggedUser)
      // );
    } catch (e) {
      // createMessage(e.response.data.error, "ERROR");
      console.log(`error is ${e.response.data.error}`);
    }
  };

  return (
    <div>
      <div>User is {user.token}</div>
      <h2>Login</h2>

      <form onSubmit={(event) => handleSubmit(event, { email, password })}>
        <div>
          username
          <input
            value={email}
            id="username"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
