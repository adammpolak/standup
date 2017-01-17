var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var express = require('express');
var router = express.Router();

//helpers/get-user
router.get('/get-user', function(req, res) {
  var user = req.user // it adds the user to the request object
  res.json({user: user})
})

router.post('/email', handleSayHello)

function handleSayHello(req, res) {
  console.log(req.body);
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    port: 465,
    auth: {
      user: 'adammpolak@gmail.com',
      pass: password
    }
  }));
  var text = 'Hello world';
  var mailOptions = {
    from: "adammpolak@gmail.com", // sender address
    to: 'adammpolak+websitecontact@gmail.com', // list of receivers
    subject: req.body.emailSubject, // Subject line
    text: "From: " + req.body.emailAddress + "\n" + req.body.emailBody //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
  });
}

module.exports = router;
