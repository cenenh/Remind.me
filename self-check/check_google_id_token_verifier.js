var verifier = require('google-id-token-verifier');

// ID token from client.
var IdToken = '5689daf688310f35f4196a9137e7bf8cdfe55489';

// app's client IDs to check with audience in ID Token.
var clientId = '985262129544-3hvvbbgsal02mdotgstvnls355fd8nir.apps.googleusercontent.com';

verifier.verify(IdToken, clientId, function (err, tokenInfo) {
  if (!err) {
    // use tokenInfo in here.
    console.log(tokenInfo);
  }
  else {
    console.log(err);
  }
});
