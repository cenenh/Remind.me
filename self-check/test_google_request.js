var request = require('request');
var google_api_url = "https://www.googleapis.com/oauth2/v3/tokeninfo";

var params = {
  id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3NjkyNjY5YzEyODA0ZDcwM2YxNTRkZDhkODcyYTExZWUzNjM1ZWIifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhdWQiOiI5ODUyNjIxMjk1NDQtM2h2dmJiZ3NhbDAybWRvdGdzdHZubHMzNTVmZDhuaXIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDUxMzM5NzYzODEzMzE5MzI1OTQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiOTg1MjYyMTI5NTQ0LW52Yzh1dmQ1dWtwZzBzMjRtNmo4YWNuOWRwYnU5NTgyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiZW1haWwiOiJraW15czEzMjRAZ21haWwuY29tIiwiaWF0IjoxNDQ5ODI3OTQ1LCJleHAiOjE0NDk4MzE1NDUsIm5hbWUiOiLquYDsl7DshJ0iLCJnaXZlbl9uYW1lIjoi7Jew7ISdIiwiZmFtaWx5X25hbWUiOiLquYAiLCJsb2NhbGUiOiJrbyJ9.qHbABjdDuG41nDOWxzGZpMjqgVH6ys44neSNA-Uqmbb5huE8qAz2eViq4TYbeKDZ92wNyD0eJCBCPEziZST-v4dTwqyjon4fNWKXbRyQFLVSDyFnYactsRsM1IDE6TBxtr17idbJXh5-PbP6ovSC2fZPRwBNC-4Yv8hmNXmlIp60nNeVbAMmD-_aza50ODelnzxOiF-98PB5vVyWgzhPm4yAAOWzDLZ9uYW62inhFhOX1wvMsvYCpolb-kCR7jxFSMXy-GSTz8fwLp0Yh7EhyeQSkQqTIyorxxppA9aNYKcAJl6h3UySb1ugDKEwP6bQ9p35lordvnpOqF15ln5_Fw"
};

var err_params = {
  id_token: "1234"
}

request({url:google_api_url, qs:params}, function(err, response, body) {
  console.log("good token");
  if(err) {
    console.log(err);
    return;
  }
  result = JSON.parse(body);
  console.log("Get response: " + response.statusCode);

  console.log(result.sub);
  console.log(result.email);
  console.log(result.name);
  /**
  105133976381331932594
  kimys1324@gmail.com
  김연석
  **/
});

/*
Get response: 200
{
 "iss": "https://accounts.google.com",
 "aud": "985262129544-3hvvbbgsal02mdotgstvnls355fd8nir.apps.googleusercontent.com",
 "sub": "105133976381331932594",
 "email_verified": "true",
 "azp": "985262129544-nvc8uvd5ukpg0s24m6j8acn9dpbu9582.apps.googleusercontent.com",
 "email": "kimys1324@gmail.com",
 "iat": "1449809936",
 "exp": "1449813536",
 "name": "김연석",
 "given_name": "연석",
 "family_name": "김",
 "locale": "ko",
 "alg": "RS256",
 "kid": "87692669c12804d703f154dd8d872a11ee3635eb"
}
*/

request({url:google_api_url, qs:err_params}, function(err, response, body) {
  console.log("Bad token");
  if(err) {
    console.log(err);
    return;
  }
  console.log("Get response: " + response.statusCode);
  console.log(body);
});

/*
Get response: 400
{
 "error_description": "Invalid Value"
}
*/
