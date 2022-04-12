exports.handler = function (context, event, callback) {
  const response = new Twilio.twiml.VoiceResponse();
  
  // convert speech result to lower case and set a default value
  const SpeechResult = (event.SpeechResult && 
    event.SpeechResult.toLowerCase()) || '';

  // what does caller want to do?
  if (event.Digits === '1' || SpeechResult.includes('message')) {
    // caller wants to leave a message
    response.say(`Please leave a message after the beep.
      Press the hash key when finished.`);
    response.record({
      action: '/recording-done',
      recordingStatusCallback: '/recording-ready',
      recordingStatusCallbackEvent: 'completed',
      finishOnKey: '#'
    });
    response.say('I did not receive a recording.');
  } else if (event.Digits === '0' || SpeechResult.includes('exit')) {
    // caller wants to hang up
    response.say('Ok. Goodbye!');
  } else {
    // caller selected something else
    response.say('Invalid selection. Goodbye.');
  }
  return callback(null, response);
};