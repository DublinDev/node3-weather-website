const request = require('request');


const forecast = (latiude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3be278bb0e13d41d2872d0224a527c9d/' + latiude + ',' + longitude;

    request(url, {}, (error, response) => {
        if (error) callback('Unabel to connect to forecast',undefined)
        else if (response.body.error) callback('Error in response bodu',undefined)
        else callback(undefined, JSON.parse(response.body).currently.summary)
    })
};

module.exports = forecast;