const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  // use request to fetch IP address from JSON API
  return request('https://api.ipify.org?format=json');
};

/* 
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://api.ipbase.com/json/?apikey=75fMf3SMmUsZMooqozkf0xoFHtpQ3UL5wUZfx032&${ip}`)
};


/*
 * Requests data from api.open-notify.org using provided lat/long data
 * Input: JSON body containing geo data response from freegeoip.app
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function(body) {
  const lat = JSON.parse(body).latitude;
  const lon = JSON.parse(body).longitude;
  return request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${lon}`);
}

/*
* Input: None
* Returns: Promise for fly over data for users location
*/
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};

module.exports = { nextISSTimesForMyLocation };