// IssueList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMaintenanceIssuesByUserEmail } from "../utils/ApiFunctions";

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await getMaintenanceIssuesByUserEmail(userId);

        // Ensure response.data is an array
        if (Array.isArray(response)) {
          setIssues(response);
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Failed to fetch issues: Unexpected response format.");
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
        setError("Failed to fetch issues.");
      }
    };

    fetchIssues();
  }, [userId, token]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>My Issues</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <Link to={`/issues/${issue.id}`}>
              Issue Id: {issue.id}, Description: {issue.issueDescription},
              Status: {issue.status}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueList;
