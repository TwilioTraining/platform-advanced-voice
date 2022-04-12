exports.handler = function (context, event, callback) {
  const config = require(Runtime.getAssets()['/config.js'].path);
  const response = new Twilio.twiml.VoiceResponse();

  // check who is calling
  if (event.Caller === context.OWNER_NUMBER) {
    // the caller is the owner - offer to listen to messages
    const gather = response.gather({
      input: 'dtmf speech',
      action: '/owner',
      numDigits: '1',
      speechTimeout: 'auto',
      timeout: config.timeout,
      hints: 'play, exit'
    });
    gather.say(
      'Hi, welcome to your voicemail. If you would like to listen to your messages, please press 1 or say "play". If you would like to hang up, please press 0 or say "exit".'
    );
    response.say(
      "We didn't receive any input. Goodbye!"
    );
  } else {
    // the caller is *not* the owner - ask them to leave a message
    const gather = response.gather({
      input: 'dtmf speech',
      action: '/non-owner',
      numDigits: '1',
      speechTimeout: 'auto',
      timeout: config.timeout,
      hints: 'play, exit'
    });
    gather.say(
      'Hello, welcome to this voicemail. If you would like to leave a message, please press 1 or say "message". If you would like to hang up, please press 0 or say "exit".'
    );
    response.say(
      {
        voice: config.voice,
      },
      "We didn't receive any input. Goodbye!"
    );
  }
  return callback(null, response);
};