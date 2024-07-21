// IssueDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const IssueDetail = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        const response = await axios.get(`/api/maintenance/issues/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIssue(response.data);
      } catch (error) {
        console.error("Error fetching issue details:", error);
        setError("Failed to fetch issue details.");
      }
    };
    fetchIssueDetails();
  }, [id, token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!issue) return <div>Loading...</div>;

  return (
    <div>
      <h2>Issue Details</h2>
      <p>Issue Id: {issue.id}</p>
      <p>Description: {issue.issueDescription}</p>
      <p>
        Create Date and Time: {new Date(...issue.createdAt).toLocaleString()}
      </p>
      <p>Associated Room Id: {issue.roomId}</p>
      <p>Status: {issue.status}</p>
      <p>Logged by User: {issue.userId}</p>

      <h3>Update Information</h3>
      <ul>
        {issue.updatesResponses.map((updateInfo) => (
          <li key={updateInfo.id}>
            <p>
              Update Date and Time:{" "}
              {new Date(...updateInfo.updatedAt).toLocaleString()}
            </p>
            <p>Updated by User: {updateInfo.userId}</p>
            <p>Description: {updateInfo.issueDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueDetail;
