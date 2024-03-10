import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthProvider from "./AuthProvider";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { handleLogin } = useContext(AuthProvider);

  const handleInputChange = (e) => {
    set({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);
    if (success) {
      const token = success.token;
      handleLogin(token);
      navigate("/");
      windown.location.reload();
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <section className="container col-6 mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="email">
            Email
          </label>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={login.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="password">
            Password
          </label>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={login.password}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-hotel"
            style={{ marginRight: "10px" }}
          >
            Login
          </button>
          <span style={{ marginRight: "10px" }}>
            Don't have an account yet?<Link to={"/register"}></Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default Login;
