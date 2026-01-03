import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logMaintenanceIssue } from "../utils/ApiFunctions";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LogIssue = () => {
  const [description, setDescription] = useState("");
  const [roomId, setRoomId] = useState("");
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

      const response = await logMaintenanceIssue(
        userEmail,
        roomId,
        description
      );
      if (response) {
        navigate("/issues");
      }
    } catch (error) {
      setError("Failed to log issue. Please try again.");
      console.error("Error logging issue:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/issues")}
          sx={{ mb: 2 }}
        >
          Back to Issues
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Log New Issue
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Report a maintenance issue in your room
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
            <TextField
              fullWidth
              variant="outlined"
              label="Room ID"
              type="number"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
              helperText="Enter the ID of the room with the issue"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Box>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                Problem Description *
              </Typography>
              <Box
                component="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Please describe the maintenance issue in detail..."
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
                Be specific about the problem so maintenance staff can address it properly
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => navigate("/issues")}
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
                {isSubmitting ? "Submitting..." : "Submit Issue"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default LogIssue;
