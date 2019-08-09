
const express = require('express');
var mailGun = require('mailgun-js');
var sgMail = require('@sendgrid/mail');
const router = express.Router();

//Your api key, from mailGun’s Control Panel
var api_key = 'f11e62300768d6c6fe8b9368ad679b0a-73ae490d-246cde1a';
//Your domain, from the mailGun Control Panel
var domain = 'sandbox5710ce608d40400f8ba1a4231dc32bdb.mailgun.org';
//Your api key, from sendGrid’s Control Panel
var SENDGRID_API_KEY = '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';
sgMail.setApiKey(SENDGRID_API_KEY);

// Send a message to the specified email address when you navigate to /mail
router.post('/mail', async (req, res, next) => {

    try {
        var data = {
            //Specify email data
            from: req.body.from,
            //The email to contact
            to: req.body.to,
            cc: req.body.cc,
            bcc: req.body.bcc,
            //Subject and text data
            subject: req.body.subject
        };
        await sendMailGun(data);

    } catch (error) {
        res.status(500);
        res.jsonp({'error': error.toString() });
    }

    async function sendMailGun(data) {

        var apiKey = api_key;

        //This part has been implemented to put MailGun Down, To Test MailGrid Functionality
        //So by changing api_key to a wrong one MailGun will go down and email servie will switch to Mail Grid
        if(req.body.apiKey){

            api_key = req.body.apiKey;
        }
        //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
        var mailgun = new mailGun({apiKey: api_key, domain: domain});
        data.html = 'Send Email with MailGun!';

        //Invokes the method to send emails given the above data with the helper library
        mailgun.messages().send(data).then(() => {
            res.status(200);
            res.jsonp('success');
        })
        .catch(error => {

            console.log({'errorInMailGun': error.toString() });
            //We are switching to the second email provider here
            sendMailGrid(data);
        });
    }

    async function sendMailGrid(data) {
        const msg = {
            to: data.to,
            from: data.from,
            cc: [data.cc],
            bcc: [data.bcc],
            subject: data.subject,
            text: 'Send Email with Secondary Email Provider!',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        sgMail.send(msg).then(() => {
            res.status(200);
            res.jsonp('success');
        })
        .catch(error => {

            console.log({'errorInMailGrid': error.toString() });
            //In Case both email servers ara down, It will returns 500 status code
            res.status(500);
            res.jsonp(error);
        });
    }
});

module.exports = router;
