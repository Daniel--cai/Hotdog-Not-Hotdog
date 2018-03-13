'use strict';

var axios = require('axios');
var https = require('https');
var queryString = require('querystring');


const twilio = require('twilio')
var AWS = require("aws-sdk")

const stepFunctions = new AWS.StepFunctions();


module.exports = {
  send: (event, context, callback) => {
    var output = {
      message: "Thanks for calling",
      options: [
        "Call Ricky",
        "Join the conference line",
        "Get jiggy with it"
      ]
    }
    let message = "Thanks for calling";
    if (event.body) {
      const parsed = JSON.parse(event.body)
      message = parsed.message
    }
    const fromNumber
    sendSms(fromNumber, message, null)
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      }),
    };

    callback(null, response);

  },

  //received text from twilio!!
  receive: (event, context, callback) => {
    let message = "Receieved Webhook";
    // if (event.body) {
    //   const parsed = JSON.parse(event.body)
    //   message = parsed.message
    // }

    
    const xml = event.body

    console.log(event)

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: event.body,
        input: event,
      }),
    };

    console.log("sending message", message)

    var initState = {
      "Comment": message
    }

    // var params = {
    //   stateMachineArn: process.env.translateStep,
    //   input: JSON.stringify(initState)
    // };


    // stepFunctions.startExecution(params, function (err, data) {
    //   if (err) {
    //     console.log(err, err.stack);
    //     //callback(err, null)
    //   } else {
    //     console.log(data); // successful response });
    //     //callback(null, data)
    //   }
    // });

    callback(null, response)
  },
}

function sendAudio(to, body, completedCallback) {
  const twiml = {
    Twiml: `<Response>
              <Play>
                ${body}
              </Play>
            </Response>
           `
  };
  const url = "http://twimlets.com/echo?" + queryString.stringify(twiml);
  var message = {
    To: to,
    From: process.env.TWILIO_NUMBER,
    Url: url
  }

  var messageString = queryString.stringify(message);

  var options = {
    host: 'api.twilio.com',
    port: 443,
    path: '/2010-04-01/Accounts/' + process.env.TWILIO_ACCOUNT_SID + '/Calls.json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(messageString),
      'Authorization': 'Basic ' + new Buffer(process.env.TWILIO_ACCOUNT_SID + ':' + process.env.TWILIO_AUTH_TOKEN).toString('base64')
    }
  }

  var req = https.request(options, function (res) {

    res.setEncoding('utf-8');

    // Collect response data as it comes back.
    var responseString = '';
    res.on('data', function (data) {
      responseString += data;
    });

    // Log the responce received from Twilio.
    // Or could use JSON.parse(responseString) here to get at individual properties.
    res.on('end', function () {
      console.log('Twilio Response: ' + responseString);
      if (completedCallback)
        completedCallback('API request sent successfully.');
    });
  });
  req.on('error', function (e) {
    console.error('HTTP error: ' + e.message);
    if (completedCallback)
      completedCallback('API request completed with error(s).');
  });




  // Send the HTTP request to the Twilio API.
  // Log the message we are sending to Twilio.
  console.log('Twilio API call: ' + messageString);
  req.write(messageString);
  req.end();
}



