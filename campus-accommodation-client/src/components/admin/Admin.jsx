import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-5">
      <h2>Welcome to the Campus Accommodation</h2>
      <hr />
      <Link to={"/add/new-room"}>Manage Rooms</Link>
    </section>
  );
};

export default Admin;
