import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    // Authorization: `Bearer${token}`,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",
  };
};

export const getHeaderAddRoom = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };
};

/* This function adds a new room to the database. */
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const response = await api.post("/rooms/add/new-room", formData, {
    headers: getHeaderAddRoom(),
  });
  if (response.status == 201) {
    return true;
  } else {
    return false;
  }
}

/* This function gets all room types. */
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room types.");
  }
}

//Works.
/* This function gets all rooms */
export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/all-rooms");
    return result.data;
  } catch (error) {
    throw new Error("Error fetching all rooms.");
  }
}

/* This function gets the cheapest room */
export async function getCheapestRoom() {
  try {
    const result = await api.get("/rooms/cheapest-room");
    return result.data;
  } catch (error) {
    throw new Error("Error fetching the cheapest room.");
  }
}

/* This function gets the most demand room */
export async function getMostDemandRoom() {
  try {
    const result = await api.get("/rooms/most-in-demand-room");
    return result.data;
  } catch (error) {
    throw new Error("Error fetching the most demand room.");
  }
}

/* This function deletes a room by ID */
export async function deleteRoom(roomId) {
  try {
    const result = await api.delete(`/rooms/delete/room/${roomId}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting the room. ${error.message}`);
  }
}

/* This funciton update a room by id */
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);
  const response = await api.put(`/rooms/update/${roomId}`, formData, {
    headers: getHeaderAddRoom(),
  });
  return response;
}

/* This funciton gets a room by id */
export async function getRoomById(roomId) {
  try {
    const result = await api.get(`/rooms/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching room ${error.message}`);
  }
}
/* This function saves a new booking to the database. */
export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(
      `/bookings/room/${roomId}/bookRoom`,
      booking,
      {
        headers: getHeader(),
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error booking room : ${error.message}`);
    }
  }
}

// catch (error) {
//   setBookingInfo(clearBookingInfo);
//   if (error.response && error.response.status === 404) {
//     setError(error.response.data.message);
//   } else {
//     setError(error.message);
//   }
// }

/* This function gets all bookings */
export async function getAllBookings() {
  try {
    const result = await api.get("/bookings/all-bookings", {
      headers: getHeader(), // Use getHeader() here to include the token
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching all bookings: ${error.message}`);
  }
}

/* This function gets booking by confirmation code. */
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`, {
      headers: getHeader(), // Use getHeader() here to include the token
    });
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error find booking: ${error.message}`);
    }
  }
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
  try {
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`, {
      headers: getHeader(), // Use getHeader() here to include the token
    });

    return result.data;
  } catch (error) {
    throw new Error(`Error cancelling booking: ${error.message}`);
  }
}

/* This function gets all availabe rooms from the database with a given data and a room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  const result = await api.get(
    `/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
  );
  return result;
}

export async function userRegistration(registration) {
  try {
    const response = await api.post("/auth/register-user", registration);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`User registration error: ${error.message}`);
    }
  }
}

export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserProfile(userId, token) {
  try {
    const response = await api.get(`users/profile/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export async function getUser(userId, token) {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getBookingsByUserId(userId, token) {
  try {
    const response = await api.get(`/bookings/user/${userId}/bookings`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings: ", error.message);
    throw new Error("Failded to fetch bookings");
  }
}

export const getMaintenanceIssuesByRoom = async (roomId) => {
  try {
    const response = await api.get(`/api/maintenance/room/${roomId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching maintenance issue by room: ", error.message);
    throw new Error("Failded to fetch maintenance issue by room");
  }
  // const response = await axios.get(`/api/maintenance/room/${roomId}`);
  // return response.data;
};

export const getMaintenanceIssuesByUserEmail = async (userEmail) => {
  try {
    const response = await api.get(`/api/maintenance/userEmail/${userEmail}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching maintenance issue by user: ", error.message);
    throw new Error("Failded to fetch maintenance issue by user");
  }
};

export const getMaintenanceIssueById = async (issueId) => {
  try {
    const response = await api.get(`/api/maintenance/issues/${issueId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching maintenance issue by issueId: ",
      error.message
    );
    throw new Error("Failded to fetch maintenance issue by issueId");
  }
};

export const logMaintenanceIssue = async (userEmail, roomId, description) => {
  try {
    const response = await api.post(
      "/api/maintenance/log",
      { description },
      {
        headers: getHeader(),
        params: {
          userEmail,
          roomId,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error logging maintenance issue: ${error.message}`);
    }
  }
};

export const updateMaintenanceIssue = async (
  issueId,
  userEmail,
  updateIssueRequest
) => {
  try {
    const response = await api.put(
      "/api/maintenance/update",
      updateIssueRequest,
      {
        headers: getHeader(),
        params: {
          issueId,
          userEmail,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error updating maintenance issue: ${error.message}`);
    }
  }
};
