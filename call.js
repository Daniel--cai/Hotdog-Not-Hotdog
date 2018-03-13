const VoiceReponse = require('twilio').twiml.VoiceResponse;

module.exports.handle = function (event, context, callback) {
    console.log(event.body)

    var recordingstatuscallback = '/dev/recordstatus';
    var messagemaxlength = 5;

    var twiml = new VoiceReponse();
    twiml.say(`You know what to say.`, { voice: 'man' });
    twiml.record({
        maxLength: messagemaxlength,
        recordingStatusCallback: recordingstatuscallback,
        // transcribe:true
    });

    twiml.hangup();

    var response = twiml.toString();

    callback(null, response);
}