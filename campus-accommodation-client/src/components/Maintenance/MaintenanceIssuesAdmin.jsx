import React, { useState, useEffect } from "react";
import {
  getAllRooms,
  getMaintenanceIssuesByRoom,
  updateMaintenanceIssue,
} from "../utils/ApiFunctions";
import {
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Button,
  Chip,
  Stack,
  Divider,
  TextField,
} from "@mui/material";

const MaintenanceIssuesAdmin = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedStatus, setSelectedStatus] = useState({});
  const [updateDescriptions, setUpdateDescriptions] = useState({});

  // Fetch all rooms on mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data);
      } catch (error) {
        setError("Failed to load rooms. Please login again.");
      }
    };
    fetchRooms();
  }, []);

  // Fetch issues when room is selected
  useEffect(() => {
    if (selectedRoomId) {
      const fetchIssues = async () => {
        setIsLoading(true);
        setError("");
        try {
          const data = await getMaintenanceIssuesByRoom(selectedRoomId);
          console.log("Fetched issues:", data); // Debug: See what fields we get
          setIssues(data);
        } catch (error) {
          setError("Failed to load maintenance issues. Please login again.");
          setIssues([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchIssues();
    } else {
      setIssues([]);
    }
  }, [selectedRoomId]);

  const handleRoomChange = (event) => {
    setSelectedRoomId(event.target.value);
    setSelectedStatus({});
    setUpdateDescriptions({});
    setError("");
    setSuccess("");
  };

  const handleStatusChange = (issueId, newStatus) => {
    setSelectedStatus({ ...selectedStatus, [issueId]: newStatus });
  };

  const handleDescriptionChange = (issueId, description) => {
    setUpdateDescriptions({ ...updateDescriptions, [issueId]: description });
  };

  const handleUpdate = async (issueId) => {
    const newStatus = selectedStatus[issueId];
    const updateDescription = updateDescriptions[issueId];

    if (!newStatus) {
      setError("Please select a status first");
      return;
    }

    if (!updateDescription || updateDescription.trim() === "") {
      setError("Please enter a description of what was done to fix/update this issue");
      return;
    }

    try {
      const userEmail = localStorage.getItem("userId");
      if (!userEmail) {
        setError("Please login to continue");
        return;
      }

      const updateIssueRequest = {
        status: newStatus,
        updateDescription: updateDescription.trim(),
      };

      await updateMaintenanceIssue(issueId, userEmail, updateIssueRequest);

      // Update local state
      const updatedIssues = issues.map((issue) =>
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      );
      setIssues(updatedIssues);
      setSuccess(`Issue #${issueId} updated successfully!`);
      setError("");

      // Clear the form for this issue
      setSelectedStatus({ ...selectedStatus, [issueId]: undefined });
      setUpdateDescriptions({ ...updateDescriptions, [issueId]: "" });

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Update error:", error);
      setError(error.message || "Error updating issue status. Please login again.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Logged":
      case "LOGGED":
        return "error";
      case "In Progress":
      case "IN_PROGRESS":
        return "warning";
      case "Resolved":
      case "RESOLVED":
        return "success";
      default:
        return "default";
    }
  };

  const formatStatusDisplay = (status) => {
    if (status === "IN_PROGRESS") return "In Progress";
    if (status === "LOGGED") return "Logged";
    if (status === "RESOLVED") return "Resolved";
    return status;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Maintenance Issues Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <FormControl fullWidth>
            <InputLabel id="room-select-label">Select Room</InputLabel>
            <Select
              labelId="room-select-label"
              id="room-select"
              value={selectedRoomId}
              label="Select Room"
              onChange={handleRoomChange}
            >
              <MenuItem value="">
                <em>Select a room</em>
              </MenuItem>
              {rooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  Room {room.id} - {room.roomType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {isLoading ? (
        <Box display="flex" justifyContent="center" sx={{ py: 4 }}>
          <CircularProgress />
        </Box>
      ) : selectedRoomId ? (
        issues.length > 0 ? (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Maintenance Issues for Room {selectedRoomId}
              </Typography>
              <Stack spacing={3} divider={<Divider />}>
                {issues.map((issue) => (
                  <Box key={issue.id}>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Issue #{issue.id}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                          Original Problem: {issue.description || issue.issueDescription || issue.problemDescription || "No description available"}
                        </Typography>
                        <Chip
                          label={formatStatusDisplay(issue.status)}
                          color={getStatusColor(issue.status)}
                          size="small"
                        />
                      </Box>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Update Status</InputLabel>
                            <Select
                              value={selectedStatus[issue.id] || issue.status}
                              label="Update Status"
                              onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                            >
                              <MenuItem value="LOGGED">Logged</MenuItem>
                              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                              <MenuItem value="RESOLVED">Resolved</MenuItem>
                            </Select>
                          </FormControl>
                        </Stack>
                        <Box>
                          <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                            What was done to fix/update this issue? *
                          </Typography>
                          <Box
                            component="textarea"
                            placeholder="E.g., Replaced broken faucet, Fixed the leak, etc."
                            value={updateDescriptions[issue.id] || ""}
                            onChange={(e) => handleDescriptionChange(issue.id, e.target.value)}
                            rows={2}
                            sx={{
                              width: '100%',
                              padding: '8.5px 14px',
                              fontSize: '0.875rem',
                              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                              lineHeight: '1.4375em',
                              border: '1px solid',
                              borderColor: 'rgba(0, 0, 0, 0.23)',
                              borderRadius: '4px',
                              resize: 'vertical',
                              backgroundColor: 'transparent',
                              transition: 'border-color 0.2s',
                              '&:hover': {
                                borderColor: 'rgba(0, 0, 0, 0.87)',
                              },
                              '&:focus': {
                                outline: 'none',
                                borderColor: 'primary.main',
                                borderWidth: '2px',
                                padding: '7.5px 13px',
                              }
                            }}
                          />
                        </Box>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleUpdate(issue.id)}
                          disabled={
                            !selectedStatus[issue.id] ||
                            selectedStatus[issue.id] === issue.status ||
                            !updateDescriptions[issue.id] ||
                            updateDescriptions[issue.id].trim() === ""
                          }
                          sx={{ alignSelf: "flex-start" }}
                        >
                          Update Issue
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        ) : (
          <Alert severity="info">No maintenance issues found for this room.</Alert>
        )
      ) : (
        <Alert severity="info">Please select a room to view maintenance issues.</Alert>
      )}
    </Container>
  );
};

export default MaintenanceIssuesAdmin;
