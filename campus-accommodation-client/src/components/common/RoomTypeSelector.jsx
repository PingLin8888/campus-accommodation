import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([""]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
      // Automatically select the newly added room type
      handleRoomInputChange({
        target: { name: "roomType", value: newRoomType },
      });
    }
  };

  return (
    <>
      {roomTypes.length > 0 && (
        <Box>
          <FormControl fullWidth required>
            <InputLabel id="room-type-label">Room Type</InputLabel>
            <Select
              labelId="room-type-label"
              id="roomType"
            name="roomType"
            value={newRoom.roomType}
              label="Room Type"
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewRoomTypeInput(true);
              } else {
                handleRoomInputChange(e);
              }
            }}
          >
              <MenuItem value="">
                <em>Select a room type</em>
              </MenuItem>
              <MenuItem value="Add New">Add New</MenuItem>
            {roomTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                {type}
                </MenuItem>
            ))}
            </Select>
          </FormControl>
          {showNewRoomTypeInput && (
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                  type="text"
                  placeholder="Enter a new room type"
                value={newRoomType}
                  onChange={handleNewRoomTypeInputChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddNewRoomType();
                  }
                }}
                />
              <Button
                variant="contained"
                  onClick={handleAddNewRoomType}
                sx={{ minWidth: 100 }}
                >
                  Add
              </Button>
            </Stack>
          )}
        </Box>
      )}
    </>
  );
};

export default RoomTypeSelector;
