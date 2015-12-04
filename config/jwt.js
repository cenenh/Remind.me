module.exports = {
    secret : "remind_me",
    options : {
      expiresIn: 1440
    },
    error : {
      TokenExpiredError : "TokenExpiredError",
      JsonWebTokenError : "JsonWebTokenError"
    }
};
// expiresInMinutes : 1440
// 24 hours
// jsonwebtoken: expiresInMinutes and expiresInSeconds is deprecated. ()
// Use "expiresIn" expressed in seconds.
