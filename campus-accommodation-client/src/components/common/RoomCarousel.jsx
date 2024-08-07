import React, { useEffect, useState } from "react";
import {
  getAllRooms,
  getCheapestRoom,
  getMostDemandRoom,
} from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Carousel, Container, Card } from "react-bootstrap";

const RoomCard = ({ room, label }) => (
  <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
    <Card>
      {label && <div className="label">{label}</div>}

      <Link to={`/book-room/${room.id}`}>
        <Card.Img
          variant="top"
          src={`data:image/png;base64,${room.photo}`}
          alt={`${room.roomType} Photo`}
          className="w-100"
          style={{ height: "200px" }}
        />
      </Link>
      <Card.Body>
        <Card.Title className="hotel-color">{room.roomType}</Card.Title>
        <Card.Title className="hotel-color">{room.roomPrice}</Card.Title>
        <div className="flex-shrink-0 mt-3">
          <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
            Book Now
          </Link>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([]);
  const [cheapestRoom, setCheapestRoom] = useState(null);
  const [mostDemandRoom, setMostDemandRoom] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoomsData = async () => {
    try {
      setIsLoading(true);
      const [roomsData, cheapestRoomData, mostDemandRoomData] =
        await Promise.all([
          getAllRooms(),
          getCheapestRoom(),
          getMostDemandRoom(),
        ]);
      setRooms(roomsData);
      setCheapestRoom(cheapestRoomData);
      setMostDemandRoom(mostDemandRoomData);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomsData();
  }, []);

  if (isLoading) {
    return <div className="mt-5">Loading rooms...</div>;
  }
  if (errorMessage) {
    return <div className="text-danger mb-5 mt-5">Error : {errorMessage}</div>;
  }

  return (
    <div>
      <section className="bg-light mb-5 mt-5 shadow">
        <Link to={"/browse-all-rooms"} className="hotel-color text-center">
          Browse all rooms
        </Link>

        <Container>
          <Carousel indicators={false}>
            {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
              <Carousel.Item key={index}>
                <Row>
                  {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                    <RoomCard room={room} key={room.id} />
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>

      <section className="bg-light mb-5 mt-5 shadow">
        <Container>
          <h2 className="text-center">Featured Rooms</h2>
          <Row className="justify-content-center">
            {cheapestRoom && (
              <RoomCard room={cheapestRoom} label="Cheapest Room" />
            )}
            {mostDemandRoom && (
              <RoomCard room={mostDemandRoom} label="Most In-Demand Room" />
            )}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default RoomCarousel;
