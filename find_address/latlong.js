const opencage = require("opencage-api-client");

const latlong = (latlon, cb) => {
opencage
  .geocode({ q: latlon, language: "fr" })
  .then((data) => {
    // console.log(JSON.stringify(data));
    if (data.results.length > 0) {
      const place = data.results[0];
      cb(undefined, {
        res: place,
        formatted: place.formatted,
        postcode: place.components.postcode,
        timezone: place.annotations.timezone.name
      })
      console.log(place.formatted);
      console.log(place.components.postcode);
      console.log(place.annotations.timezone.name);
    } else {
      console.log("status", data.status.message);
      console.log("total_results", data.total_results);
    }
  })
  .catch((error) => {
    console.log("error", error.message);
  });
}


module.exports = latlong