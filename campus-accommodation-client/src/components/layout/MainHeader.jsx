import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundImage: (theme) =>
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
            }}
          >
            Welcome to&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "clamp(3rem, 10vw, 4rem)",
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              Campus Accommodation
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
          >
            Experience the Best Campus Accommodation in Ireland. Find your
            perfect room with modern amenities, comfortable living spaces, and a
            vibrant community.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/browse-all-rooms"
              sx={{ minWidth: "fit-content" }}
            >
              Browse Rooms
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/find-booking"
              sx={{ minWidth: "fit-content" }}
            >
              Find Booking
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default MainHeader;
