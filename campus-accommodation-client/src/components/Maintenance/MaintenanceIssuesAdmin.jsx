import React, { useState, useEffect } from "react";
import {
  getMaintenanceIssuesByRoom,
  updateMaintenanceIssue,
} from "../utils/ApiFunctions";

const MaintenanceIssuesAdmin = ({ roomId }) => {
  const [issues, setIssues] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchIssues = async () => {
      const data = await getMaintenanceIssuesByRoom(roomId);
      setIssues(data);
    };
    fetchIssues();
  }, [roomId]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdate = async (issueId) => {
    try {
      await updateMaintenanceIssue(issueId, status);
      const updatedIssues = issues.map((issue) =>
        issue.id === issueId ? { ...issue, status } : issue
      );
      setIssues(updatedIssues);
    } catch (error) {
      console.error("Error updating issue", error);
    }
  };

  return (
    <div>
      <h2>Maintenance Issues for Room {roomId}</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <p>{issue.description}</p>
            <p>Status: {issue.status}</p>
            <select value={status} onChange={handleStatusChange}>
              <option value="Logged">Logged</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <button onClick={() => handleUpdate(issue.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceIssuesAdmin;
