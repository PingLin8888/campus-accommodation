import React, { useEffect, useState } from "react";
import {
  getAllRooms,
  getCheapestRoom,
  getMostDemandRoom,
} from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Carousel, Container, Card } from "react-bootstrap";

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([
    { id: "", roomType: "", roomPrice: "", photo: "" },
  ]);
  const [cheapestRoom, setCheapestRoom] = useState(null);
  const [mostDemandRoom, setMostDemandRoom] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getAllRooms(), getCheapestRoom(), getMostDemandRoom()])
      .then(([roomsData, cheapestRoomData, mostDemandRoomData]) => {
        setRooms(roomsData);
        setCheapestRoom(cheapestRoomData);
        setMostDemandRoom(mostDemandRoomData);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
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
          Browse all room
        </Link>

        <Container>
          <Carousel indicators={false}>
            {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
              <Carousel.Item key={index}>
                <Row>
                  {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                    <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                      <Card>
                        <Link to={`/book-room/${room.id}`}>
                          <Card.Img
                            variant="top"
                            src={`data:image/png;base64,${room.photo}`}
                            alt="Room Photo"
                            className="w-100"
                            style={{ height: "200px" }}
                          ></Card.Img>
                        </Link>
                        <Card.Body>
                          <Card.Title className="hotel-color">
                            Room ID:
                            {room.id}
                          </Card.Title>
                          <Card.Title className="hotel-color">
                            Room Type:
                            {room.roomType}
                          </Card.Title>
                          <Card.Title className="hotel-color">
                            Room Price:
                            {room.roomPrice}
                          </Card.Title>
                          <div className="flex-shrink-0 mt-3">
                            <Link
                              to={`/book-room/${room.id}`}
                              className="btn btn-hotel btn-sm"
                            >
                              Book Now
                            </Link>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
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
              <Col key={cheapestRoom.id} className="mb-4" xs={12} md={6} lg={3}>
                <Card>
                  <Link to={`/book-room/${cheapestRoom.id}`}>
                    <Card.Img
                      variant="top"
                      src={`data:image/png;base64,${cheapestRoom.photo}`}
                      alt="Cheapest Room Photo"
                      className="w-100"
                      style={{ height: "200px" }}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title className="hotel-color">
                      {cheapestRoom.roomType}
                    </Card.Title>
                    <Card.Title className="hotel-color">
                      {cheapestRoom.roomPrice}
                    </Card.Title>
                    <div className="flex-shrink-0 mt-3">
                      <Link
                        to={`/book-room/${cheapestRoom.id}`}
                        className="btn btn-hotel btn-sm"
                      >
                        Book Now
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )}
            {mostDemandRoom && (
              <Col
                key={mostDemandRoom.id}
                className="mb-4"
                xs={12}
                md={6}
                lg={3}
              >
                <Card>
                  <Link to={`/book-room/${mostDemandRoom.id}`}>
                    <Card.Img
                      variant="top"
                      src={`data:image/png;base64,${mostDemandRoom.photo}`}
                      alt="Most In-Demand Room Photo"
                      className="w-100"
                      style={{ height: "200px" }}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title className="hotel-color">
                      {mostDemandRoom.roomType}
                    </Card.Title>
                    <Card.Title className="hotel-color">
                      {mostDemandRoom.roomPrice}
                    </Card.Title>
                    <div className="flex-shrink-0 mt-3">
                      <Link
                        to={`/book-room/${mostDemandRoom.id}`}
                        className="btn btn-hotel btn-sm"
                      >
                        Book Now
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default RoomCarousel;
