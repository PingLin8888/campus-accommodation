import React, { useState } from "react";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunctions";
import { Form } from "react-bootstrap";
import moment from "moment";

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [successCancellMessage, setSuccessCancellMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    bookingId: "",
    room: "",
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
  });
  const [isDeleted, setIsDeleted] = useState(false);

  const clearBookingInfo = {
    bookingId: "",
    room: "",
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
  };

  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
      setError(null);
    } catch (error) {
      setBookingInfo(clearBookingInfo);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
      setIsDeleted(false);
    }, 2000);
  };

  const handleBookingCancellation = async (bookingId) => {
    try {
      //   console.log(bookingInfo);
      await cancelBooking(bookingInfo.bookingId);
      setIsDeleted(true);
      setBookingInfo(clearBookingInfo);
      setConfirmationCode("");
      setError("");
      setSuccessCancellMessage("Booking has been cacelled successfully");
    } catch (error) {
      setError(error.message);
    }
    // setTimeout(() => {
    //   setSuccessCancellMessage("");
    // }, 2000);
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h2>Find Booking</h2>
        <Form onSubmit={handleFormSubmit} className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="confirmtionCode"
              name="confirmtionCode"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Enter the booking confirmation code"
            />
            <button className="btn btn-hotel input-group-text">
              Find booking
            </button>
          </div>
        </Form>
        {isLoading ? (
          <div>Finding booking...</div>
        ) : error ? (
          <div className="text-danger">Error: {error}</div>
        ) : bookingInfo.bookingConfirmationCode ? (
          <div className="col-md-6 mt-4 mb-5">
            <h3>Booking Information</h3>
            <p className="text-success">
              Booking Confirmation Code: {bookingInfo.bookingConfirmationCode}
            </p>
            {/* <p>Booking ID: {bookingInfo.id}</p> */}
            <p>Room Number: {bookingInfo.room.id}</p>
            <p>Room Type: {bookingInfo.room.roomType}</p>
            <p>
              Check-in Date:{" "}
              {moment(bookingInfo.checkInDate)
                .subtract(1, "month")
                .format("MMM Do, YYYY")}
            </p>
            <p>
              Check-out Date:{" "}
              {moment(bookingInfo.checkOutDate)
                .subtract(1, "month")
                .format("MMM Do, YYYY")}
            </p>
            <p>Full Name: {bookingInfo.guestFullName}</p>
            <p>Email Address: {bookingInfo.guestEmail}</p>
            <p>Adults: {bookingInfo.numOfAdults}</p>
            <p>Children: {bookingInfo.numOfChildren}</p>
            <p>Total Guests: {bookingInfo.totalNumOfGuest}</p>
            {!isDeleted && (
              <button
                className="btn btn-danger"
                onClick={() => handleBookingCancellation(bookingInfo.bookingId)}
              >
                Cancle Booking
              </button>
            )}
          </div>
        ) : (
          <div> FindBooking</div>
        )}

        {isDeleted && (
          <div className="alert alert-success mt-3 fade show" role="alert">
            {successCancellMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default FindBooking;
