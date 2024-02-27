import React from "react";
import { Row, Col } from "react-bootstrap";
import Header from "./Header";
import { FaClock, FaTshirt, FaUtensils, FaWifi } from "react-icons/fa";
import { Card } from "react-bootstrap";

const HotelService = () => {
  return (
    <>
      <div className="mb-2">
        <Header title={"Our Services"} />
        <Row className="mt-4">
          <h4 className="text-center">
            Sercices at{" "}
            <span className="hotel-color">Campus Accommodation - </span>
            <span className="gap-2">
              <FaClock className="ml-5" /> - 24-Hour Front Desk
            </span>
          </h4>
        </Row>
        <hr />
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaWifi />
                  WiFi
                </Card.Title>
                <Card.Text>
                  Stay Connected with high-speed internet access.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaUtensils />
                  Heater and Hot water
                </Card.Title>
                <Card.Text>Heater and hot water for 24/7.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaTshirt />
                  Laundry
                </Card.Title>
                <Card.Text>
                  Keep your clothes clean and fresh with our laundry service.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HotelService;
