console.log('starting function');

const qs = require('qs');
const VoiceReponse = require('twilio').twiml.VoiceResponse;

module.exports.handle = function (e, ctx, cb) {
    console.log('processing event: %j', e)
    var twiml = new VoiceReponse();

    var recordingstatuscallback = process.env.RECORDINGSTATUSURL || '/recordstatus';
    var messagemaxlength = 5;
    var body = {};
    if (e && e.reqbody) {
        body = qs.parse(e.reqbody);
    }

    switch (body.DialCallStatus) {
        case 'no-answer':
            twiml.say("Uhh hello? Say something");
            twiml.record({ maxLength: messagemaxlength, recordingStatusCallback: recordingstatuscallback });
            break;
        default:
            twiml.say("I'm thinking");
            twiml.hangup();
            break;
    }

    var responseBody = twiml.toString();
    var response = {
        statusCode: 200,
        body: responseBody
    };

    cb(null, responseBody);
}

module.exports.status = function (e, ctx, cb) {
    console.log('processing event: %j', e)
    // var snsarn = process.env.SNSARN;

    var body = {};
    if (e && e.reqbody) {
        body = qs.parse(e.reqbody);
    }

    console.log(body)

    // if (snsarn) {
    //     snsPublish(`New Voicemail: ${body.RecordingUrl}`, { arn: snsarn, subject: 'New Voicemail' });
    // }

    var response = {
        statusCode: 200,
    };

    cb(null, response);
}