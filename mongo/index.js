
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/testDBuser');
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("Mongo On"); });

var UsersSchema = mongoose.Schema({
  name : {type: String}, // 이름
  id : {type: String, unique: true}, // 아이디
  email : {type: String}, // 이메일
  passwd : {type : String},
  phone : {type : String}, // 폰번호
  token : {type: String}, // 토큰
  ideaList:  [{ // 사업아이템 리스트
    token : {type : String} // 아이디어 토큰
  }],
  projectList: [{
    token : {type : String} // 프로젝트 토큰
  }],
  punchList : [{ // 후원자 리스트
    projectToken : {type : String}, // 프로젝트 토큰
    token : {type : String} // 후원자 토큰
  }],
  profileImg: { type : String } // 프로필 이미지 링크
})

var IdeasSchema = mongoose.Schema({
  profileImg : {type : String}, // 아이디어 주인의 이미지 링크
  category : {type : String}, // 카테고리
  name : {type : String}, // 아이디어 주인의 이름
  title : {type: String}, // 제목
  reply : [{
    index : {type : String}, // 댓글
    profileImg : {type : String}, // 댓글 단 사람 프로필 이미지 링크
    name : {type : String} // 댓글 올린 사람 이름
  }],
  index : {type : String}, // 아이디어 내용
  token : {type : String}, // 글 토큰
  userToken : {type : String}, // 아이디어 주인의 토큰
  img : [{
    link : {type : String} // 이미지 링큰
  }]
})

var ProjectsSchema = mongoose.Schema({
  mainImg : {type : String}, // 메인 이미지 링크
  category : {type : String}, // 카테고리
  title : {type : String}, // 제목
  token : {type : String}, // 글 토큰
  company : {type : String}, // 회사
  index : {type : String}, //
  userToken : {type : String}, // 글 올린 사람 토큰
  price : {type : Number}, // 예상 가격
  punchPrice : {type : Number}, // 모인 금액
  punchMember : [{
    token : {type : String}, // 후원자 토큰
  }],
  img : [{
    link : {type : String}
  }]
})
var Users = mongoose.model('users', UsersSchema);
var Ideas = mongoose.model('ideas', IdeasSchema);
var Projects = mongoose.model('projects', ProjectsSchema);

require('./err')(UsersSchema);

export {Users, Ideas, Projects};
export default db;
