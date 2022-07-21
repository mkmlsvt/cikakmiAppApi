const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Group = require('../models/Group');
const User = require('../models/User');
const randomstring = require('randomstring');
/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', (req,res,next) =>{
  groupreq = req.body;
  const group = new Group({
      name : groupreq.name,
      members : groupreq.members, 
      code : randomstring.generate(7)
  });
  group.save((err,data) => {
    if(err)
        res.json({status : false})
    else{
        console.log("buraya geliyor mu"+groupreq.members);
        User.findById(groupreq.members,(err,doc) => {
          doc.groups.push(data._id);
          doc.save((err,suc) => {
            if(err)
            {
              console.log("user save yaprken hata");
            }
            else
            {
              console.log("user basarili");
            }
          });
        });
        res.json(data);
    }
        
  })
});
router.post('/findGroupById',(req,res,next) => {
  const id = req.body._id;
  Group.findById(id,(err,data) => {
    res.json(data);
  });

});
router.post('/findByCode', (req,res,next) => {
  const code = req.body.code;
  console.log(code);
  Group.findOne({code : code}, (err,data) => 
  {
    if(data)
    {
      res.json(data);
    }
    else
    {
      res.send({status:false});
    }
  });
});

module.exports = router;
