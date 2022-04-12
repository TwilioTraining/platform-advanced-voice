exports.handler = function(context, event, callback) {
  const client = context.getTwilioClient();

  const callParams = {
    to: context.OWNER_NUMBER,
    from: context.TWILIO_NUMBER,
    url: `https://${context.DOMAIN_NAME}/notification?sid=${event.RecordingSid}`
  };

  client.calls
      .create(callParams)
      .then((call) => {
          console.log("Call created:", call.sid);
          return callback(null, '');
      }).catch((error) => {
          console.error(error);
      });
};