import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMaintenanceIssueById } from "../utils/ApiFunctions";
import { format, parseISO } from "date-fns";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Chip,
  Divider,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import RoomIcon from "@mui/icons-material/Room";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const IssueDetail = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setIsLoading(true);
        const response = await getMaintenanceIssueById(issueId);
        setIssue(response);
      } catch (error) {
        console.error("Error fetching issue:", error);
        setError("Failed to fetch issue details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssue();
  }, [issueId]);

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
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/issues")}
          sx={{ mt: 2 }}
        >
          Back to Issues
        </Button>
      </Container>
    );
  }

  if (!issue) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Alert severity="warning">Issue not found.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/issues")}
          sx={{ mb: 2 }}
        >
          Back to Issues
        </Button>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Issue #{issue.id}
          </Typography>
          <Chip
            label={formatStatusDisplay(issue.status)}
            color={getStatusColor(issue.status)}
            size="medium"
          />
        </Stack>
      </Box>

      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Issue Details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, minWidth: 120 }}>
                  Description:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {issue.issueDescription}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <RoomIcon color="action" fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Room ID:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {issue.roomId}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon color="action" fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  User ID:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {issue.userId}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarTodayIcon color="action" fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Created:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {issue.createdAt ? format(parseISO(issue.createdAt), "MMM dd, yyyy, h:mm a") : "N/A"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Update History
          </Typography>

          {issue.updatesResponses && issue.updatesResponses.length > 0 ? (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "action.hover" }}>
                    <TableCell sx={{ fontWeight: 600 }}>Update ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Updated At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {issue.updatesResponses.map((update) => (
                    <TableRow key={update.id}>
                      <TableCell>{update.id}</TableCell>
                      <TableCell>
                        <Chip
                          label={formatStatusDisplay(update.status)}
                          color={getStatusColor(update.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{update.issueDescription}</TableCell>
                      <TableCell>
                        {update.updatedAt ? format(parseISO(update.updatedAt), "MMM dd, yyyy, h:mm a") : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity="info">No updates available for this issue yet.</Alert>
          )}

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              component={Link}
              to={`/update-issue/${issue.id}`}
              startIcon={<EditIcon />}
            >
              Update Issue
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default IssueDetail;
