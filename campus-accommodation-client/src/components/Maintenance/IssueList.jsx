import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMaintenanceIssuesByUserEmail } from "../utils/ApiFunctions";
import moment from "moment";

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await getMaintenanceIssuesByUserEmail(userId, token);
        console.log(response);
        if (Array.isArray(response)) {
          setIssues(response);
        } else {
          console.error("Unexpected response format:", response);
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
    <div className="container">
      <h2 className="text-center">My Issues</h2>
      {issues.length > 0 ? (
        <table className="table table-bordered table-hover shadow">
          <thead>
            <tr>
              <th scope="col">Issue ID</th>
              <th scope="col">Description</th>
              <th scope="col">Room ID</th>
              <th scope="col">Status</th>
              <th scope="col">Created At</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.id}</td>
                <td>{issue.issueDescription}</td>
                <td>{issue.roomId}</td>
                <td>{issue.status}</td>
                <td>{moment(issue.createdAt).format("MMM Do, YYYY")}</td>
                <td>
                  <Link
                    to={`/issues/${issue.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have not reported any issues yet.</p>
      )}
    </div>
  );
};

export default IssueList;
