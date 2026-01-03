import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";

const RoomFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value;
    setFilter(selectedRoomType);
    const filteredRooms = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
    );
    setFilteredData(filteredRooms);
  };
  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };
  const roomTypes = [
    "",
    ...new Set(
      data.map((room) => {
        return room.roomType;
      })
    ),
  ];

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <FormControl fullWidth>
        <InputLabel id="room-type-filter-label">Filter by Room Type</InputLabel>
        <Select
          labelId="room-type-filter-label"
          id="room-type-filter"
          value={filter}
          label="Filter by Room Type"
          onChange={handleSelectChange}
        >
          <MenuItem value="">
            <em>All room types</em>
          </MenuItem>
          {roomTypes
            .filter((type) => type !== "")
            .map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button variant="outlined" onClick={clearFilter} sx={{ minWidth: 120 }}>
        Clear Filter
      </Button>
    </Stack>
  );
};

export default RoomFilter;
