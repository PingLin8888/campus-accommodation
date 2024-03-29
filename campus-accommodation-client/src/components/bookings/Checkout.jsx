import React, { useState, useEffect } from "react";
import BookingForm from "./BookingForm";
import { useParams } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunctions";
import {
  FaParking,
  FaTshirt,
  FaTv,
  FaUtensils,
  FaWifi,
  FaWineGlassAlt,
} from "react-icons/fa";
import RoomCarousel from "../common/RoomCarousel";

const Checkout = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });
  const { roomId } = useParams();

  //   useEffect(() => {
  //     setTimeout(() => {
  //       getRoomById(roomId)
  //         .then((response) => {
  //           setRoomInfo(response);
  //           setIsLoading(false);
  //         })
  //         .catch((error) => {
  //           setError(error);
  //           setIsLoading(false);
  //         });
  //     }, 2000);
  //   }, [roomId]);

  useEffect(() => {
    let isMounted = true;

    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          if (isMounted) {
            // console.log("Response:", response); // Log the response
            setRoomInfo(response);
            setIsLoading(false);
            setError(null);
          }
        })
        .catch((error) => {
          if (isMounted) {
            setError(error);
            setIsLoading(false);
          }
        });
    }, 2000);

    return () => {
      isMounted = false;
    };
  }, [roomId]);

  return (
    <div>
      <section className="container">
        <div className="row flex-column flex-md-row align-items-center">
          <div className="col-md-4 mt-5 mb-5">
            {isLoading ? (
              <p>Loading room information</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="room-info">
                <img
                  src={`data:image/png;base64,${roomInfo.photo}`}
                  alt="Room Photo"
                  style={{ width: "100%", height: "200px" }}
                />
                <table>
                  <tbody>
                    <tr>
                      <th>Room Type :</th>
                      <th>{roomInfo.roomType}</th>
                    </tr>
                    <tr>
                      <th>Room Price :</th>
                      <th>{roomInfo.roomPrice}</th>
                    </tr>

                    <tr>
                      <th>Room Service:</th>
                      <td>
                        <ul className="list-unstyled">
                          <li>
                            <FaWifi />
                            WiFi
                          </li>
                          <li>
                            <FaTv />
                            Netflix Premium
                          </li>
                          <li>
                            <FaUtensils />
                            Breakfast
                          </li>
                          <li>
                            <FaWineGlassAlt />
                            Mini bar refreshment
                          </li>
                          <li>
                            <FaParking />
                            Parking Space
                          </li>
                          <li>
                            <FaTshirt />
                            Laundry
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-8">
            <BookingForm />
          </div>
        </div>
      </section>
      <div className="container">
        <RoomCarousel />
      </div>
    </div>
  );
};

export default Checkout;
