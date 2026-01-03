import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMaintenanceIssuesByUserEmail } from "../utils/ApiFunctions";
import { format, parseISO } from "date-fns";
import {
  Container,
  Box,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Alert,
  CircularProgress,
  Chip,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setIsLoading(true);
        const response = await getMaintenanceIssuesByUserEmail(userId, token);
        if (Array.isArray(response)) {
          setIssues(response);
        } else {
          console.error("Unexpected response format:", response);
          setError("Failed to fetch issues: Unexpected response format.");
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
        setError("Failed to fetch issues. Please login again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, [userId, token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "LOGGED":
        return "error";
      case "IN_PROGRESS":
        return "warning";
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

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          My Issues
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/log-issue"
          startIcon={<AddIcon />}
        >
          Log New Issue
        </Button>
      </Stack>

      {issues.length > 0 ? (
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Issue ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Description</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Room ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Created At</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.map((issue) => (
                <TableRow 
                  key={issue.id}
                  sx={{ 
                    "&:hover": { backgroundColor: "action.hover" },
                    "&:last-child td, &:last-child th": { border: 0 }
                  }}
                >
                  <TableCell>{issue.id}</TableCell>
                  <TableCell>{issue.issueDescription}</TableCell>
                  <TableCell>{issue.roomId}</TableCell>
                  <TableCell>
                    <Chip
                      label={formatStatusDisplay(issue.status)}
                      color={getStatusColor(issue.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {issue.createdAt ? format(parseISO(issue.createdAt), "MMM dd, yyyy") : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/issues/${issue.id}`}
                      startIcon={<VisibilityIcon />}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="info">
          You have not reported any issues yet. Click "Log New Issue" to report a problem.
        </Alert>
      )}
    </Container>
  );
};

export default IssueList;
