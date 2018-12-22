##에이틴 ( 제 17회 앱잼 )

#Restful Api

* POST /signup ( 유저 회원가입 )

> Parmas

    name : {type: String}, // 이름

    id : {type: String, unique: true}, // 아이디

    email : {type: String}, // 이메일

    passwd : {type : String}, // 비밀번호

    phone : {type : String}, // 폰번호

> Response

    HTTP 200 : { message: "success!"}

    HTTP 409 : { message : "already exist!"}

    HTTP 400 : { message : e.message } // 나올 일 없음
