import React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const services = [
  {
    icon: <WifiIcon sx={{ fontSize: 40 }} />,
    title: "High-Speed WiFi",
    description:
      "Stay connected with fast and reliable internet access throughout your stay.",
  },
  {
    icon: <ThermostatIcon sx={{ fontSize: 40 }} />,
    title: "Heating & Hot Water",
    description: "Enjoy comfortable temperatures and hot water available 24/7.",
  },
  {
    icon: <LocalLaundryServiceIcon sx={{ fontSize: 40 }} />,
    title: "Laundry Service",
    description:
      "Keep your clothes clean and fresh with our convenient laundry facilities.",
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
    title: "24-Hour Front Desk",
    description:
      "Our friendly staff is available around the clock to assist you.",
  },
];

const HotelService = () => {
  return (
    <Box 
      component="section"
      sx={{ 
        pt: { xs: 8, sm: 10, md: 12 },
        pb: { xs: 8, sm: 10 },
        backgroundColor: (theme) => 
          theme.palette.mode === "light" 
            ? theme.palette.background.default 
            : theme.palette.background.paper,
      }}
    >
      <Container>
        <Stack
          spacing={2}
          useFlexGap
          sx={{ width: { xs: "100%", sm: "70%" }, mx: "auto", mb: 6 }}
        >
          <Typography
            component="h2"
            variant="h4"
            sx={{
              color: "text.primary",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            We provide exceptional amenities to make your campus accommodation
            experience comfortable and convenient
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? "0 12px 24px rgba(0,0,0,0.1)"
                        : "0 12px 24px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                  <Box
                    sx={{
                      color: "primary.main",
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    sx={{ textAlign: "center", fontWeight: 600 }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HotelService;
