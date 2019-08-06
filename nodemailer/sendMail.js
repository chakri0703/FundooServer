var nodemailer = require('nodemailer');

exports.sendMail = (link, token, payload, callback) => {


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gchakravarthia8@gmail.com',
      pass: '7899590744'
    }
  });
  const mailOptions = {
    from: 'gchakravarthia8@gmail.com', // sender address
    to: payload.email, // list of receivers
    subject: 'Subject of your email', // Subject line
    text: `${link}/${token}`// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err + " mail Cannot send ");
      callback(err, info)
    }
    else {
      //console.log(info);
      callback(null, "mail sent " + info)
    }
  });


}