var express = require('express');
const axios = require('axios');
var router = express.Router();

/* GET users listing. */
router.get('/view', async function(req, res, next) {
     await axios.get('http://192.168.100.171:3000/view')
    //.then((response)=> JSON.stringify(response))
    .then((response)=>{
        res.send(response);
    })
    .catch((err)=>{
        console.log(err);
      })
      //res.send("hello");
});

module.exports = router;
