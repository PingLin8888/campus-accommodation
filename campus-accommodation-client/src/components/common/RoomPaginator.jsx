import React from "react";
import { Pagination } from "@mui/material";

const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      color="primary"
      size="large"
      showFirstButton
      showLastButton
    />
  );
};

export default RoomPaginator;
