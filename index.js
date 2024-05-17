const express = require('express');
const mongoose = require('mongoose');
const { FieldValue, Timestamp, Filter } = require('firebase-admin').firestore;
const jwt = require("jsonwebtoken");
const CryptoJS = require('crypto-js');
const cookieParser = require('cookie-parser');

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
    activeMenu: 'menu2', 
    sidebar: sidebarOpen,
    users: users
  });
});

app.get('/chatting', async (req, res) => {
  res.render('chatting', {activeMenu: 'menu3', sidebar: sidebarOpen});
});

app.get('/party', async (req, res) => {
  res.render('party', {activeMenu: 'menu4', sidebar: sidebarOpen});
});

app.get('/shorts_gram', async (req, res) => {
  res.render('shorts_gram', {activeMenu: 'menu5', sidebar: sidebarOpen});
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
  
  
  res.render('user_profile', {activeMenu: slug, sidebar: sidebarOpen, user: user});
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