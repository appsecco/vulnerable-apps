'use strict'
const http = require('http');
const url = require('url');
const path = require('path');

const animalsJSON = path.join(__dirname, 'animals.json');
const animals = require(animalsJSON);

function requestHandler(req, res) {
    let urlParams = url.parse(req.url, true);
    let queryData = urlParams.query;
    res.writeHead(200, {"Content-Type": "application/json"});

    if (queryData.name) {
        let searchQuery = stringToRegexp(queryData.name);
        let animalsResult = getAnimals(searchQuery);
        res.end(JSON.stringify(animalsResult));
    } else {
        res.end();
    }
}

function getAnimals(query) {
    let result = [];

    for (let animal of animals) {
        if (query.test(animal.name))
            result.push(animal);
    }

    return result;
}

function stringToRegexp(input) {
    let output = input.replace(/[\[\]\\\^\$\.\|\?\+\(\)]/, "\\$&");
    let prefix, suffix;

    if (output[0] == '*') {
        prefix = '/';
        output = output.replace(/^\*+/g, '');
    } else {
        prefix = '/^';
    }

    if (output[output.length - 1] == '*') {
        suffix = '/i';
        output = output.replace(/\*+$/g, '');
    } else {
        suffix = '$/i';
    }
    output = output.replace(/[\*]/, '.*');

    return eval(prefix + output + suffix);
}

const server = http.createServer(requestHandler);
server.listen(3000);