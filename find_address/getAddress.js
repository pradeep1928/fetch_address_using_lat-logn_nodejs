const request = require('request');

const getAddress = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicHJhZGVlcDE5MTAiLCJhIjoiY2tvaWk3and2MDBhdzJubWx4Nmt6bWllOCJ9.gsay9c1r0Pj3mC0F5ivnYg`

    request({url, json:true}, (error, {body}) => {
        if (error) {
            cb('Unable to connect to location service.', undefined)
        } else if (body.features.length == 0) {
            cb("Unable to find the location.", undefined)
        } else {
            cb(undefined, {
                res: body,
                 longitute: body.features[0].center[0],
                 lattitude: body.features[0].center[1],
                 location: body.features[0].place_name
            })
        }
    })
}


module.exports = getAddress;