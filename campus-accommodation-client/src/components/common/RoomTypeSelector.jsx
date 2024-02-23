import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([""]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  //   useEffect(() => {
  //     console.log(newRoomType); // This will log the updated value of newRoomType
  //   }, [newRoomType]);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
    //state updates are asynchronous, so you won't immediately see the updated value of newRoomType here
  };

  //Add new room to the rooTypes list. Then clear the roomType input.
  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };

  /* create UI */
  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            required
            className="roomType"
            name="roomType"
            value={newRoom.roomType}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewRoomTypeInput(true);
              } else {
                handleRoomInputChange(e);
              }
            }}
          >
            <option value="">select a room type</option>
            <option value={"Add New"}>Add New</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div className="mt-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a new room type"
                  //   value={newRoomType}
                  onChange={handleNewRoomTypeInputChange}
                />
                <button
                  className="btn btn-hotel"
                  type="button"
                  onClick={handleAddNewRoomType}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomTypeSelector;
