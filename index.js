const express = require('express');
const mongoose = require('mongoose');
const { FieldValue, Timestamp, Filter } = require('firebase-admin').firestore;
const jwt = require("jsonwebtoken");
const CryptoJS = require('crypto-js');
const cookieParser = require('cookie-parser');
const mement = require('moment');

//firebase
var admin = require("firebase-admin");
var serviceAccount = require("./spooning-4246d.json");
const { render } = require('ejs');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


const app = express();
const PORT = 3002 || process.env.PORT;

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views','./views');

let sidebarOpen = true;

const pro_education = [
  "고등학교졸업",
  "전문대학교",
  "대학교",
  "대학원",
];

const pro_gender = [
  "남성",
  "여성",
];

//취미
const pro_hobby = [
  "재테크",
  "반려동물",
  "영화",
  "드라마",
  "예능",
  "음악감상",
  "악기연주",
  "노래",
  "사진",
  "여행",
  "캠핑",
  "산책",
  "자전거",
  "요가",
  "필라테스",
  "헬스",
  "테니스",
  "서핑",
  "골프",
  "러닝",
  "야구",
  "축구",
  "스포츠관람",
  "운동",
  "술",
  "와인",
  "위스키",
  "맛집투어",
  "드라이브",
  "봉사활동",
  "댄스",
  "공연",
  "전시회",
  "독서",
  "낚시",
  "SNS",
  "웹툰",
  "DIY",
  "쇼핑",
  "인테리어",
  "뷰티",
  "카페",
  "부동산",
  "주식"
];

//성격
const pro_char = [
  "지적인",
  "차분한",
  "유머있는",
  "낙천적인",
  "내향적인",
  "외향적인",
  "감성적인",
  "상냥한",
  "귀여운",
  "열정적인",
  "듬직한",
  "개성있는"
];

//직업
const pro_job = [
  "CEO", "의사", "개인사업", "변호사", "아나운서", "사업기획", "승무원", "애널리스트", "펀드매니저", "교사", "약사", "투자업", "한의사", "치과의사", "수의사",
  "은행원", "스포츠선수", "첼리스트", "작곡가", "가수", "무용수", "디자이너", "방송인", "모델", "연주자", "대학원(석사)", "대학원(박사)", "판사", "변리사", "법무사",
  "세무사", "5급공무원", "회계사", "감정평가사", "파일럿", "사무관", "국회의원", "비서관", "시의원", "구의원", "MD", "교직원", "공무원", "기자", "앵커", "캐스터",
  "PD", "작가", "건설업", "마케터", "요리사", "치위생사", "간호사", "간호조무사", "연구원", "플로리스트", "물리치료사", "국내영업", "해외영업", "호텔리어", "영양사",
  "의료기사", "미용사", "관세사", "피부관리사", "임대업자", "큐레이터", "무역업", "노무사", "임상병리사", "스포츠강사", "무용강사", "사회복지사", "일반사무직", "학부",
  "프리랜서", "기타"
];

//지역
const pro_region = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치도",
  "경기도",
  "강원도특별자치도",
  "충북",
  "충남",
  "전북특별자치도",
  "전남",
  "경북",
  "경남",
  "제주도특별자치도"
];

const pro_regi = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주"
];

const pro_nbti = [
  "ISTJ(소금형)",
  "ISFJ(권력형)",
  "INFJ(예언자형)",
  "INTJ(과학자형)",
  "ISTP(백과사전형)",
  "ISFP(성인군자형)",
  "INFP(잔다르크형)",
  "INTP(아이디어형)",
  "ESTP(활동가형)",
  "ESFP(사교형)",
  "ENFP(스파크형)",
  "ENTP(발명가형)",
  "ESTJ(사업가형)",
  "ESFJ(친선도모형)",
  "ENFJ(언변능숙형)",
  "ENTJ(지도자형)"
];

const pro_height = [
  "145cm",
  "146cm",
  "147cm",
  "148cm",
  "149cm",
  "150cm",
  "151cm",
  "152cm",
  "153cm",
  "154cm",
  "155cm",
  "156cm",
  "157cm",
  "158cm",
  "159cm",
  "160cm",
  "161cm",
  "162cm",
  "163cm",
  "164cm",
  "165cm",
  "166cm",
  "167cm",
  "168cm",
  "169cm",
  "170cm",
  "171cm",
  "172cm",
  "173cm",
  "174cm",
  "175cm",
  "176cm",
  "177cm",
  "178cm",
  "179cm",
  "180cm",
  "181cm",
  "182cm",
  "183cm",
  "184cm",
  "185cm",
  "186cm",
  "187cm",
  "188cm",
  "189cm",
  "190cm",
  "191cm",
  "192cm",
  "193cm",
  "194cm",
  "195cm",
  "196cm",
  "197cm",
  "198cm",
  "190cm",
  "191cm",
  "192cm",
  "193cm",
  "194cm",
  "195cm",
  "196cm",
  "197cm",
  "198cm",
  "199cm",
  "200cm",
];

