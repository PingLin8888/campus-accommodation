import React, { useState } from "react";

const Registration = () => {
  const [registration, setRegistratioin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return <div>Registration</div>;
};

export default Registration;
