var user = {
	name : 'a',
	password : 'b',
	email : 'c'
};
var array = JSON.stringify(user);

var url = encodeURIComponent(array);

console.log(user);
console.log(array);
console.log(url);
