import React, { useState } from "react";
import { userRegistration } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";

const Registration = () => {
  const [registration, setRegistratioin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistratioin({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await userRegistration(registration);
      setSuccessMessage(result);
      setErrorMessage("");
      setRegistratioin({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Registration error: ${error.message}`);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <section className="container col-6 mt-5 mb-5">
      {errorMessage && <p className="alert laert-danger">{errorMessage}</p>}
      {successMessage && <p className="alert laert-danger">{successMessage}</p>}
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="firstName">
            FirstName
          </label>
          <div>
            <input
              type="firstName"
              id="firstName"
              name="firstName"
              value={registration.firstName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="lastName">
            LastName
          </label>
          <div>
            <input
              type="lastName"
              id="lastName"
              name="lastName"
              value={registration.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="email">
            Email
          </label>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={registration.email}
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
              value={registration.password}
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
            Register
          </button>
          <span style={{ marginRight: "10px" }}>
            Already have an account?<Link to={"/login"}>Login</Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default Registration;
