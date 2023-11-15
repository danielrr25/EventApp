const nodemailer = require('nodemailer');

const sender = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: 'popoutlife@gmail.com',
        pass: 'emtk qufv syef yltm',
    },
});

const sendpasswordv = (recipientemail, ptoken) => {
    const maildraft = {
        from: 'popoutlife@gmail.com',
        to: recipientemail,
        subject: 'Password change code',
        text: 'Please use the following code to continue to password verification: ' +  ptoken,
    };

    sender.sendMail(maildraft, (error) => {
        if (error) {
            console.error('password token email not sent', error);
        } else {
            console.log('password token email sent');
        }
    });
};

module.exports = {
    sender, 
    sendpasswordv,
};
