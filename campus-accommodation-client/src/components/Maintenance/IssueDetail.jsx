// IssueDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMaintenanceIssueById } from "../utils/ApiFunctions";

const IssueDetail = () => {
  const { issueId } = useParams();
  const [issue, setIssue] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await getMaintenanceIssueById(issueId);
        setIssue(response);
      } catch (error) {
        console.error("Error fetching issue:", error);
        setError("Failed to fetch issue details.");
      }
    };

    fetchIssue();
  }, [issueId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Issue Details</h2>
      <p>
        <strong>Issue Id:</strong> {issue.id}
      </p>
      <p>
        <strong>Description:</strong> {issue.issueDescription}
      </p>
      <p>
        <strong>Room Id:</strong> {issue.roomId}
      </p>
      <p>
        <strong>User Id:</strong> {issue.userId}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(issue.createdAt).toLocaleString()}
      </p>
      <h3>Updates</h3>
      <ul>
        {issue.updatesResponses.map((update) => (
          <li key={update.id}>
            <p>
              <strong>Status:</strong> {update.status}
            </p>
            <p>
              <strong>Description:</strong> {update.issueDescription}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(update.updatedAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueDetail;
