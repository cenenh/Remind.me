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
      Request URL: http//server_address:8080/auth/facebook_login/token
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
      Request URL: http//server_address:8080/auth/google_login/token
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

#### Logout (google & facebook)
```js
Request:
      HTTP Method: DELETE
      Request URL: Request URL: http//server_address:8080/user/auth/logout
      HTTP header [Authorization] : "서버가 로그인했을때 넘겨준 token"
Response:
      Response Type: JSON
      Response Data:
         1) { "code": int, "data": String }
      Response Data Example:
         1) { "code": 200, "data": "Logout OK" }
         2) { "code": 400, "data": "Logout FAIL" }
```

#### Add-Remind with Image File
```js
Request:
      HTTP Method: POST
      Request URL: Request URL: http//server_address:8080/api/remind/img
      Request Type: multipart/form-data // "Content-Type": "multipart/form-data"
      HTTP header [Authorization] : "서버가 로그인했을때 넘겨준 token"
      //http://stackoverflow.com/questions/5092561/http-post-request-with-authorization-on-android
      Request Data: {"company": String, "category": String, "detail_info": String, "img": File}
      //없는 항목은 null 말고 http request body에 아예 값을 안넣으면 됨.
      //"Content-Type": "multipart/form-data" 잊지마셔유!
Response:
      Response Type: JSON
      Response Data:
         1) { "code": int, "data": String, "remind_index": int}
      Response Data Example:
         1) { "code": 200, "data": "addRemind OK", remind_index: 1} // remind_index는 갖고 있어야 합니다..
         2) { "code": 400, "data": "addRemind FAIL" }
```

#### Add-Remind with JSON
```js
Request:
      HTTP Method: POST
      Request URL: Request URL: http//server_address:8080/api/remind/json
      Request Type: JSON
      HTTP header [Authorization] : "서버가 로그인했을때 넘겨준 token"
      //http://stackoverflow.com/questions/5092561/http-post-request-with-authorization-on-android
      Request Data: {"company": String, "category": String, "detail_info": String }
      //없는 항목은 null 말고 http request body에 아예 값을 안넣으면 됨.

Response:
      Response Type: JSON
      Response Data:
         1) { "code": int, "data": String, "remind_index": int}
      Response Data Example:
         1) { "code": 200, "data": "addRemind OK", remind_index: 1} // remind_index는 갖고 있어야 합니다..
         2) { "code": 400, "data": "addRemind FAIL" }
```

#### Get-Remind
```
내가 등록한 remind를 response 해준다.
```
```js
Request:
      HTTP Method: GET
      Request URL: Request URL: http//server_address:8080/api/remind
      Request Type: JSON
      HTTP header [Authorization] : "서버가 로그인했을때 넘겨준 token"
      // request data 없음.
Response:
      Response Type: JSON
      Response Data:
         1) { "code": int, "data": String, "reminds": JSON_ARRAY}
         2) { "code": int, "data": String }
      Response Data Example:
         1) { "code": 200, "data": "GET REMIND OK", "reminds" : [JSON, JSON, JSON, JSON] }
         // 아래 이미지 참고
         2) { "code": 400, "data": "GET REMIND FAIL" }

```
#### 참고 이미지
![kakaotalk_20160112_221601519](https://cloud.githubusercontent.com/assets/9075767/12264457/5b9494d8-b97a-11e5-9100-8b769b675648.png)


#### 알람 설정&해제

```
* add-remind를 하면 처음에는 알람 설정이 디폴트로 true가 되어있음.
* true인 상태에서, 즉, 스위치 on인 상태에서 누르면 off가 되고,
* false인 상태에서, 즉, 스위치 off인 상태에서 누르면 on이됨.
* 설정 혹은 해제를 하고싶을때 http//server_address:8080/api/remind/alarm 로 PUT 요청을 하면 저렇게 된다.
```

```js
Request:
      HTTP Method: PUT
      Request URL: Request URL: http//server_address:8080/api/remind/alarm
      Request Type: JSON
      HTTP header [Authorization] : "서버가 로그인했을때 넘겨준 token"
      Request Data: {"index" : int} // add-remind시 서버가 준 index 값
      Request Data Example : {"index" : 10}

Response:
      Response Type: JSON
      Response Data:
         1) { "code": int, "data": String}
      Response Data Example:
         1) { "code": 200, "data": "changeAlarm OK"}
         2) { "code": 400, "data": "changeAlarm FAIL" }
```

#### 구매 완료 & 구매 완료 취소

```
* 위의 알람 설정&해제 와 비슷함.
* add-remind를 하면 처음에는 구매 완료 현황이 디폴트로 false가 되어있음.
* true인 상태에서, 즉, 스위치 on인 상태에서 누르면 off가 되고,
* false인 상태에서, 즉, 스위치 off인 상태에서 누르면 on이됨.
* 구매 완료 & 구매 완료 취소를 하고싶을때 http//server_address:8080/api/remind/complete 로 PUT 요청을 하면 저렇게 된다.
```

```js
Request:
      HTTP Method: PUT
      Request URL: Request URL: http//server_address:8080/api/remind/complete
      Request Type: JSON
      HTTP header [Authorization] : "서버가 로그인했을때 넘겨준 token"
      Request Data: {"index" : int} // add-remind시 서버가 준 index 값
      Request Data Example : {"index" : 10}

Response:
      Response Type: JSON
      Response Data:
         1) { "code": int, "data": String}
      Response Data Example:
         1) { "code": 200, "data": "changeBuyComplete OK"}
         2) { "code": 400, "data": "changeBuyComplete FAIL" }
```


#### 정규 테스트용
```js
Request:
      HTTP Method: POST
      Request URL: Request URL: http//server_address:8080/api/places/test
      Request Type: JSON
      Request Data: {"latitude" : double, "longtitude" : double }
      Request Data Example : {"latitude" : 37.5533, "longtitude": 126.974 }

Response:
      Response Type: JSON
      Response Data:
         1) { "code": int, "latitude": double, "longtitude": double }
      Response Data Example:
         1) { "code": 200, "latitude": 37.5533, "longtitude": 126.974 }
```
#### 정규 테스트용 참고이미지
![kakaotalk_20160112_235637679](https://cloud.githubusercontent.com/assets/9075767/12266801/72607534-b988-11e5-8937-3594cf7c5242.png)
![kakaotalk_20160113_000739463](https://cloud.githubusercontent.com/assets/9075767/12267094/cdf3c1de-b989-11e5-90e6-baf0ef68a39b.png)