//체형
const pro_body = ["아주마름", "마름", "약간마름", "보통", "약간통통", "통통", "뚱뚱"];
const pro_smoke = ["피움", "안피움"];
const pro_drinking = ["안함", "조금함", "보통함", "술고래"];
const pro_religion = ["무교", "기독교", "불교", "원불교", "이슬람교"];


const dbURI = 'mongodb+srv://vinchi:7614015b@cluster0.gdtvf.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    })
  })
  .catch((err) => console.log(err));

// route
app.get('/', async (req, res) => {
  const locals = {
    title: "대쉬보드 | 썸푸닝",
    description: "썸푸닝 대쉬보드 입니다."
  };
  
  // get total count
  const total = await getTotalUsers();
  const todayUsers = await getUsersSignUpToday();
  const today = getTodayDate();
  const month = getMonthDate();
  const moneys = await db.collectionGroup('buyDia').get();
  let totalToday = 0;
  let totalMonth = 0;
  moneys.docs.forEach((money) => {
    if(money.data().buyDate.toDate() >= today) {
      let a = money.data().price.replaceAll(',', '');
      totalToday += parseInt(a);
    }
    if(money.data().buyDate.toDate() >= month) {
      let a = money.data().price.replaceAll(',', '');
      totalMonth += parseInt(a);
    }
  });
  
  const snapshot = await db.collection('users').get();
  const usersRevenue = [];
  let top5 = [];
  for(const userDoc of snapshot.docs) {
    const userId = userDoc.id;
    const user = userDoc.data();
    
    const buySnapshot = await db.collection(`users/${userId}/buyDia`).get();
    
    let todayRevenue = 0;
    let monthRevenue = 0;
    buySnapshot.forEach(doc => {
      if(doc.data().buyDate.toDate() >= today) {
        let a = doc.data().price.replaceAll(',', '');
        todayRevenue += parseInt(a);
      }
      if(doc.data().buyDate.toDate() >= month) {
        let a = doc.data().price.replaceAll(',', '');
        monthRevenue += parseInt(a);
      }
      
    });
    
    usersRevenue.push({userId, user, todayRevenue: todayRevenue, monthRevenue: monthRevenue});
    
    usersRevenue.sort((a, b) => b.monthRevenue - a.monthRevenue);
    top5 = usersRevenue.slice(0, 5);
    
  }
  
  res.render('home', {
    locals: locals,
    activeMenu: 'menu1', 
    sidebar: sidebarOpen, 
    total: total, 
    todays: todayUsers,
    totalToday: totalToday,
    totalMonth: totalMonth,
    top5: top5
  });
});

app.get('/sp_users', async (req, res) => {
  const locals = {
    title: "유저관리 | 썸푸닝",
    description: "썸푸닝 유저관리 입니다."
  };
  
  const snapshot = await db.collection('users').orderBy('createDate', 'desc').get();
  var users = [];
  for(const userDoc of snapshot.docs) {
    const userId = userDoc.id;
    const user = userDoc.data();
    
    users.push(user);
  }
  
  res.render('sp_users', {
    locals: locals,
    activeMenu: 'menu2', 
    sidebar: sidebarOpen,
    users: users
  });
});

app.get('/chatting', async (req, res) => {
  const uid = req.query.uid || 0;
  let num = req.query.num || 0;
  
  if(num > 0) {
    num = num - 1;
  }
  // console.log(uid, num);
  
  const locals = {
    title: "채팅리스트 | 썸푸닝",
    description: "썸푸닝 채팅리스트 입니다."
  };
  
  let data = {};
  let listChat = [];
  let chattings = [];
  
  const snapshot = await db.collection('chatRoom').orderBy('regDate', 'desc').get();
  
  for(let i=0 ; i<snapshot.docs.length ; i++) {
    let chatting = {};
    if(uid == 0 && i == 0) {
      const s = await db.collection('chatRoom').doc(snapshot.docs[i].id).collection('chats').orderBy('time', 'asc').get();
      s.docs.forEach(chat => {
        listChat.push(chat.data());
      });
    } else if(uid == snapshot.docs[i].id) {
      const s = await db.collection('chatRoom').doc(uid).collection('chats').orderBy('time', 'asc').get();
      s.docs.forEach(chat => {
        listChat.push(chat.data());
      });      
    }
    
    let users = [];
    for(let j=0 ; j<snapshot.docs[i].data().members.length ; j++) {
      const snap = await db.collection('users').doc(snapshot.docs[i].data().members[j]).get();
      users.push(snap.data());
    }
  
    chatting.chat = snapshot.docs[i].data();
    chatting.users = users;
    
    chattings.push(chatting);
  }
  
  data.chattings = chattings;
  data.listChat = listChat;
  data.num = num;
  
  res.render('chatting', {
    locals: locals,
    activeMenu: 'menu3', 
    sidebar: sidebarOpen,
    data: data
  });
});

