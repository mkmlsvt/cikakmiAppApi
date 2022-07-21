const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
const Group = require('../models/Group');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signUp', (req,res,next) =>{
  userreq = req.body;
  const user = new User({
    username : userreq.username,
    password : userreq.password,
    birthday : userreq.birthday,
    mail : userreq.mail,
    tel : userreq.tel,
    durum : "musait"
  });
  user.save((err,data) => {
    if(err)
        res.json({status : false})
    else
        res.json(data);
  })
});

router.post('/logIn', (req,res,next) => {
  userreq = req.body;
  User.findOne({username : userreq.username, password : userreq.password}, (err,data) => {
    if(data)
      res.send(data);
    else
      res.send({status:false})
  });

});

router.post('/findById', (req,res,next) => {
  const id = req.body._id;
  User.findById(id,(err,data) => {
    if(err)
      console.log("hata kullanıcı bulunamadı");
    else
      res.json(data);
  })
});

router.post('/joinGroup', (req,res,next) => {
  myReq = req.body;
  User.findById(myReq.userid, (err,docUser) => {
    if(docUser){
      console.log(docUser.username);
      Group.findById(myReq.groupid, (err,docGroup) => {
        console.log(docGroup.name);
          if(docGroup)
          {
            console.log(docUser._id);
            docGroup.members.push(docUser._id);
            console.log(docGroup.members);
            docGroup.save((err,suc) => {
              if(err){
                console.log("group save hata");
              }
            })
            docUser.groups.push(docGroup._id);
            docUser.save((err,suc) => {
              if(err){
                console.log("user save hata");
              }
              else{
                res.json(docUser)
              }
            });
          }
      });
    }
  });
});

router.post('/updateDurum',(req,res,next) => {
  const id = req.body._id
  User.findById(id, (err,docUser) => {
    if(err){
      console.log("kullanıcı bulanamadı");
    }
    else{
      docUser.durum = req.body.durum;
      docUser.save((err,success) => {
        if(err)
          console.log("save hatası");
        else
          res.json(docUser);
      });
    }
  });
});

router.post('/updateUser', (req,res,next) => {
  const myReq = req.body;
  User.findById(myReq._id, (err,docUser) => {
    if(err){
      res.send("update işlemi başarısız işlemlerinizi kontrol edin");
    }
    else{
      docUser.password = myReq.password;
      docUser.username = myReq.username;
      docUser.mail = myReq.mail;
      docUser.save((err,success) => {
        if(err)
        {
          console.log("save hatası");
          res.send("update işlemi başarısız işlemlerinizi kontrol edin");
        }
        else
          res.json(docUser);
      });
    }
  });
});
module.exports = router;
