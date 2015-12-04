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
        
```
