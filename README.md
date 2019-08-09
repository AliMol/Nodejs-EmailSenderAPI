# Nodejs-EmailSenderAPI
1-Download & cd into Nodejs-EmailSenderAPI folder

2-run npm install

3-run npm test

4-run npm start

# Test API Locally
1-Use SwaggerUI or Postman to test the API

2-To Test API Locally Do 'POST'on this endpoint : http://localhost:3000/api/mail

3-To Test API on published address Do 'POST'on this endpoint : https://sitemindermailapi.herokuapp.com/api/mail

4-The body must be like: 
{
   "from" : "xxx@example.com",
   "to" : "xxx@example.com",
   "cc" : "xxx@example.com,xxx2@example.com,...",
   "bcc" : "xxx@example.com,xxx2@example.com,...",
   "subject" : "TEST API Email"
}
