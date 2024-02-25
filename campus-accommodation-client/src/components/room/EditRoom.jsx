import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { roomId } = useParams();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImagePreview(roomData.photo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateRoom(roomId, room);
      if (response.status === 200) {
        setSuccessMessage("Room was updated successfully");
        const updatedRoomData = await getRoomById(roomId);
        setRoom(updateRoom);
        setImagePreview(updatedRoomData.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  /* e represents the event object passed to the event handler when an event (such as a change event) occurs on an input element. */
  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseFloat(value);
      } else {
        value = "";
      }
    }
    setRoom({ ...room, [name]: value });
  };

  return (
    <>
      <section className="container, mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="clo-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Edit room</h2>
            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label hotel-color">
                  Room Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="roomType"
                  name="roomType"
                  value={room.roomType}
                  onChange={handleRoomInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label hotel-color">
                  Room Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="roomPrice"
                  name="roomPrice"
                  value={room.roomPrice}
                  onChange={handleRoomInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="photo" className="form-label hotel-color">
                  Room Photo
                </label>
                <input
                  required
                  type="file"
                  id="photo"
                  name="photo"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={`data:image/jpeg;base64,${imagePreview}`}
                    alt="Room preview"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  />
                )}
              </div>
              <div className="d-grid gap-2 d-md-flex mt-2">
                <Link
                  to={"/existing-rooms"}
                  className="btn btn-outline-info ml-5"
                >
                  back
                </Link>
                <button type="submit" className="btn btn-outline-warning">
                  Edit Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditRoom;
