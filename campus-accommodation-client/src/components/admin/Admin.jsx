import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Avatar,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import BuildIcon from "@mui/icons-material/Build";

const Admin = () => {
  const adminSections = [
    {
      title: "Manage Rooms",
      description: "Add, edit, and view all room listings",
      icon: <MeetingRoomIcon sx={{ fontSize: 40 }} />,
      link: "/existing-rooms",
      color: "#1976d2",
    },
    {
      title: "Manage Bookings",
      description: "View and manage all customer bookings",
      icon: <BookOnlineIcon sx={{ fontSize: 40 }} />,
      link: "/existing-bookings",
      color: "#2e7d32",
    },
    {
      title: "Maintenance",
      description: "Handle maintenance requests and issues",
      icon: <BuildIcon sx={{ fontSize: 40 }} />,
      link: "/maintenanceIssue",
      color: "#ed6c02",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Admin Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Welcome to Campus Accommodation Management
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {adminSections.map((section, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: (theme) =>
                    theme.palette.mode === "light"
                      ? "0 12px 24px rgba(0,0,0,0.15)"
                      : "0 12px 24px rgba(0,0,0,0.4)",
                },
              }}
            >
              <CardActionArea
                component={RouterLink}
                to={section.link}
                sx={{ height: "100%" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 4,
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: section.color,
                      mb: 2,
                    }}
                  >
                    {section.icon}
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {section.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {section.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Admin;
