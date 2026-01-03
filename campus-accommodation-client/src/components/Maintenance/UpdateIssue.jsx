import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateMaintenanceIssue } from "../utils/ApiFunctions";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UpdateIssue = () => {
  const { issueId } = useParams();
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const userEmail = localStorage.getItem("userId");
      if (!userEmail) {
        setError("Please login to continue.");
        setIsSubmitting(false);
        return;
      }

      const updateIssueRequest = { updateDescription: description, status };
      const response = await updateMaintenanceIssue(
        issueId,
        userEmail,
        updateIssueRequest
      );
      if (response) {
        navigate(`/issues/${issueId}`);
      }
    } catch (error) {
      setError("Failed to update issue. Please try again.");
      console.error("Error updating issue:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/issues/${issueId}`)}
          sx={{ mb: 2 }}
        >
          Back to Issue Details
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Update Issue #{issueId}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Provide an update on the status of this maintenance issue
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl fullWidth required>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select Status</em>
                </MenuItem>
                <MenuItem value="LOGGED">Logged</MenuItem>
                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                <MenuItem value="RESOLVED">Resolved</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                Update Description *
              </Typography>
              <Box
                component="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Describe what was done to address this issue..."
                rows={6}
                sx={{
                  width: '100%',
                  padding: '16.5px 14px',
                  fontSize: '1rem',
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
                    padding: '15.5px 13px',
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1.75, mt: 0.5, display: 'block' }}>
                Provide details about the actions taken or current progress
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => navigate(`/issues/${issueId}`)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Update"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default UpdateIssue;
