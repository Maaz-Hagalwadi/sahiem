// datetime.js

// Function to get the current date and time in ISO format
const getCurrentDateTime = () => {
    return new Date().toISOString();
  };
  
  // Function to get the date part from a given ISO formatted datetime string
  const getDateFromDateTIme = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    return dateObj.toISOString().split('T')[0];
  };
  
  // Function to get the day of the week from a given ISO formatted datetime string
  const getDayFromDate = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dateObj.getDay()];
  };
  
  // Function to get date and time from ISO formatted datetime string
  const getDateTimeFromDate = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    return dateObj.toISOString();
  };
  
  module.exports = {
    getCurrentDateTime,
    getDateFromDateTIme,
    getDayFromDate,
    getDateTimeFromDate,
  };
  