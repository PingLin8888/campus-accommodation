import React, { useEffect, useState } from "react";
import { bookRoom, getRoomById } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { FormControl, Form, Button } from "react-bootstrap";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const currentUser = localStorage.getItem("userId");

  const initialGuestName = currentUser ? currentUser.split("@")[0] : "";

  const [booking, setBooking] = useState({
    guestName: initialGuestName,
    guestEmail: currentUser,
    checkInDate: moment().format("YYYY-MM-DD"),
    checkOutDate: "",
    numberOfAdults: 1,
    numberOfChildren: "",
  });
  //   const [roomInfo, setRoomInfo] = useState({
  //     photo: "",
  //     roomType: "",
  //     roomPrice: "",
  //   });

  const { roomId } = useParams();
  const navigate = useNavigate();

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, "days");
    const price = roomPrice ? roomPrice : 0;
    // console.log(`Price: ${price}, Difference in Days: ${diffInDays}`);
    return diffInDays * price;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Name: ${name}, Value: ${value}`);
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numberOfAdults);
    // const childrenCount = parseInt(booking.numberOfChildren);
    // const totalCount = adultCount + childrenCount;
    // return totalCount >= 1 && adultCount >= 1;
    return adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage("Check-out date must come after check-in date.");
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isGuestCountValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setIsValidated(true);
  };

  const handleBooking = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error) {
      setErrorMessage(error.message);
      navigate("/booking-success", { state: { error: errorMessage } });
    }
  };

  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-7">
            <div className="card card-body mt-5">
              <h4 className="card-title">Reserve Room</h4>
              <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="guestName" className="hotel-color">
                    Full Name:
                  </Form.Label>
                  <FormControl
                    required
                    type="text"
                    id="guestName"
                    name="guestName"
                    value={booking.guestName}
                    placeholder="Enter your full name"
                    onChange={handleInputChange}
                  />
                  <FormControl.Feedback type="invalid">
                    Please enter your fullname
                  </FormControl.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="guestEmail" className="hotel-color">
                    Email:
                  </Form.Label>
                  <FormControl
                    required
                    type="text"
                    id="guestEmail"
                    name="guestEmail"
                    value={booking.guestEmail}
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                  />
                  <FormControl.Feedback type="invalid">
                    Please enter your email address.
                  </FormControl.Feedback>
                </Form.Group>

                <fieldset style={{ border: "2px" }}>
                  <legend>Lodging period</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Label htmlFor="checkInDate" className="hotel-color">
                        Check-In date:
                      </Form.Label>
                      <FormControl
                        required
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={booking.checkInDate}
                        placeholder="check-in date"
                        onChange={handleInputChange}
                      />
                      <FormControl.Feedback type="invalid">
                        Please select a check-in-date
                      </FormControl.Feedback>
                    </div>

                    <div className="col-6">
                      <Form.Label
                        htmlFor="checkOutDate"
                        className="hotel-color"
                      >
                        Check-Out date:
                      </Form.Label>
                      <FormControl
                        required
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={booking.checkOutDate}
                        placeholder="check-out date"
                        onChange={handleInputChange}
                      />
                      <FormControl.Feedback type="invalid">
                        Please select a check-out-date
                      </FormControl.Feedback>
                    </div>
                    {errorMessage && (
                      <p className="error-message text-danger">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </fieldset>

                <fieldset style={{ border: "2px" }}>
                  <legend>Number of Guest</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Label
                        htmlFor="numberOfAdults"
                        className="hotel-color"
                      >
                        Adults:
                      </Form.Label>
                      <FormControl
                        required
                        type="number"
                        id="numberOfAdults"
                        name="numberOfAdults"
                        value={booking.numberOfAdults}
                        placeholder="0"
                        min={1}
                        onChange={handleInputChange}
                      />
                      <FormControl.Feedback type="invalid">
                        Please select at least 1 adult.
                      </FormControl.Feedback>
                    </div>

                    <div className="col-6">
                      <Form.Label
                        htmlFor="numberOfChildren"
                        className="hotel-color"
                      >
                        Children:
                      </Form.Label>
                      <FormControl
                        // required
                        type="number"
                        id="numberOfChildren"
                        name="numberOfChildren"
                        value={booking.numberOfChildren}
                        placeholder="0"
                        min={0}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </fieldset>
                <div className="form-group mt-2 mb-2">
                  <button className="btn btn-hotel" type="submit">
                    Continue
                  </button>
                </div>
              </Form>
            </div>
          </div>
          <div className="col-md-5">
            {isSubmitted && (
              <BookingSummary
                booking={booking}
                isFormValid={isValidated}
                onConfirm={handleBooking}
                calculatePayment={calculatePayment}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
