import React, { useState, useEffect } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import RoomCard from "./RoomCard";
import { Row, Container, Col } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";

const Room = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);
  /* [{ id: "" }] is the initial state value for filteredData, which is an array containing an object with an id property set to an empty string (""). This is a common pattern when initializing state variables that will hold arrays or objects. */
  const [filteredData, setFilteredData] = useState([{ id: "" }]);

  /* If the array is empty ([]), it means that the effect runs only once, after the initial render, and does not depend on any state or props changes.  */
  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading rooms...</div>;
  }
  if (error) {
    return <div className="text-danger">Error:{error}</div>;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / roomsPerPage);

  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;
    return (
      filteredData
        .slice(startIndex, endIndex)
        /* The .map() function is being used to transform each item in the filteredData array into a corresponding JSX element. In this case, it's mapping each room object in the filteredData array to a RoomCard component. */
        .map((room) => <RoomCard key={room.id} room={room} />)
    );
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <RoomFilter data={data} setFilteredData={setFilteredData} />
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-end">
            <RoomPaginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Col>
        </Row>

        <Row>{renderRooms()}</Row>

        <Row>
          <Col md={6} className="d-flex align-items-center justify-content-end">
            <RoomPaginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Room;
