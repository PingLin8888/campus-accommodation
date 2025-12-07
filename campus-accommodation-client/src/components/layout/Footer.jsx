import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  let today = new Date();
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          &copy; {today.getFullYear()} Campus Accommodation. All rights
          reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
