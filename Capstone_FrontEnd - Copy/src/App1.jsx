// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import BusSearch from './Components/BusSearch';
// import BusDetails from './Components/BusDetails';

// const App1 = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<BusSearch />} />
//         <Route path="/bus-details" element={<BusDetails />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App1;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bus from './Components/Bus';
import Info from './Components/Info';
import Payment from './Components/Payment';

const App1 = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Bus />} />
        <Route path="/bus-details" element={<Info />} />
        <Route path="/billing" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App1;
