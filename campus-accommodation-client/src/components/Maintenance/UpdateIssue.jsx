import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateMaintenanceIssue } from "../utils/ApiFunctions";

const UpdateIssue = () => {
  const { issueId } = useParams(); // Ensure issueId is retrieved from the URL parameters
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userEmail = localStorage.getItem("userId");
      console.log("issueId: " + issueId); //undefine
      const updateIssueRequest = { updateDescription: description, status };
      const response = await updateMaintenanceIssue(
        issueId,
        userEmail,
        updateIssueRequest
      );
      if (response) {
        navigate("/issues");
      }
    } catch (error) {
      setError("Failed to update issue.");
      console.error("Error updating issue:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Update Issue</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">update description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="LOGGED">LOGGED</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateIssue;
