'use strict';

const functions = require('firebase-functions');
const querystring = require('querystring');
const url = require('url');
const token = 'qwerty';

exports.fulfillment = functions.https.onRequest((request, response) => {
    const parsed = url.parse(request.url);
    request.url = parsed.pathname;
    request.query = querystring.parse(parsed.query);

    // check token in every request
    if (request.query.token !== token) {
       response.writeHead(401);
       return response.end();
    }

    if (request.method === 'GET') {
        return response.send(request.query.challenge);
    }

    const data = {
        responses: [
            {
                type: 'text',
                elements: ['This is a text response.']
            }
        ]
    };

    response.json(data);
});
