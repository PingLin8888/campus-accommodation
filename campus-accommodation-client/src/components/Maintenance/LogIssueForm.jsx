import React, { useState } from "react";
import { logMaintenanceIssue } from "../utils/ApiFunctions";

const LogIssueForm = ({ userId, roomId }) => {
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await logMaintenanceIssue(userId, roomId, description);
      setMessage("Issue logged successfully");
    } catch (error) {
      setMessage("Error logging issue");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Issue Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log Issue</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default LogIssueForm;
