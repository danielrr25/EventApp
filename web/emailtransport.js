const nodemailer = require('nodemailer');

const sender = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: 'popoutlife@gmail.com',
        pass: 'emtk qufv syef yltm',
    },
});

const sendemailv = (recipientemail, vtoken) => {
    const maildraft = {
        from: 'popoutlife@gmail.com',
        to: recipientemail,
        subject: 'Email Verification',
        text: 'Please use the following code to verify your account: ', vtoken,
    };

    sender.sendMail(maildraft, (error) => {
        if (error) {
            console.error('verification email not sent', error);
        } else {
            console.log('verification email sent');
        }
    });
};

module.exports = {
    sender, 
    sendemailv,
};
