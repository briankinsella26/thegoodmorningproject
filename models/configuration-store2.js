"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");
var axios = require('axios');

var config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-mtybs/endpoint/data/beta/action/findOne',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'kvErM5pzFQaISsF733UpenYeDTT7bWrJ85mAxhz956wb91U5igFxsJoDEDpyW6NJ'
    },
    data : data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });

const configurationStore = {

    addConfiguration(configuration) {
        var data = JSON.stringify({
            "collection": "configurations",
            "database": "themorningprojectdb",
            "dataSource": "Cluster0",
            configuration

        })
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    } 
}
module.exports = configurationStore;