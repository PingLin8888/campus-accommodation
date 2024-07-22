import React, { useState } from "react";
import axios from "axios";

const UpdateIssue = () => {
  const [issueId, setIssueId] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateIssueRequest = { status, updateDescription };
      const res = await axios.put(
        `/api/maintenance/update?issueId=${issueId}&userId=${userId}`,
        updateIssueRequest
      );
      setResponse(res.data);
    } catch (error) {
      console.error(error);
      setResponse("Error updating issue");
    }
  };

  return (
    <div>
      <h2>Update Maintenance Issue</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Issue ID:</label>
          <input
            type="text"
            value={issueId}
            onChange={(e) => setIssueId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Update Description:</label>
          <textarea
            value={updateDescription}
            onChange={(e) => setUpdateDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Issue</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default UpdateIssue;
