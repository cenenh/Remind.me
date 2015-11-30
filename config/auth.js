// config/auth.js
// expose our config directly to our application using module.exports
module.exports = {
    'facebookAuth' : {
        'clientID'      : '698775146890408',
        'clientSecret'  : '5326b5b75fde359eb882c0263f03be58',
        'callbackURL'   : 'http://54.65.85.60:8080/auth/facebook_web/callback'
    },
    'googleAuth' : {
        'clientID'      : '985262129544-3hvvbbgsal02mdotgstvnls355fd8nir.apps.googleusercontent.com',
        'clientSecret'  : 'Hx6o0vdAeV65eu44_mWT6BDC',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }
};
