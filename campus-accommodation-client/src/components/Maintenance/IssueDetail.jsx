import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMaintenanceIssueById } from "../utils/ApiFunctions";
import moment from "moment";

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
    <div className="container">
      <h2 className="text-center">Issue Details</h2>
      <div className="card p-4 mt-4 shadow">
        <table className="table table-bordered table-hover shadow">
          <tbody>
            <tr>
              <th>Issue Id</th>
              <td>{issue.id}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{issue.issueDescription}</td>
            </tr>
            <tr>
              <th>Room Id</th>
              <td>{issue.roomId}</td>
            </tr>
            <tr>
              <th>User Id</th>
              <td>{issue.userId}</td>
            </tr>
            <tr>
              <th>Created At</th>
              <td>
                {moment(issue.createdAt).format("MMM Do, YYYY, h:mm:ss a")}
              </td>
            </tr>
          </tbody>
        </table>
        <h3 className="mt-4">Updates</h3>
        {issue.updatesResponses.length > 0 ? (
          <table className="table table-bordered table-hover shadow">
            <thead>
              <tr>
                <th scope="col">Update ID</th>
                <th scope="col">Status</th>
                <th scope="col">Description</th>
                <th scope="col">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {issue.updatesResponses.map((update) => (
                <tr key={update.id}>
                  <td>{update.id}</td>
                  <td>{update.status}</td>
                  <td>{update.issueDescription}</td>
                  <td>
                    {moment(update.updatedAt).format("MMM Do, YYYY, h:mm:ss a")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No updates available for this issue.</p>
        )}
        <div className="text-right">
          <Link to={`/update-issue/${issue.id}`} className="btn btn-primary">
            Update Issue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