app.get('/party', async (req, res) => {
  let uid = req.query.uid || 0;
  let num = req.query.num || 0;
  
  if(num > 0) {
    num = num - 1;
  }
  
  const locals = {
    title: "파티리스트 | 썸푸닝",
    description: "썸푸닝 파티리스트 입니다."
  };
  
  let data = {};
  let listChat = [];
  let chattings = [];
  
  const snapshot = await db.collection('partyCard').where('type', '==', 0).orderBy('createDate', 'desc').get();
  
  for(let i=0 ; i<snapshot.docs.length ; i++) {
    let chatting = {};
    if(uid == 0 && i == 0) {
      const s = await db.collection('partyCard').doc(snapshot.docs[i].id).collection('chats').orderBy('time', 'asc').get();
      s.docs.forEach(chat => {
        listChat.push(chat.data());
      });
    } else if(uid == snapshot.docs[i].id) {
      const s = await db.collection('partyCard').doc(uid).collection('chats').orderBy('time', 'asc').get();
      s.docs.forEach(chat => {
        listChat.push(chat.data());
      });      
    }
    
    let users = [];
    for(let j=0 ; j<snapshot.docs[i].data().members.length ; j++) {
      const snap = await db.collection('users').doc(snapshot.docs[i].data().members[j]).get();
      users.push(snap.data());
    }
  
    chatting.chat = snapshot.docs[i].data();
    chatting.users = users;
    
    chattings.push(chatting);
  }
  
  data.chattings = chattings;
  data.listChat = listChat;
  data.num = num;
  
  res.render('party', {
    locals: locals,
    activeMenu: 'menu4', 
    sidebar: sidebarOpen,
    data: data
  });
});

app.get('/shorts_gram', async (req, res) => {
  const locals = {
    title: "쇼츠/일상생활 | 썸푸닝",
    description: "썸푸닝 쇼츠/일상생활 입니다."
  };
  try {
  
    let videos = [];
    let audios = [];
    let grams = [];
    
    let snapshot = await db.collection('shortVideoCard').orderBy('createDate', 'desc').get();
    for(let i=0 ; i<snapshot.docs.length ; i++) {
      videos.push(snapshot.docs[i].data());
    }
    
    snapshot = await db.collection('shortVoiceCard').orderBy('createDate', 'desc').get();
    for(let i=0 ; i<snapshot.docs.length ; i++) {
      audios.push(snapshot.docs[i].data());
    }
    
    snapshot = await db.collection('gramCard').orderBy('createDate', 'desc').get();
    for(let i=0 ; i<snapshot.docs.length ; i++) {
      grams.push(snapshot.docs[i].data());
    }
  
    res.render('shorts_gram', {
      locals: locals,
      activeMenu: 'menu5', 
      sidebar: sidebarOpen,
      videos: videos,
      audios: audios,
      grams: grams
    });
  } catch(error) {
    console.log(error);  
  }
});

app.get('/sales', async (req, res) => {
  res.render('sales', {activeMenu: 'menu6', sidebar: sidebarOpen});
});

app.get('/push', async (req, res) => {
  res.render('push', {activeMenu: 'menu7', sidebar: sidebarOpen});
});

app.get('/announcement', async (req, res) => {
  res.render('announcement', {activeMenu: 'menu8', sidebar: sidebarOpen});
});

app.get('/report', async (req, res) => {
  res.render('report', {activeMenu: 'menu9', sidebar: sidebarOpen});
});

app.get('/guide', async (req, res) => {
  res.render('guide', {activeMenu: 'menu10', sidebar: sidebarOpen});
});

app.get('/user_profile', async (req, res) => {
  const slug = req.query['slug'];
  const uid = req.query['uid'];
  
  const snapshot = await db.collection('users').doc(uid).get();
  const user = snapshot.data();
  
  
  res.render('user_profile', {
    activeMenu: slug, 
    sidebar: sidebarOpen, 
    user: user, 
    region: pro_region, 
    education: pro_education, 
    job: pro_job
  });
});

app.get('/toggleSidebar', (req, res) => {
  sidebarOpen = !sidebarOpen;
  res.redirect('back');
});

// methods
// total users size
async function getTotalUsers() {
  const snapshot = await db.collection('users').get();
  return snapshot.size;
}

function getTodayDate() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  
  
  
  return today;
}

function getMonthDate() {
  const month = new Date();
  month.setDate(1);
  month.setHours(0, 0, 0, 0);
  return month;
}

async function getUsersSignUpToday() {
  const today = getTodayDate();
    
  const snapshot = await db.collection('users').where('createDate', '>=', today).get();
  const users = [];
  snapshot.forEach(doc => {
    users.push(doc.data());
  });
  
  return users;
}