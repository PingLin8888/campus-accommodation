import React, { useState } from "react";
import { addRoom } from "../utils/ApiFunctions";
import { Link as RouterLink } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  Link,
  Card,
  CardMedia,
} from "@mui/material";

function AddRoom() {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseFloat(value);
      } else {
        value = "";
      }
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.roomPrice
      );
      if (success !== undefined) {
        setSuccessMessage("A new room was added to the database");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Add a New Room
        </Typography>

            {successMessage && (
          <Alert severity="success" sx={{ width: "100%", mb: 3 }}>
                {successMessage}
          </Alert>
            )}

            {errorMessage && (
          <Alert severity="error" sx={{ width: "100%", mb: 3 }}>
            {errorMessage}
          </Alert>
            )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Stack spacing={3}>
            <Box>
                  <RoomTypeSelector
                    handleRoomInputChange={handleRoomInputChange}
                    newRoom={newRoom}
                  />
            </Box>

            <TextField
              fullWidth
                  id="roomPrice"
                  name="roomPrice"
              label="Room Price"
              type="number"
                  value={newRoom.roomPrice}
                  onChange={handleRoomInputChange}
              required
              inputProps={{ min: 0, step: 0.01 }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mb: 2 }}
              >
                Upload Room Photo
                <input
                  type="file"
                  hidden
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
                {imagePreview && (
                <Card sx={{ mt: 2 }}>
                  <CardMedia
                    component="img"
                    image={imagePreview}
                    alt="Preview Room Photo"
                    sx={{
                      maxWidth: "100%",
                      maxHeight: 400,
                      objectFit: "contain",
                    }}
                  />
                </Card>
                )}
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                component={RouterLink}
                to="/existing-rooms"
                variant="outlined"
                sx={{ flex: 1 }}
              >
                Back to Existing Rooms
              </Button>
              <Button type="submit" variant="contained" sx={{ flex: 1 }}>
                  Save Room
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default AddRoom;
