# Remind.me
Samsung SDS sGen Club / The 3st Team Project, 2015-2st Half / Remind.me (Server)
## Installation
```bash
$ git clone https://github.com/cenenh/sGen_Remind.me.git
$ cd sGen_Remind.me
$ npm install
$ npm start
```
## API Usage
#### Sign-up using E-mail
```js
Request: 
      HTTP Method: POST 
      Request URL: http://server_address:8080/user/auth/signup
      Request Type: JSON
      Request Data: { "email": String, "name": String, "password": String }
    
Response: 
      Response Type: JSON
      Response Data: //Only return 200 or 400 
         1) { "code": int, "data": String } // if success
         2) { "code": int, "data": String, "reason": String } // if error
      Response Data Example: 
         1) { "code": 200, "data": "addUser OK" }
         2) { "code": 400, "data": "addUser Fail", "reason": "duplicate-mail" }
```

#### Sign-up using Facebook
```js
Request:
      HTTP Method: POST
      Request URL: http//server_address:8080/user/auth/facebook_login/token
      Request Type: JSON
      Request Data: { "access_token": String }
      Request Data Example: { "access_token": "Facebook이 제공한 User Token" }
Response:
      Response Type: JSON
      Response Data: //Only return 200 or 400 or 401
         1) { "code": int, "data": String, "access_token": String} // if success
         2) { "code": int, "data": String } // if facebook_access_token_error
         3) { "code": int, "data": String, "reason": String } // if server_error
      Response Data Example: 
         1) { "code": 200, "data": "addUser OK", "access_token": "Server가 제공하는 JsonWebToken" } // if success
         * access_token은 항상 갖고 있어야 합니다.  
         2) { "code": 401, "data": "Invalid_Facebook_Access_Token" } // if facebook_access_token_error
         3) { "code": 400, "data": "addUser Fail", "reason": "duplicate-mail" } // if server_error
      
```

#### Sign-up using Google
```js
Request:
      HTTP Method: POST
      Request URL: http//server_address:8080/user/auth/google_login/token
      Request Type: JSON
      Request Data: { "access_token": String }
      Request Data Example: { "access_token": "Google 제공한 User Token" }
Response:
      Response Type: JSON
      Response Data: 
         1) { "code": int, "data": String, "access_token": String} // if success
         2) { "code": int, "data": String } // if facebook_access_token_error
         3) { "code": int, "data": String, "reason": String } // if server_error
      Response Data Example: 
         1) { "code": 200, "data": "addUser OK", "access_token": "Server가 제공하는 JsonWebToken" } // if success
         * access_token은 항상 갖고 있어야 합니다. 
         2) { "code": 401, "data": "invalid token" } // if google_access_token_error
         3) { "code": 400, "data": "addUser Fail", "reason": "duplicate-mail" } // if server_error
         4) { "code": 500, "data": "SERVER ERROR" } // if server_error
         5) { "code": 999, "data": "Unknown-err" } // if server_error
         // 4) & 5) error는 일단 client 파트가 딱히 생각 안해도 될듯
         // 이런 error를 발견하면 알려주세요..
         
```

#### Sign-in (Login)
```js
Request:
      HTTP Method: POST
      Request URL: http//server_address:8080/user/auth/login
      Request Type: JSON
      Request Data: { "email": String, "password": String }
      Request Data Example: { "email": "cenenh@naver.com", "password": "1q2w3e4r" }
Response:
      Response Type: JSON
      Response Data: //Only return 200 or 404 or 501
         1) { "code": int, "data": String, "token": String} // if success
         2) { "code": int, "data": String } // if server_error
         3) { "code": int, "data": String, "err": String } // if unknown server error
      Response Data Example: 
         1) { "code": 200, "data": "LOGIN OK", "token": "Server가 제공하는 JsonWebToken"} // if success
         * token은 항상 갖고 있어야 합니다.  
         2) { "code": 501, "data": "SERVER ERROR" } // if server_error
         3) { "code": 404, "data": "User Not Found"} // if client_error, email 혹은 password 틀림.
```

## 여기서부터는 HTTP header에 Authorization을 추가해야함.

#### Add-Remind
```js
Request:
      HTTP Method: POST
      Request URL: Request URL: http//server_address:8080/api/remind
      Request Type: multipart/form-data // "Content-Type": "multipart/form-data"
      HTTP header [Authorization] : "서버가 로그인했을때 넘겨준 token" 
      //http://stackoverflow.com/questions/5092561/http-post-request-with-authorization-on-android
      Request Data: {"company": String, "category": String, "detail-info": String, "img": File}
      //"Content-Type": "multipart/form-data" 잊지마셔유!
Response:
      Response Type: JSON
      Response Data: 
         1) { "code": int, "data": String, "remind_index": int}
         2) { "code": int, "data": String }
      Response Data Example:
         1) { "code": 200, "data": "addRemind OK", remind_index: 1} // remind_index는 갖고 있어야 합니다..
         2) { "code": 400, "data": "addRemind FAIL" }
```
