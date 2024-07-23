import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logMaintenanceIssue } from "../utils/ApiFunctions";

const LogIssue = () => {
  const [description, setDescription] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userEmail = localStorage.getItem("userId");
      const response = await logMaintenanceIssue(
        userEmail,
        roomId,
        description
      );
      if (response) {
        navigate("/issues");
      }
    } catch (error) {
      setError("Failed to log issue.");
      console.error("Error logging issue:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Log New Issue</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roomId">Room ID</label>
          <input
            type="text"
            id="roomId"
            className="form-control"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LogIssue;
