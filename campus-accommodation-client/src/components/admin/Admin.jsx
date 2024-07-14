import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-5">
      <h2>Welcome to the Campus Accommodation</h2>
      <hr />
      <h4 className="card-title text-center">
        <Link to={"/existing-rooms"}>Manage Rooms</Link>
      </h4>
      <h4 className="card-title text-center">
        <Link to={"/existing-bookings"}>Manage bookings</Link>
      </h4>
    </section>
  );
};

export default Admin;
