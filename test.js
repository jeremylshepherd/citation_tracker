'use strict';
require('babel-register')({
    presets: ['react', 'es2015']
});

var request = require('supertest');
var app = require('./server.js');
var router = require('./routes/index');


describe('Unauthenticated requests to the root path', () => {
   
   it('It returns a 302 status code', (done) => {
      
      request(app)
        .get('/')
        .expect(302, done);
        
   });
   
   it('It redirects to /login path', (done) => {
      
      request(app)
        .get('/')
        .expect('location', '/login', done);
        
   });
    
});