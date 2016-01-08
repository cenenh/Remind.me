var async = require('async');
var count = 0;

async.whilst(
    function () { return count < 5; },
    function (callback) {
      console.log(count);
      count++;
      callback(null, count);
    },
    function (err, n) {

    }
);

var a= 'CoQC9gAAAAhMAQvFvW09MX5e1BsoEluoAGMtu-tX_MRjPrWoQ613RdDZ8J8wmleuuEUKJQoNY74tnYOLG2qqLsc7_yATORi21KGmKRSlXGpI6F0A6lnHWWOVVd2glBO69bAqM9KiQHU1rfOY_HNA__gc5mXAH4zF7VlXhPvnRNIoQE46x_nemg8FrlhtuysS9Y5AD1ci8EpaNlb3MsJKmavvnzjEvuexZbzqodBIPcKKYLTsZNABnw8KYcmfiTXwjC2GzyR0-BYU3Fnu8kSSp61JfQdpQuLU2q0G56YQLBdgFEhoa5xdI4-KG2ffBCc37HaCk-tCxgb0qKslBeQhbwEOpF2zYTUSECCtQt5sKNzBMf2JSf7Mq8QaFGKV4OQ3vQLX61ByxZgXd4irowOl';
var b = 'CoQC9gAAAAhMAQvFvW09MX5e1BsoEluoAGMtu-tX_MRjPrWoQ613RdDZ8J8wmleuuEUKJQoNY74tnYOLG2qqLsc7_yATORi21KGmKRSlXGpI6F0A6lnHWWOVVd2glBO69bAqM9KiQHU1rfOY_HNA__gc5mXAH4zF7VlXhPvnRNIoQE46x_nemg8FrlhtuysS9Y5AD1ci8EpaNlb3MsJKmavvnzjEvuexZbzqodBIPcKKYLTsZNABnw8KYcmfiTXwjC2GzyR0-BYU3Fnu8kSSp61JfQdpQuLU2q0G56YQLBdgFEhoa5xdI4-KG2ffBCc37HaCk-tCxgb0qKslBeQhbwEOpF2zYTUSECCtQt5sKNzBMf2JSf7Mq8QaFGKV4OQ3vQLX61ByxZgXd4irowOl'
console.log( a===b )
