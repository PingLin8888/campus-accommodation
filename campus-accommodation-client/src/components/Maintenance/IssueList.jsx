// IssueList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMaintenanceIssuesByUser, getUser } from "../utils/ApiFunctions";

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await getMaintenanceIssuesByUser(userId);

        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          setIssues(response.data);
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

  console.log(Array.isArray(issues)); // Should log true if issues is an array
  console.log(typeof issues); // Should log "object" if issues is an array (arrays are objects in JavaScript)

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
