
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
  itemList:  [{ // 사업아이템 리스트
    token : {type : String} // 아이템 토큰
  }],
  punchList : [{ // 후원자 리스트
    token : {type : String} // 후원자 토큰
  }],
  profileImg: { type : String } // 프로필 이미지 링크
})

var ItemsSchema = mongoose.Schema({
  token : {type : String}, // 아이템 토큰
  title : {type : String}, // 사업 제목
  itemName : {type : String}, // 아이템 이름
  itemIntroduce : {type : String}, // 간단한 아이템 설명
  introduce : {type : String}, // 상세 설명
  currentStaff : {type : Number}, // 현재 인원
  category : {type : String}, // 카테고리
  staffList : [{
    token : {type : String}, // 스태프 토큰
  }],
  representativeToken : {type : String} // 대표 토큰
})
var Users = mongoose.model('users', UsersSchema);
var Items = mongoose.model('items', ItemsSchema);

require('./err')(UsersSchema);

export {Users, Items };
export default db;
