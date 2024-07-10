
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Replace with appropriate driver icon

const API_URL = 'http://localhost:3000';

const Info = () => {
  const location = useLocation();
  const { busId, from, to, fare, date } = location.state || {};
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [numPassengers, setNumPassengers] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seatDetails, setSeatDetails] = useState([]);

  useEffect(() => {
    if (busId) {
      fetchBusDetails(busId);
    }
  }, [busId]);

  useEffect(() => {
    setNumPassengers(selectedSeats.length);
  }, [selectedSeats]);

  const fetchBusDetails = async (busId) => {
    setIsLoading(true);
    setError(null);
    try {
      const [busResponse, seatResponse] = await Promise.all([
        axios.get(`${API_URL}/bus/${busId}`),
        axios.get(`${API_URL}/seat/seats/${busId}`),
      ]);
      setBus(busResponse.data);
      console.log(bus)
      setSeatDetails(seatResponse.data || []);
      console.log(seatDetails)
    } catch (error) {
      setError('Error fetching bus details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkSeatAvailability = (seat) => {
    if (!seatDetails || seatDetails.length === 0) {
      return true; // No seats booked, all are available
    }
    const currentRouteFrom=from;
    const currentRouteTo=to;
    const isBlocked = seatDetails.some((seatDetail) => {
      const seatBookedFrom = seatDetail.from;
      const seatBookedTo = seatDetail.to;
      const isOverlapping =
        (seatBookedFrom < currentRouteTo && seatBookedTo > currentRouteFrom) ||
        (seatBookedFrom >= currentRouteFrom && seatBookedTo <= currentRouteFrom);

      return (
        isOverlapping &&
        seatDetail.selectedSeats &&
        seatDetail.selectedSeats.includes(seat.toString()) &&
        new Date(seatDetail.bookingDate).toLocaleDateString() === new Date(date).toLocaleDateString()
      );
    });

    return !isBlocked; // Return true if seat is not blocked/booked
  };

  const handleSeatSelection = (seat) => {
    console.log(selectedSeats)
    if (checkSeatAvailability(seat)) {
      setSelectedSeats((prevSelectedSeats) => {
        if (prevSelectedSeats.includes(seat)) {
          return prevSelectedSeats.filter((s) => s !== seat);
        } else {
          return [...prevSelectedSeats, seat];
        }
      });
    

      // Update seatDetails to reflect the booking of the selected seat
      // const updatedSeatDetails = [...seatDetails];
      // const bookingDetails = {
      //   from,
      //   to,
      //   selectedSeats: [seat.toString()],
      //   bookingDate: date,
      // };
      // updatedSeatDetails.push(bookingDetails);
      // setSeatDetails(updatedSeatDetails);
    } else {
      alert('This seat is already booked for the selected journey.');
    }
  };

  const cartSubtotal = selectedSeats.length * fare || 0;

  const handleBooking = () => {
    const bookingDetails = {
      selectedSeats,
      bus,
      numPassengers,
      from,
      to,
      fare,
      bookingDate: date,
    };
    navigate('/billing', { state: { bookingDetails } });
  };

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container alert alert-danger">{error}</div>;
  }

  if (!bus) {
    return <div>No bus details available</div>;
  }

  // Calculate seats per upper and lower berth rows
  const upperHalfCapacity = Math.ceil(bus.capacity / 2);
  const lowerHalfCapacity = bus.capacity - upperHalfCapacity;
  const upperBerthRows = 3; // Number of rows for upper berth
  const lowerBerthRows = 3; // Number of rows for lower berth

  const seatsPerUpperRow = Math.ceil(upperHalfCapacity / upperBerthRows);
  const seatsPerLowerRow = Math.ceil(lowerHalfCapacity / lowerBerthRows);

  return (
    <div className="container" style={{ backgroundColor: 'white', color: '#333', padding: '20px', borderRadius: '10px' }}>
      <div className="row">
        <div className="col-md-6">
          {/* Seat Selection Section */}
          <div className="mb-4 mt-4" style={{ border: '1px solid #ca5252', padding: '20px', borderRadius: '10px', backgroundColor: 'white' }}>
            <h5 style={{ textAlign: 'center', color: '#ca5252', fontWeight: 'bold' }}>Select Seats</h5>
            {/* Lower Berth Seats */}
            <div className="mb-3">
              <h6 style={{ color: 'black', fontWeight: 'bold' }}>Upper Berth</h6>
              <div className="seat-selection">
                {[...Array(upperBerthRows)].map((row, rowIndex) => (
                  <div key={rowIndex} className="mb-2">
                    {[...Array(seatsPerUpperRow)].map((seat, seatIndex) => {
                      const seatNumber = rowIndex * seatsPerUpperRow + seatIndex + 1;
                      return (
                        <button
                          key={seatNumber}
                          className={`btn m-1 ${
                            !checkSeatAvailability(seatNumber)
                              ? 'btn-danger'
                              : selectedSeats.includes(seatNumber)
                              ? 'btn-success'
                              : 'btn-outline-primary'
                          }`}
                          style={{ borderColor: '#ca5252', color: '#ca5252', position: 'relative' }}
                          disabled={!checkSeatAvailability(seatNumber)}
                          onClick={() => handleSeatSelection(seatNumber)}
                        >
                          UP{seatNumber}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            {/* Upper Berth Seats */}
            <div className="mb-3">
              <h6 style={{ color: 'black', fontWeight: 'bold' }}>Lower Berth</h6>
              <div className="seat-selection">
                {[...Array(lowerBerthRows)].map((row, rowIndex) => (
                  <div key={rowIndex} className="mb-2">
                    {[...Array(seatsPerLowerRow)].map((seat, seatIndex) => {
                      const seatNumber = rowIndex * seatsPerLowerRow + seatIndex + 1 + lowerHalfCapacity;
                      return (
                        <button
                          key={seatNumber}
                          className={`btn m-1 ${
                            !checkSeatAvailability(seatNumber)
                              ? 'btn-danger'
                              : selectedSeats.includes(seatNumber)
                              ? 'btn-success'
                              : 'btn-outline-primary'
                          }`}
                          style={{ borderColor: '#ca5252', color: '#ca5252', position: 'relative' }}
                          disabled={!checkSeatAvailability(seatNumber)}
                          onClick={() => handleSeatSelection(seatNumber)}
                        >
                          LW{seatNumber}
                          {/* {seatIndex === 0 && ( // Display driver icon for the first seat in each row
                            // <FontAwesomeIcon
                            //   icon={faUser} // Replace with appropriate driver icon from FontAwesome
                            //   style={{
                            //     position: 'absolute', // Adjust position relative to button
                            //     bottom: '5px', // Adjust as needed for vertical alignment
                            //     right: '5px', // Adjust as needed for horizontal alignment
                            //     color: 'white',
                            //     fontSize: '20px', // Adjust size as needed
                            //   }}
                            // />
                          )} */}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          {/* Selected Seats Summary */}
          {selectedSeats.length > 0 && (
            <div className="card mb-4" style={{ border: '1px solid #ca5252', padding: '20px', borderRadius: '10px', backgroundColor: 'white' }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#ca5252', fontWeight: 'bold' }}>Selected Seats</h5>
                <ul className="list-group list-group-flush">
                  {selectedSeats.map((seat) => (
                    <li key={seat} className="list-group-item d-flex justify-content-between align-items-center">
                      Seat {seat}
                      <span className="badge badge-primary badge-pill">1</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <h5 style={{color:'#ca5252',fontWeight:'bold'}}>Total: {cartSubtotal} INR</h5>
                </div>
              </div>
            </div>
          )}

          {/* From and To Details Section */}
          <div style={{ border: '1px solid white', padding: '20px', borderRadius: '10px', backgroundColor: '#f8f9fa' }}>
            <div style={{ marginBottom: '10px' }}>
              <h5 style={{ color: '#ca5252', textAlign:'center',fontWeight:'bold',fontSize:'29px' }}>Journey details</h5>
              <h5 style={{ color: 'grey', fontWeight: 'bold' ,textAlign:'center'}}> {from}({bus.Route?.departure})
              --------------------- {to}({bus.Route?.arrival})</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center" style={{color:'#ca5252'}}>
                Fare details
                <span>{fare} INR</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center"style={{color:'#ca5252'}}>
                Available Seats
                <span>{bus.capacity - numPassengers}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center"style={{color:'#ca5252'}}>
                No of Passengers
                <span>{numPassengers} </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center"style={{color:'#ca5252'}}>
                Bus Type
                <span>{bus.busType} </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center"style={{color:'#ca5252'}}>
                Departure date
                <span>{new Date(date).toLocaleDateString()}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Booking Button */}
      <div className="row mt-4">
        <div className="col-md-6 offset-md-3">
          <button
            className="btn btn-lg btn-block btn-primary"
            onClick={handleBooking}
            disabled={selectedSeats.length === 0}
            style={{ backgroundColor: '#ca5252', borderColor: '#ca5252' }}
          >
            Book Seats
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;

