import React, { useState } from "react";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunctions";
import { tr } from "date-fns/locale";
import { Form } from "react-router-dom";

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
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
    id: "",
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
    } catch (error) {
      setBookingInfo(clearBookingInfo);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError(error.response);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingInfo.id);
      setIsDeleted(true);
      setBookingInfo(clearBookingInfo);
      setConfirmationCode("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h2>Find My Booking</h2>
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
        {isLoading?(
            <div className="text-danger">{error}</div>
        );(
            bookingInfo.bookingConfirmationCode?(
                <div className="col-md-6 mt-4 mb-5">
                    <h3>Booking Information</h3>
                    <p>Booking Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
                    <p>Booking ID: {bookingInfo.id}</p>
                    <p>Room Number: {bookingInfo.room.id}</p>
                    <p>Check-in Date: {bookingInfo.checkInDate}</p>
                    <p>Check-out Date: {bookingInfo.checkOutDate}</p>
                    <p>Full Name: {bookingInfo.guestFullName}</p>
                    <p>Email Address: {bookingInfo.guestEmail}</p>
                    <p>Adults: {bookingInfo.numOfAdults}</p>
                    <p>Children: {bookingInfo.numOfChildren}</p>
                    <p>Total Guests: {bookingInfo.totalNumOfGuest}</p>


                </div>
            ):()
        )}
        FindBooking
      </div>
    </>
  );
};

export default FindBooking;
