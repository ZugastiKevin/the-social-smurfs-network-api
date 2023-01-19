const nodemailer = require("nodemailer");

async function senders(mode, email, pseudo) {
  console.log('tu est dans le mailer')

  const welcome = {
    from: process.env.EMAIL_SMURF,
    to: email,
    subject: "Thank you for joining The Social Smurfs Network",
    text: `Welcome to The Social Smurfs Network, ${ pseudo }.`
  };

  const cancelation = {
    from: process.env.EMAIL_SMURF,
    to: email,
    subject: "Thank you for use The Social Smurfs Network",
    text: `We wish you a good continuation The Social Smurfs Network, Goodbye ${ pseudo }.`
  };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTPHOST,
    port: process.env.SMTPPORT,
    secure: true,
    auth: {
      user: process.env.SMTPUSER,
      pass: process.env.SMTPPASS,
    },
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });
  
  if (mode === 'welcome') {
    mailData = welcome;
  };
  
  if (mode === 'cancelation') {
    mailData = cancelation;
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};

module.exports = senders;
