var db_config = require('../config/db');
var auth = require('../config/auth');

//console.log(db_config);
console.log(db_config.host);
console.log(db_config.port);
console.log(db_config.user);
console.log(db_config.password);
console.log(db_config.database);

console.log(auth.facebookAuth);
console.log(auth.googleAuth);
