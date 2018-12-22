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

* POST /signin ( 유저 로그인 )

> Params

    id : { type : String } // 유저 아이디

    passwd : { type : String } // 유저 비밀번호

> Response

    HTTP 200 : { user :
      name : {type: String}, // 이름
      id : {type: String, unique: true}, // 아이디
      email : {type: String}, // 이메일
      passwd : {type : String},
      phone : {type : String}, // 폰번호
      token : {type: String}, // 토큰
      itemList:  [{ // 사업아이템 리스트
        token : {type : String} // 아이템 토큰
      }],
      punchList : [{ // 후원자 리스트
        token : {type : String} // 후원자 토큰
      }],
      profileImg: { type : String } // 프로필 이미지 링크
    }

    HTTP 404 : { message : "User Not Found!"}

* POST /signset ( 유저 정보 수정 )

> Params

    name : 수정할 이름

    id : 수정할 아이디

    passwd : 수정할 비밀번호

    token : 유저 토큰

    phone : 수정할 폰 번호

> Response

    HTTP 200 : { message : "success!"}

    HTTP 500 : { message : "ERR!"}

* POST /signdel ( 회원 탈퇴 )

> Params

    token : 유저 토큰

> Response

    HTTP 200 : { message : "success!" }

    HTTP 500 : { message : "ERR!"}

* POST /idExist ( 아이디 중복 확인 )

> Params

    id : 확인할 id

> Params

    HTTP 200 : { message : "success!" } // 중복 안됨

    HTTP 409 : { message : "id exist!"} // 중복됨

* POST /img ( 프로필 이미지 추가 및 변경 )

> Parmas

    img : 프로필 이미지 ( 사진 )

    token : 유저 토큰

> Response

    HTTP 200 : { url : 프로필 사진 링크 }

    HTTP 500 : { message : "ERR!" }

* POST /newItem ( 프로젝트 생성 )

> Params

    token : 유저 토큰

    title : {type : String}, // 사업 제목

    itemName : {type : String}, // 아이템 이름

    itemIntroduce : {type : String}, // 간단한 아이템 설명

    introduce : {type : String}, // 상세 설명

    category : {type : String}, // 카테고리

> Response

    HTTP 200 : { message : "success!" }

    HTTP 500 : { message : "ERR!" }

* POST /itemset ( 프로젝트 수정 )

> Params

    token : 프로젝트 토큰

    title : 사업 제목

    itemName : 아이템 이름

    itemIntroduce : 간단한 아이템 설명

    category : 카테고리

    userToken : 프로젝트 대표 토큰

> Response

    HTTP 200 : { message : "success!"}

    HTTP 500 : { message : "ERR!" }

* POST /itemdel ( 프로젝트 삭제 )

> Params

    token : 프로젝트 토큰

> Response

    HTTP 200 : { message : "success!"}

    HTTP 500 : { message : "ERR!"}

* POST /allItems ( 모든 프로젝트 찾기 )

> Params

    없음

> Response

    HTTP 200 : {
      "list": [
          {
            "title": "CNyvSyooFQnR",
            "token": "7M14Z396iQOr",
            "itemName": "asdasdsadasd",
            "itemIntroduce": "asdsalkdjals;kdj;lsakjd;lksajd;lksajf",
            "introduce": "asfd;ljksafjlakwjgew9oidhgpewufn",
            "category": "sadaslkdjsalkdjlkjgoiergoqwlkajgnkr;do",
            "staffList": [
                {
                    "token": "PETzEjoxWmDAZRciv1CD1ptCcPYf9o54IbqjcIBl"
                }
            ],
            "currentStaff": 1,
          }
       ]
    }
