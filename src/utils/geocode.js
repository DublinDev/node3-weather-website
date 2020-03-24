const request = require('request');


const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1Ijoic2VhbmYxMjM0NTYiLCJhIjoiY2s4MjVxaTc3MDN4MDNncXQybndqenlncyJ9.xzVmgaZ4xjrzN6xXGBFDyw';

    request(url, {}, (error, response) => {
        
        if (error) callback('Unabel to connect to geocode', undefined)
        else if (response.body.error) callback('Error in response body', undefined)
        else callback(undefined, JSON.parse(response.body).features[0].geometry.coordinates)
    })
};

module.exports = geocode;