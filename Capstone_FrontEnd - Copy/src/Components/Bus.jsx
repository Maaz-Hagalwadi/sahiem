
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faRupeeSign, faBus } from '@fortawesome/free-solid-svg-icons';

// import '../Bus.css'; // Custom CSS for additional styling

const API_URL = 'http://localhost:3000'; 

const Bus = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noBusesFound, setNoBusesFound] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const navigate = useNavigate();

  const fetchAllBuses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/bus`);
      setBuses(response.data);
    } catch (error) {
      setError('Error fetching bus data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBuses();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setNoBusesFound(false);
    setIsSearchPerformed(true);

    try {
      const response = await axios.get(`${API_URL}/bus`, {
        params: { from: pickup, to: dropoff, date }
      });

      if (response.data.length === 0) {
        setNoBusesFound(true);
      } else {
        const busesWithFare = response.data.map(bus => ({
          ...bus,
          fare: bus.totalFare // Use totalFare from backend response
        }));
        setBuses(busesWithFare);
      }
    } catch (error) {
      setError('Error fetching bus data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookNow = (bus) => {
    navigate('/bus-details', {
      state: {
        busId: bus.busId,
        from: isSearchPerformed ? pickup : bus.Route.from,
        to: isSearchPerformed ? dropoff : bus.Route.to,
        fare: bus.fare,
        date: isSearchPerformed ? date : getCurrentDate()
      }
    });
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const toggleRoutesDisplay = (busId) => {
    const updatedBuses = buses.map(bus => {
      if (bus.busId === busId) {
        return {
          ...bus,
          showRoutes: !bus.showRoutes
        };
      }
      return bus;
    });
    setBuses(updatedBuses);
  };

  return (
    // <div className="container" style={{ marginTop: '20px' }}>
    <div className="container d-flex flex-column align-items-center" style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
      {/* <section className="search-section border rounded p-4" style={{ backgroundColor: '#ca5252', color: 'white', marginBottom: '20px' }}> */}
      <section className="search-section" style={{ backgroundColor: '#ca5252',color:'white', borderRadius: '10px', padding: '20px', width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
        <div className=" row justify-content-center mb-4" >
          {/* <div className="col-md-4 mb-3">
            <label htmlFor="pickup" className="form-label">From</label>
            <input
              type="text"
              id="pickup"
              className="form-control"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pickup location"
            />
          </div> */}
          <div className="col-md-12">
            <label htmlFor="pickup" className="form-label" style={{ color: 'white', fontWeight:'bold' }}><FontAwesomeIcon icon={faMapMarkerAlt} /> From</label>
            <input
              type="text"
              id="pickup"
              className="form-control"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pickup location"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', borderRadius: '5px', border: '1px solid #ccc', padding: '10px' }}
            />
          </div>
          {/* <div className="col-md-4 mb-3">
            <label htmlFor="dropoff" className="form-label"> To</label>
            <input
              type="text"
              id="dropoff"
              className="form-control"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Enter drop off location"
            />
          </div> */}
          <div className="col-md-12 mt-3">
            <label htmlFor="dropoff" className="form-label"style={{ color: 'white', fontWeight:'bold' }} ><FontAwesomeIcon icon={faMapMarkerAlt} /> To</label>
            <input
              type="text"
              id="dropoff"
              className="form-control"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Enter drop off location"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', borderRadius: '5px', border: '1px solid #ccc', padding: '10px' }}
            />
          </div>
          {/* <div className="col-md-4 mb-3">
            <label htmlFor="datepicker" className="form-label">Date</label>
            <input
              type="date"
              id="datepicker"
              className="form-control"
              value={date}
              min={getCurrentDate()}
              onChange={(e) => setDate(e.target.value)}
            />
          </div> */}
          <div className="col-md-12 mt-3">
            <label htmlFor="datepicker" className="form-label"style={{ color: 'white', fontWeight:'bold' }}><FontAwesomeIcon icon={ faCalendarAlt} /> Select Date</label>
            <input
              type="date"
              id="datepicker"
              className="form-control"
              value={date}
              min={getCurrentDate()}
              onChange={(e) => setDate(e.target.value)}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', borderRadius: '5px', border: '1px solid #ccc', padding: '10px' }}
            />
          </div>
          {/* <div className="col-md-12 text-center">
            <button
              type="button"
              onClick={handleSearch}
              disabled={isLoading}
              className="btn btn-primary"
              style={{ backgroundColor: '#1f2e2e' }}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div> */}
          <div className="col-md-12 mt-3">
            <button
              type="button"
              onClick={handleSearch}
              disabled={isLoading}
              className="btn btn-primary btn-block"
              style={{ backgroundColor: '#1f2e2e', color: '#fff', borderRadius: '5px', padding: '10px', fontWeight: 'bold', border: 'none' }}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </section>

  <hr />

      {/* <section className="results-section">
        {error && <div className="alert alert-danger" style={{ fontSize: '1rem', color: 'red', backgroundColor: '#ffcccc', border: 'none', borderRadius: '5px', padding: '10px' }}>{error}</div>}

        {noBusesFound && <div className="alert alert-warning" style={{ fontSize: '1rem', color: 'red' }}>No buses available for the selected criteria.</div>}

        {buses.length > 0 && (
          <div className="row">
            {buses.map(bus => (
              <div key={bus.busId} className="col-md-12 mb-2">
                <div className="card h-100 d-flex flex-column" style={{ color: 'black', padding: '10px' }}>
                  <div className="card-body p-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="d-flex justify-content-between mb-1">
                      <h6 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{bus.busName}</h6>
                      <small className="card-subtitle mb-2 text-muted">{bus.busNumber}</small>
                    </div> */}

 <section className="results-section" style={{ width: '100%', maxWidth: '800px' }}>
        {error && <div className="alert alert-danger">{error}</div>}

       {noBusesFound && <div className="alert alert-warning">No buses available for the selected criteria.</div>}

       {buses.length > 0 && (
          <div className="row justify-content-center">
            {buses.map(bus => (
              <div key={bus.busId} className="col-md-12 mb-4">
                <div className="card h-100 d-flex flex-column" style={{ backgroundColor: '#fff', border: '1px solid #ca5252', borderRadius: '10px', padding: '25px' }}>
                  <div className="card-body" >
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="card-title" style={{ color: 'black',fontWeight:'bold' }}>{bus.busName}</h5>
                      <h6 className="card-subtitle mb-2 text-muted" style={{ color: 'black',fontWeight:'bold' }}>{bus.busNumber}</h6>
                    </div>
{/* //from here */}
                   <div className="d-flex justify-content-between mb-1" >
                      <div className="card-text" style={{ fontSize: '0.9rem' }}>
                        {isSearchPerformed ? (
                          <div> {pickup} - {dropoff}</div>
                        ) : (
                          <div> {bus.Route.from} - {bus.Route.to}</div>
                        )}
                        <div> {bus.busType}</div>
                      </div>
                      <div><small className="text-muted"> {bus.Route?.departure}----</small>
                      <small className="text-muted"> {bus.Route?.arrival}</small></div>
                      <div className="card-text" style={{ fontSize: '0.9rem' }}>
                        <small className="text-muted">Departure: {bus.Route?.departure}</small><br />
                        <small className="text-muted">Arrival: {bus.Route?.arrival}</small>
                      </div>
                   </div>

                    <div className="d-flex justify-content-between">
                       <p className="card-text" style={{ fontSize: '0.9rem' }}>Fare: Rs {bus.fare}</p>
                       <p className="card-text" style={{ fontSize: '0.9rem' }}>Capacity: {bus.capacity}</p>
                       <div>
                         {bus.Route && bus.Route.busRoute && (
                          <button
                            className="btn btn-link text-decoration-none"
                            onClick={() => toggleRoutesDisplay(bus.busId)}
                            style={{ fontWeight: 'bold', cursor: 'pointer', color: '#1f2e2e', padding: '0' }}
                          >
                            {bus.showRoutes ? 'Hide Routes' : 'Show Routes'}
                          </button>
                        )}
                        {bus.showRoutes && (
                          <div className="mt-1">
                            <ul className="list-group list-group-flush">
                              {bus.Route.busRoute.map((route, index) => (
                                <li key={index} className="list-group-item p-1">{route}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                       <button className="btn btn-primary btn-sm" style={{ backgroundColor: '#1f2e2e' }} onClick={() => handleBookNow(bus)}>Book Now</button>
                     </div>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && buses.length === 0 && (
          <div className="row">
            <div className="col">
              <p className="text-center">No buses available.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Bus;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import 'leaflet/dist/leaflet.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarkerAlt, faCalendarAlt, faRupeeSign, faBus } from '@fortawesome/free-solid-svg-icons';

// // import '../Bus.css'; // Custom CSS for additional styling

// const API_URL = 'http://localhost:3000'; // Adjust this URL to match your backend URL

// const Bus = () => {
//   const [pickup, setPickup] = useState('');
//   const [dropoff, setDropoff] = useState('');
//   const [date, setDate] = useState('');
//   const [buses, setBuses] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [noBusesFound, setNoBusesFound] = useState(false);
//   const [isSearchPerformed, setIsSearchPerformed] = useState(false);

//   const navigate = useNavigate();

//   const fetchAllBuses = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`${API_URL}/bus`);
//       setBuses(response.data);
//     } catch (error) {
//       setError('Error fetching bus data. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllBuses();
//   }, []);

//   const handleSearch = async () => {
//     setIsLoading(true);
//     setError(null);
//     setNoBusesFound(false);
//     setIsSearchPerformed(true);

//     try {
//       const response = await axios.get(`${API_URL}/bus`, {
//         params: { from: pickup, to: dropoff, date }
//       });

//       if (response.data.length === 0) {
//         setNoBusesFound(true);
//       } else {
//         const busesWithFare = response.data.map(bus => ({
//           ...bus,
//           fare: bus.totalFare // Use totalFare from backend response
//         }));
//         setBuses(busesWithFare);
//       }
//     } catch (error) {
//       setError('Error fetching bus data. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleBookNow = (bus) => {
//     navigate('/bus-details', {
//       state: {
//         busId: bus.busId,
//         from: isSearchPerformed ? pickup : bus.Route.from,
//         to: isSearchPerformed ? dropoff : bus.Route.to,
//         fare: bus.fare,
//         date: isSearchPerformed ? date : getCurrentDate()
//       }
//     });
//   };

//   const getCurrentDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const toggleRoutesDisplay = (busId) => {
//     const updatedBuses = buses.map(bus => {
//       if (bus.busId === busId) {
//         return {
//           ...bus,
//           showRoutes: !bus.showRoutes
//         };
//       }
//       return bus;
//     });
//     setBuses(updatedBuses);
//   };

//   return (
//     <div className="container d-flex flex-column align-items-center" style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
//       <section className="search-section" style={{ backgroundColor: '#ca5252',color:'white', borderRadius: '10px', padding: '20px', width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
//         <div className="row justify-content-center mb-4">
//           <div className="col-md-12">
//             <label htmlFor="pickup" className="form-label" style={{ color: 'white', fontWeight:'bold' }}>
//               <FontAwesomeIcon icon={faMapMarkerAlt} /> From
//             </label>
//             <input
//               type="text"
//               id="pickup"
//               className="form-control"
//               value={pickup}
//               onChange={(e) => setPickup(e.target.value)}
//               placeholder="Enter pickup location"
//               style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', borderRadius: '5px', border: '1px solid #ccc', padding: '10px' }}
//             />
//           </div>
//           <div className="col-md-12 mt-3">
//             <label htmlFor="dropoff" className="form-label" style={{ color: 'white', fontWeight:'bold' }}>
//               <FontAwesomeIcon icon={faMapMarkerAlt} /> To
//             </label>
//             <input
//               type="text"
//               id="dropoff"
//               className="form-control"
//               value={dropoff}
//               onChange={(e) => setDropoff(e.target.value)}
//               placeholder="Enter drop off location"
//               style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', borderRadius: '5px', border: '1px solid #ccc', padding: '10px' }}
//             />
//           </div>
//           <div className="col-md-12 mt-3">
//             <label htmlFor="datepicker" className="form-label" style={{ color: 'white', fontWeight:'bold' }}>
//               <FontAwesomeIcon icon={ faCalendarAlt} /> Select Date
//             </label>
//             <input
//               type="date"
//               id="datepicker"
//               className="form-control"
//               value={date}
//               min={getCurrentDate()}
//               onChange={(e) => setDate(e.target.value)}
//               style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', borderRadius: '5px', border: '1px solid #ccc', padding: '10px' }}
//             />
//           </div>
//           <div className="col-md-12 mt-3 d-flex justify-content-center">
//             <button
//               type="button"
//               onClick={handleSearch}
//               disabled={isLoading}
//               className="btn btn-primary btn-block"
//               style={{ backgroundColor: '#1f2e2e', color: '#fff', borderRadius: '5px', padding: '10px', fontWeight: 'bold', border: 'none' }}
//             >
//               {isLoading ? 'Searching...' : 'Search'}
//             </button>
//           </div>
//         </div>
//       </section>

//       {error && <div className="alert alert-danger" style={{ fontSize: '1rem', color: 'red', backgroundColor: '#ffcccc', border: 'none', borderRadius: '5px', padding: '10px' }}>{error}</div>}

//       {noBusesFound && <div className="alert alert-warning" style={{ fontSize: '1rem', color: 'red' }}>No buses available for the selected criteria.</div>}

//       {buses.length > 0 && (
//         <div className="row justify-content-center">
//           {buses.map(bus => (
//             <div key={bus.busId} className="col-md-12 mb-4">
//               <div className="card h-100 d-flex flex-column" style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '10px', padding: '25px' }}>
//                 <div className="card-body">
//                   <div className="d-flex justify-content-between mb-3">
//                     <h5 className="card-title" style={{ color: '#1f2e2e' }}>{bus.busName}</h5>
//                     <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
//                   </div>
//                   <div className="d-flex justify-content-between mb-1">
//                     <div className="card-text" style={{ fontSize: '0.9rem' }}>
//                       {isSearchPerformed ? (
//                         <div><FontAwesomeIcon icon={faMapMarkerAlt} /> {pickup} - {dropoff}</div>
//                       ) : (
//                         <div><FontAwesomeIcon icon={faMapMarkerAlt} /> {bus.Route.from} - {bus.Route.to}</div>
//                       )}
//                       <div><FontAwesomeIcon icon={faBus} /> {bus.busType}</div>
//                     </div>
//                     <div className="card-text" style={{ fontSize: '0.9rem' }}>
//                       <small className="text-muted"><FontAwesomeIcon icon={faCalendarAlt} /> Departure: {bus.Route?.departure}</small><br />
//                       <small className="text-muted"><FontAwesomeIcon icon={faCalendarAlt} /> Arrival: {bus.Route?.arrival}</small>
//                     </div>
//                   </div>

//                   <div className="d-flex justify-content-between">
//                     <p className="card-text" style={{ fontSize: '0.9rem' }}>Fare: Rs {bus.fare}</p>
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => handleBookNow(bus)}
//                       style={{ backgroundColor: '#1f2e2e', color: '#fff', borderRadius: '5px', padding: '10px', fontWeight: 'bold', border: 'none' }}
//                     >
//                       Book Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bus;


// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import axios from 'axios';
// // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // import 'leaflet/dist/leaflet.css';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faMapMarkerAlt, faCalendarAlt, faRupeeSign, faBus } from '@fortawesome/free-solid-svg-icons';

// // // const API_URL = 'http://localhost:3000'; // Adjust this URL to match your backend URL

// // // const Bus = () => {
// // //   const [pickup, setPickup] = useState('');
// // //   const [dropoff, setDropoff] = useState('');
// // //   const [date, setDate] = useState('');
// // //   const [buses, setBuses] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [noBusesFound, setNoBusesFound] = useState(false);
// // //   const [isSearchPerformed, setIsSearchPerformed] = useState(false);

// // //   const navigate = useNavigate();

// // //   const fetchAllBuses = async () => {
// // //     setIsLoading(true);
// // //     setError(null);

// // //     try {
// // //       const response = await axios.get(`${API_URL}/bus`);
// // //       setBuses(response.data);
// // //     } catch (error) {
// // //       setError('Error fetching bus data. Please try again.');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchAllBuses();
// // //   }, []);

// // //   const handleSearch = async () => {
// // //     setIsLoading(true);
// // //     setError(null);
// // //     setNoBusesFound(false);
// // //     setIsSearchPerformed(true);

// // //     try {
// // //       const response = await axios.get(`${API_URL}/bus`, {
// // //         params: { from: pickup, to: dropoff, date }
// // //       });

// // //       if (response.data.length === 0) {
// // //         setNoBusesFound(true);
// // //       } else {
// // //         const busesWithFare = response.data.map(bus => ({
// // //           ...bus,
// // //           fare: bus.totalFare // Use totalFare from backend response
// // //         }));
// // //         setBuses(busesWithFare);
// // //       }
// // //     } catch (error) {
// // //       setError('Error fetching bus data. Please try again.');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const handleBookNow = (bus) => {
// // //     navigate('/bus-details', {
// // //       state: {
// // //         busId: bus.busId,
// // //         from: isSearchPerformed ? pickup : bus.Route.from,
// // //         to: isSearchPerformed ? dropoff : bus.Route.to,
// // //         fare: bus.fare,
// // //         date: isSearchPerformed ? date : getCurrentDate()
// // //       }
// // //     });
// // //   };

// // //   const getCurrentDate = () => {
// // //     const today = new Date();
// // //     const year = today.getFullYear();
// // //     const month = String(today.getMonth() + 1).padStart(2, '0');
// // //     const day = String(today.getDate()).padStart(2, '0');
// // //     return `${year}-${month}-${day}`;
// // //   };

// // //   const toggleRoutesDisplay = (busId) => {
// // //     const updatedBuses = buses.map(bus => {
// // //       if (bus.busId === busId) {
// // //         return {
// // //           ...bus,
// // //           showRoutes: !bus.showRoutes
// // //         };
// // //       }
// // //       return bus;
// // //     });
// // //     setBuses(updatedBuses);
// // //   };

// // //   return (
// // //     <div className="container d-flex flex-column align-items-center" style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
// // //       <section className="search-section" style={{ backgroundColor: '#ca5252', color: 'white', borderRadius: '10px', padding: '20px', width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
// // //         <div className="row justify-content-center mb-4">
// // //           <div className="col-md-12">
// // //             <label htmlFor="pickup" className="form-label" style={{ color: 'white', fontWeight: 'bold' }}><FontAwesomeIcon icon={faMapMarkerAlt} /> From</label>
// // //             <input
// // //               type="text"
// // //               id="pickup"
// // //               className="form-control"
// // //               value={pickup}
// // //               onChange={(e) => setPickup(e.target.value)}
// // //               placeholder="Enter pickup location"
// // //               style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', borderRadius: '5px', border: '1px solid #ccc', padding: '10px' }}
// // //             />
// // //           </div>
// // //           <div className="col-md-12 mt-3">
// // //             <label htmlFor="dropoff" className="form-label" style={{ color: 'white', fontWeight: 'bold' }}><FontAwesomeIcon icon={faMapMarkerAlt} /> To</label>
// // //             <input
// // //               type="text"
// // //               id="dropoff"
// // //               className="form-control"
// // //               value={dropoff}
// // //               onChange={(e) => setDropoff(e.target.value)}
// // //               placeholder="Enter drop off location"
// // //               style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', borderRadius: '5px', border: '1px solid #ccc', padding: '10px' }}
// // //             />
// // //           </div>
// // //           <div className="col-md-12 mt-3">
// // //             <label htmlFor="datepicker" className="form-label" style={{ color: 'white', fontWeight: 'bold' }}><FontAwesomeIcon icon={faCalendarAlt} /> Select Date</label>
// // //             <input
// // //               type="date"
// // //               id="datepicker"
// // //               className="form-control"
// // //               value={date}
// // //               min={getCurrentDate()}
// // //               onChange={(e) => setDate(e.target.value)}
// // //               style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', borderRadius: '5px', border: '1px solid #ccc', padding: '10px' }}
// // //             />
// // //           </div>
// // //           <div className="col-md-12 text-center mt-3">
// // //             <button
// // //               type="button"
// // //               onClick={handleSearch}
// // //               disabled={isLoading}
// // //               className="btn btn-primary"
// // //               style={{ backgroundColor: '#1f2e2e', color: '#fff', borderRadius: '5px', padding: '10px', fontWeight: 'bold', border: 'none' }}
// // //             >
// // //               {isLoading ? 'Searching...' : 'Search'}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       <hr />

// // //       <section className="results-section" style={{ width: '100%', maxWidth: '800px' }}>
// // //         {error && <div className="alert alert-danger">{error}</div>}

// // //         {noBusesFound && <div className="alert alert-warning">No buses available for the selected criteria.</div>}

// // //         {buses.length > 0 && (
// // //           <div className="row justify-content-center">
// // //             {buses.map(bus => (
// // //               <div key={bus.busId} className="col-md-12 mb-4">
// // //                 <div className="card h-100 d-flex flex-column" style={{ backgroundColor: '#fff', border: '2px solid red', borderRadius: '10px', padding: '25px' }}>
// // //                   <div className="card-body">
// // //                     <div className="d-flex justify-content-between mb-3">
// // //                       <h5 className="card-title" style={{ color: '#1f2e2e' }}>{bus.busName}</h5>
// // //                       <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
// // //                     </div>
// // //                     <div className="d-flex justify-content-between mb-1">
// // //                       <div className="card-text" style={{ fontSize: '0.9rem' }}>
// // //                         {isSearchPerformed ? (
// // //                           <div><FontAwesomeIcon icon={faMapMarkerAlt} /> {pickup} - {dropoff}</div>
// // //                         ) : (
// // //                           <div><FontAwesomeIcon icon={faMapMarkerAlt} /> {bus.Route.from} - {bus.Route.to}</div>
// // //                         )}
// // //                         <div><FontAwesomeIcon icon={faBus} /> {bus.busType}</div>
// // //                       </div>
// // //                       <div className="card-text" style={{ fontSize: '0.9rem' }}>
// // //                         <small className="text-muted"><FontAwesomeIcon icon={faCalendarAlt} /> Departure: {bus.Route?.departure}</small><br />
// // //                         <small className="text-muted"><FontAwesomeIcon icon={faCalendarAlt} /> Arrival: {bus.Route?.arrival}</small>
// // //                       </div>
// // //                     </div>
// // //                     <div className="d-flex justify-content-between align-items-center mt-3">
// // //                       <div className="card-text" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
// // //                         <FontAwesomeIcon icon={faRupeeSign} /> {bus.fare}
// // //                       </div>
// // //                       <button
// // //                         type="button"
// // //                         className="btn btn-primary"
// // //                         style={{ backgroundColor: '#1f2e2e', color: '#fff', borderRadius: '5px', padding: '10px', fontWeight: 'bold', border: 'none' }}
// // //                         onClick={() => handleBookNow(bus)}
// // //                       >
// // //                         Book Now
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                   <div className="card-footer text-center">
// // //                     <button
// // //                       type="button"
// // //                       className="btn btn-link"
// // //                       onClick={() => toggleRoutesDisplay(bus.busId)}
// // //                       style={{ textDecoration: 'none', fontWeight: 'bold', color: '#1f2e2e' }}
// // //                     >
// // //                       {bus.showRoutes ? 'Hide Routes' : 'Show Routes'}
// // //                     </button>
// // //                     {bus.showRoutes && (
// // //                       <div className="routes mt-3">
// // //                         <p>Route Information:</p>
// // //                         <ul className="list-group list-group-flush">
// // //                           {bus.Route.routeStops.map((stop, index) => (
// // //                             <li key={index} className="list-group-item">{stop}</li>
// // //                           ))}
// // //                         </ul>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </section>
// // //     </div>
// // //   );
// // // };

// // // export default Bus;
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import 'leaflet/dist/leaflet.css';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faMapMarkerAlt, faCalendarAlt, faRupeeSign, faBus } from '@fortawesome/free-solid-svg-icons';

// // const API_URL = 'http://localhost:3000'; // Adjust this URL to match your backend URL

// // const Bus = () => {
// //   const [pickup, setPickup] = useState('');
// //   const [dropoff, setDropoff] = useState('');
// //   const [date, setDate] = useState('');
// //   const [buses, setBuses] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [noBusesFound, setNoBusesFound] = useState(false);
// //   const [isSearchPerformed, setIsSearchPerformed] = useState(false);

// //   const navigate = useNavigate();

// //   const fetchAllBuses = async () => {
// //     setIsLoading(true);
// //     setError(null);

// //     try {
// //       const response = await axios.get(`${API_URL}/bus`);
// //       setBuses(response.data);
// //     } catch (error) {
// //       setError('Error fetching bus data. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAllBuses();
// //   }, []);

// //   const handleSearch = async () => {
// //     setIsLoading(true);
// //     setError(null);
// //     setNoBusesFound(false);
// //     setIsSearchPerformed(true);

// //     try {
// //       const response = await axios.get(`${API_URL}/bus`, {
// //         params: { from: pickup, to: dropoff, date }
// //       });

// //       if (response.data.length === 0) {
// //         setNoBusesFound(true);
// //       } else {
// //         const busesWithFare = response.data.map(bus => ({
// //           ...bus,
// //           fare: bus.totalFare, // Use totalFare from backend response
// //           showRoutes: false // Initialize showRoutes for each bus
// //         }));
// //         setBuses(busesWithFare);
// //       }
// //     } catch (error) {
// //       setError('Error fetching bus data. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleBookNow = (bus) => {
// //     navigate('/bus-details', {
// //       state: {
// //         busId: bus.busId,
// //         from: isSearchPerformed ? pickup : bus.Route.from,
// //         to: isSearchPerformed ? dropoff : bus.Route.to,
// //         fare: bus.fare,
// //         date: isSearchPerformed ? date : getCurrentDate()
// //       }
// //     });
// //   };

// //   const getCurrentDate = () => {
// //     const today = new Date();
// //     const year = today.getFullYear();
// //     const month = String(today.getMonth() + 1).padStart(2, '0');
// //     const day = String(today.getDate()).padStart(2, '0');
// //     return `${year}-${month}-${day}`;
// //   };

// //   const toggleRoutesDisplay = (busId) => {
// //     setBuses(prevBuses =>
// //       prevBuses.map(bus =>
// //         bus.busId === busId ? { ...bus, showRoutes: !bus.showRoutes } : bus
// //       )
// //     );
// //   };

// //   return (
// //     <div className="container d-flex flex-column align-items-center" style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
// //       <section className="search-section" style={{ backgroundColor: '#ca5252', color: 'white', borderRadius: '10px', padding: '20px', width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
// //         <div className="row justify-content-center mb-4">
// //           <div className="col-md-12">
// //             <label htmlFor="pickup" className="form-label" style={{ color: 'white', fontWeight: 'bold' }}><FontAwesomeIcon icon={faMapMarkerAlt} /> From</label>
// //             <input
// //               type="text"
// //               id="pickup"
// //               className="form-control"
// //               value={pickup}
// //               onChange={(e) => setPickup(e.target.value)}
// //               placeholder="Enter pickup location"
// //               style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', borderRadius: '5px', border: '1px solid #ccc', padding: '10px' }}
// //             />
// //           </div>
// //           <div className="col-md-12 mt-3">
// //             <label htmlFor="dropoff" className="form-label" style={{ color: 'white', fontWeight: 'bold' }}><FontAwesomeIcon icon={faMapMarkerAlt} /> To</label>
// //             <input
// //               type="text"
// //               id="dropoff"
// //               className="form-control"
// //               value={dropoff}
// //               onChange={(e) => setDropoff(e.target.value)}
// //               placeholder="Enter drop off location"
// //               style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', borderRadius: '5px', border: '1px solid #ccc', padding: '10px' }}
// //             />
// //           </div>
// //           <div className="col-md-12 mt-3">
// //             <label htmlFor="datepicker" className="form-label" style={{ color: 'white', fontWeight: 'bold' }}><FontAwesomeIcon icon={faCalendarAlt} /> Select Date</label>
// //             <input
// //               type="date"
// //               id="datepicker"
// //               className="form-control"
// //               value={date}
// //               min={getCurrentDate()}
// //               onChange={(e) => setDate(e.target.value)}
// //               style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', borderRadius: '5px', border: '1px solid #ccc', padding: '10px' }}
// //             />
// //           </div>
// //           <div className="col-md-12 text-center mt-3">
// //             <button
// //               type="button"
// //               onClick={handleSearch}
// //               disabled={isLoading}
// //               className="btn btn-primary"
// //               style={{ backgroundColor: '#1f2e2e', color: '#fff', borderRadius: '5px', padding: '10px', fontWeight: 'bold', border: 'none' }}
// //             >
// //               {isLoading ? 'Searching...' : 'Search'}
// //             </button>
// //           </div>
// //         </div>
// //       </section>

// //       <hr />

// //       <section className="results-section" style={{ width: '100%', maxWidth: '800px' }}>
// //         {error && <div className="alert alert-danger">{error}</div>}

// //         {noBusesFound && <div className="alert alert-warning">No buses available for the selected criteria.</div>}

// //         {buses.length > 0 && (
// //           <div className="row justify-content-center">
// //             {buses.map(bus => (
// //               <div key={bus.busId} className="col-md-12 mb-4">
// //                 <div className="card h-100 d-flex flex-column" style={{ backgroundColor: '#fff', border: '2px solid red', borderRadius: '10px', padding: '25px' }}>
// //                   <div className="card-body">
// //                     <div className="d-flex justify-content-between mb-3">
// //                       <h5 className="card-title" style={{ color: '#1f2e2e' }}>{bus.busName}</h5>
// //                       <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
// //                     </div>
// //                     <div className="d-flex justify-content-between mb-1">
// //                       <div className="card-text" style={{ fontSize: '0.9rem' }}>
// //                         {isSearchPerformed ? (
// //                           <div><FontAwesomeIcon icon={faMapMarkerAlt} /> {pickup} - {dropoff}</div>
// //                         ) : (
// //                           <div><FontAwesomeIcon icon={faMapMarkerAlt} /> {bus.Route.from} - {bus.Route.to}</div>
// //                         )}
// //                         <div><FontAwesomeIcon icon={faBus} /> {bus.busType}</div>
// //                       </div>
// //                       <div className="card-text" style={{ fontSize: '0.9rem' }}>
// //                         <small className="text-muted"><FontAwesomeIcon icon={faCalendarAlt} /> Departure: {bus.Route?.departure}</small><br />
// //                         <small className="text-muted"><FontAwesomeIcon icon={faCalendarAlt} /> Arrival: {bus.Route?.arrival}</small>
// //                       </div>
// //                     </div>
// //                     <div className="d-flex justify-content-between align-items-center mt-3">
// //                       <div className="card-text" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
// //                         <FontAwesomeIcon icon={faRupeeSign} /> {bus.fare}
// //                       </div>
// //                       <button
// //                         type="button"
// //                         className="btn btn-primary"
// //                         style={{ backgroundColor: '#1f2e2e', color: '#fff', borderRadius: '5px', padding: '10px', fontWeight: 'bold', border: 'none' }}
// //                         onClick={() => handleBookNow(bus)}
// //                       >
// //                         Book Now
// //                       </button>
// //                     </div>
// //                   </div>
// //                   <div className="card-footer text-center">
// //                     <button
// //                       type="button"
// //                       className="btn btn-link"
// //                       onClick={() => toggleRoutesDisplay(bus.busId)}
// //                       style={{ textDecoration: 'none', fontWeight: 'bold', color: '#1f2e2e' }}
// //                     >
// //                       {bus.showRoutes ? 'Hide Routes' : 'Show Routes'}
// //                     </button>
// //                     {bus.showRoutes && (
// //                       <div className="routes mt-3">
// //                         <p>Route Information:</p>
// //                         <ul className="list-group list-group-flush">
// //                           {bus.Route.routeStops.map((stop, index) => (
// //                             <li key={index} className="list-group-item">{stop}</li>
// //                           ))}
// //                         </ul>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </section>
// //     </div>
// //   );
// // };

// // export default Bus;
