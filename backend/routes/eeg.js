var express = require('express');
const axios = require('axios');
const { get } = require('mongoose');
const request = require('request');

var router = express.Router();


/* GET users listing. */
router.get('/view', async function(req, res, next) {
    //  await fetch('http://192.168.100.95:4000/view',{method:get})
    // .then((response)=>{
    //     res.send(response);
    // })
    // .catch((err)=>{
    //     console.log(err);
    //   })
      //res.send("hello");
    request('http://192.168.100.95:4000/view',function(error,response,body){
        console.error('error:', error); // Print the error
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the data received
        res.send(body); //Display the response on the website
    });
});

module.exports = router;
