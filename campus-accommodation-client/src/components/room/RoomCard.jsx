import React, { useContext } from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

//{ room } extracts the room property from the object passed as an argument to the RoomCard component.
const RoomCard = ({ room }) => {
  return (
    <Col className="mb-4" xs={12} key={room.id}>
      <Card>
        <Card.Body className="d-flex flex-wrap alignitems-center">
          <div className="flex-shrink-0 mr-3 mb-md-0">
            <Link to={"/book-room/${room.id"}>
              <Card.Img
                variant="top"
                src={`data:image/png;base64,${room.photo}`}
                alt="Room Photo"
                style={{ width: "100", maxWidth: "200px", height: "auto" }}
              />
            </Link>
          </div>
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">Room ID: {room.id}</Card.Title>
            <Card.Title className="hotel-color">
              Room Type: {room.roomType}
            </Card.Title>
            <Card.Title className="hotel-color">
              Room Price: {room.roomPrice}
            </Card.Title>
            <Card.Text>
              {/* Some room information goes here for the guest to read through */}
            </Card.Text>
          </div>
          <div className="flex-shrink-0 mt-3">
            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
              Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
