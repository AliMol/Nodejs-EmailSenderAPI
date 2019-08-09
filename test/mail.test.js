var app = require('../app'),
    chai = require('chai'),
    request = require('supertest');

describe('SiteMaster API Integration Tests', function() {
    describe('#Post / Email', function() {
        it('should post email with MailGun', function(done) {
            request(app).post('/api/mail')
                .send({
                    "from" : "ali.moloodi@gmail.com",
                    "to" : "ali.moloodi@gmail.com",
                    "cc" : "ali@gmail.com,keli@gmail.com",
                    "bcc" : "kim@gmail.com, xho@gmail.com",
                    "subject" : "ALI TEST"
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });

        it('should post email with MailGrid', function(done) {
            request(app).post('/api/mail')
                .send({
                    "from" : "ali.moloodi@gmail.com",
                    "to" : "ali.moloodi@gmail.com",
                    "cc" : "ali@gmail.com,keli@gmail.com",
                    "bcc" : "kim@gmail.com, xho@gmail.com",
                    "subject" : "ALI TEST",
                    "apiKey" : "Test"
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });

        it('should not be able to post email without from', function(done) {
            request(app).post('/api/mail')
                .send({
                    "to" : "ali.moloodi@gmail.com",
                    "cc" : "ali@gmail.com,keli@gmail.com",
                    "bcc" : "kim@gmail.com, xho@gmail.com",
                    "subject" : "ALI TEST",
                    "apiKey" : "Test"
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.be.equal(500);
                    done();
                });
        });
    });
});

var expect = chai.expect;