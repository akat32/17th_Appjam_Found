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

* POST /newIdea ( 아이디어 생성 )

> Params

    profileImg : 유저의 프로필 이미지 링크

    category : 카테고리

    name : 유저 이름

    title : 아이디어 제목

    index : 아이디어 설명

    userToken : 유저 토큰

> Response

    HTTP 200 : { message : "success!" }

    HTTP 500 : { message : "ERR!" }

* POST /addIdeaImg ( 아이디어 이미지 추가 )

> Params

    img : 올릴 사진

    token : 아이디어 글 토큰

> Response

    HTTP 200 : { message : "success!" }

    HTTP 500 : { message : "ERR!" }

* POST /ideaList ( 전체 아이디어 리스트 반환 )

> Params

    없음

> Response

    HTTP 200 : {
    "list": [
        {
            "profileImg": "test",
            "category": "아이티",
            "name": "test",
            "title": "신기술입니다!",
            "index": "살려줘...",
            "userToken": "aHRCKhNjWXeFyKFjAINBKKfi0isps8AIgfBWOEPW",
            "token": "DYFhd1vDv9qjYPL1Oep274",
            "reply": [
                {
                    "index": "좋네요!",
                    "profileImg": "으헤헿",
                    "name": "사람"
                }
            ],
            "img": [
                {
                    "link": "http://18.222.180.31:3000/idea/jMEmA16FiEYB6l0cxrhrG6uuHx8mHPnI9.PNG"
                }
            ],
          }
        ]
    }

* POST /addreply ( 아이디어에 댓글달기 )

> Params

    token : 아이디어 글 토큰

    index : 내용

    name : 댓글 쓸 유저 이름

    profileImg : 댓글 쓸 유저 프로필 이미지 링크

> Response

    HTTP 200 : { message : "success!" }

    HTTP 500 : { message : "ERR!" }

* POST /myIdeaList ( 내 아이디어 리스트 )

> Params

    token : 유저 토큰

> Response

    HTTP 200 : {
    "list": [
        {
            "profileImg": "test",
            "category": "아이티",
            "name": "test",
            "title": "신기술입니다!",
            "index": "살려줘...",
            "userToken": "aHRCKhNjWXeFyKFjAINBKKfi0isps8AIgfBWOEPW",
            "token": "DYFhd1vDv9qjYPL1Oep274",
            "reply": [
                {
                    "index": "좋네요!",
                    "profileImg": "으헤헿",
                    "name": "사람"
                }
            ],
            "img": [
                {
                    "link": "http://18.222.180.31:3000/idea/jMEmA16FiEYB6l0cxrhrG6uuHx8mHPnI9.PNG"
                }
            ],
          }
        ]
    }

* POST /returnIdea ( 아이디어 반환 { 한개 } )

> Params

    token : 아이디어 글 토큰

> Response

    HTTP 200 : {
    "idea": {
        "profileImg": "test",
        "category": "아이티",
        "name": "test",
        "title": "신기술입니다!",
        "index": "살려줘...",
        "userToken": "aHRCKhNjWXeFyKFjAINBKKfi0isps8AIgfBWOEPW",
        "token": "DYFhd1vDv9qjYPL1Oep274",
        "reply": [
            {
                "index": "좋네요!",
                "profileImg": "으헤헿",
                "name": "사람"
            }
        ],
        "img": [
            {
                "link": "http://18.222.180.31:3000/idea/jMEmA16FiEYB6l0cxrhrG6uuHx8mHPnI9.PNG"
            }
        ],
      }
    }
    HTTP 404 : {message : "Not Found!"}

* POST /newIdea ( 아이디어 생성 )

> Params
> Response

* POST /newIdea ( 아이디어 생성 )

> Params
> Response

* POST /newIdea ( 아이디어 생성 )

> Params
> Response

* POST /newIdea ( 아이디어 생성 )

> Params
> Response

* POST /newIdea ( 아이디어 생성 )

> Params
> Response

* POST /newIdea ( 아이디어 생성 )

> Params
> Response

* POST /newIdea ( 아이디어 생성 )

> Params
> Response

* POST /newIdea ( 아이디어 생성 )

> Params
> Response
