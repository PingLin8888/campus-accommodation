import React, { useState } from "react";
import axios from "axios";

const LogIssue = () => {
  const [userId, setUserId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const logIssueRequest = { description };
      const res = await axios.post(
        `/api/maintenance/log?userId=${userId}&roomId=${roomId}`,
        logIssueRequest
      );
      setResponse(res.data);
    } catch (error) {
      console.error(error);
      setResponse("Error logging issue");
    }
  };

  return (
    <div>
      <h2>Log Maintenance Issue</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Room ID:</label>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log Issue</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default LogIssue;
