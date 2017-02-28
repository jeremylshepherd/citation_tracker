'use strict';
require('babel-register')({
    presets: ['react']
});

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/Users');
var Citation = require('../models/Citations');
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var passport = require("passport");
var crypto = require("crypto");
var nodemailer = require('nodemailer');
var cors = require("cors");

require("../config/passport");

/******************************************************************************
******************________AUTHENTICATION ROUTES_________***********************
******************************************************************************/

//Authentication middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("You are logged in!");
        return next(); 
    }
    req.flash("login", "You must first log in or register first!");
    res.redirect('/login');
}

/*****************
*******LOCAL******
*****************/

router.post('/signup', (req, res) => {
    User.findOne({"local.email" : req.body.email}, (err, user) => {
        if(err) {console.log(err);}
        
        if(!user) {
            var newUser = new User();
            
            User.find({}, (err, users) => {
                if(err) {console.log(err);}
                console.log(users.length);
                newUser.local.email = req.body.email;
                newUser.local.password = newUser.generateHash(req.body.password);
                newUser.local.username= req.body.username;
                newUser.local.created = Date.now();
                newUser.local.id = +(users.length) + 1;
                newUser.local.resetPasswordToken = null;
                newUser.local.resetExpires = null;
                
                newUser.save((err) => {
                    if(err) {console.log(err);}
                });
                
                req.flash('usercreated', 'New user created');
                req.login(newUser, (err) => {
                    if(err) {console.log(err);}
                    return res.redirect('/');
                });
            });
            
        }else{
            
            req.flash('signupMessage', 'Sorry, that user already exists.');
            res.redirect('/login');
        }
    });
});
    
router.post('/signon', passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true
    }));
    
router.post('/forgot', (req, res) => {
   User.findOne({'local.email' : req.body.email}, (err, user) => {
        if(err){res.json(err);}
        if(!user) {
            req.flash('login', 'User does not exist')
            return res.redirect('/login');
            
        }
       
        crypto.randomBytes(20, (err, buf) => {
            if (err) {throw err;}
            var token =  buf.toString('hex');
            console.log(token);
            user.local.resetPasswordToken = token;
            user.local.resetExpires = Date.now() + 1200000;
            
            console.log(user);
            var link = `${process.env.APP_URL}reset/${token}`;
            var text = `You (or someone else) requested a password reset. If you did not request this, ignore this email. The reset link will expire in 20 minutes. Otherwise, click the link or copy and paste link into your browser.`;
            var transport = nodemailer.createTransport("SMTP", {
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS, // Your email id
                    pass: process.env.EMAIL_PASSWORD // Your password
                }
            });
            var date = new Date(Date.now());
            var dateString = `${date.toLocaleDateString('en-us')} ${date.toLocaleTimeString()}`;
            var mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: user.local.email,
                subject: `Password reset requested at ${dateString}`,
                text: `${text}  ${link}`,
                html: `<p>${text}</p><br><a href="${link}">${link}</a>`
            };
            transport.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }else{
                    console.log(JSON.stringify(info, null, 2));
                }
            });
            
            user.save((err) => {
                if(err){console.log(err);}
            });
            console.log('Password token set.');
            req.flash('signupMessage', `Your reset link has been sent to ${req.body.email}.`);
            res.redirect('/login');
       });
   }); 
});

router.get('/reset/:token', (req, res) => {
  User.findOne({ 'local.resetPasswordToken': req.params.token}, function(err, user) {
    if(err) {return res.json(err);}
    if (!user || user.local.resetExpires < Date.now()) {
      req.flash('login', 'Password reset token is invalid or has expired.');
      return res.redirect('/login');
    }
    req.flash('signupMessage', `Enter your new password and clcik submit, ${user.local.username}`);
    res.render('reset', {
      user: req.user
    });
  });
});

router.post('/reset/:token', (req, res) => {
    User.findOne({'local.resetPasswordToken' : req.params.token}, (err, user) => {
        if(err) {return res.json(err);}
        console.log(req.body.password);
        user.local.password = user.generateHash(req.body.password);
        user.local.resetPasswordToken = undefined;
        user.local.resetExpires = undefined;
        
        user.save((err) => {
            if(err) {console.log(err);}
        });
        
        req.flash('usercreated', 'New Password Saved!');
        req.login(user, (err) => {
            if(err) {console.log(err);}
            return res.redirect('/');
        });
    });
});


/******************************************************************************
*****************____________Page Routing____________**************************
******************************************************************************/


router.get('/', isLoggedIn, (req, res) => {
    res.render('index.ejs');
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('logout', 'You have successfully logged out!');
    res.redirect('/login');
});

/******************************************************************************
****************______________API Routing______________************************
******************************************************************************/

router.get('/api/me', isLoggedIn, (req, res) => {
    if(req.user === undefined) {
        res.json({message: "You must log in first!"});
    }else{
        var user = {
            local: {}
        };
        user.local.username = req.user.local.username;
        user.local.email = req.user.local.email;
        user.local.created = req.user.local.created;
        user.local.id = req.user.local.id;
        user.message = "Who's awesome you're awesome. Thanks for signing in!";
        res.json(user);
    }
});

router.get('/api/users/:username', isLoggedIn, (req, res) => {
   User.findOne({'local.username' : req.params.username}, (err, user) => {
       if(err) {res.json(err);}
       if(!user) {return res.json('User does not exist');}
       Citation.find({'creator' : user._id}, (err, citations) => {
           if(err) {res.json(err);}
           let obj = {};
           obj._id = user._id;
           obj.edit = req.user._id.toString() == user._id.toString() ? true : false;
           obj.username = user.local.username;
           obj.email = user.local.email;
           obj.created = user.local.created;
           obj.citations = citations;
           res.json(obj);
       });
   });
});

router.post('/api/new/citation', isLoggedIn, (req, res) => {
    User.findOne({'_id': req.user._id}, (err, user) => {
        if(err)  {res.json({message:err});}
       
        var newCite = new Citation({
            ticket: req.body.ticket,
            tag: req.body.tag,
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            color: req.body.color,
            state: req.body.state,
            violation: req.body.violation,
            location: req.body.location,
            date: req.body.date,
            time:req.body.time,
            officer :{name: req.body.officer.name, unit: req.body.officer.unit},
            employee: req.body.employee,
            creator: user._id
        });
        newCite.save((err) => {
          if(err) {console.log(err);}
          console.log('Citation saved!');
          res.json({message: 'Citation saved'});
      });
    });
});

router.post('/api/update/:ticket', isLoggedIn, (req, res) => {
    User.findOne({'_id': req.user._id}, (err, user) => {
        if(err)  {console.log(err);}
        Citation.findOne({'ticket': req.params.ticket}, (err, citation) => {
            if(err)  {res.json({message:err});}
            
            if(user._id.toString() === citation.creator.toString()){
                citation.ticket = req.body.ticket;
                citation.tag = req.body.tag;
                citation.make = req.body.make;
                citation.model = req.body.model;
                citation.year = req.body.year;
                citation.color = req.body.color;
                citation.state = req.body.state;
                citation.violation = req.body.violation;
                citation.location = req.body.location;
                citation.date = req.body.date;
                citation.time = req.body.time;
                citation.officer  = {name: req.body.officer.name, unit: req.body.officer.unit};
                citation.employee = req.body.employee;
                
                citation.save((err) => {
                  if(err) {console.log(err);}
                  console.log('Citation updated!');
                  res.json({message:'Citation updated'});
                });
            }else{
                console.error("You cannot edit another's citations!");
                req.flash('illegalAction', "You cannot edit another's citations!");
                return res.status('500').json({message:"You cannot edit another's citations!"});
            }
        });
    });
});


router.get('/api/citations', cors(), (req, res) => {
    Citation.find({}, (err, results) => {
       if(err){console.log(err);}
       res.json(results);
    });
});

router.get('/api/citation/:ticket', isLoggedIn, (req, res) => {
    Citation.findOne({'ticket': req.params.ticket}, (err, ticket) => {
       if(err){console.log(err);}
       if(!ticket){return res.json({message : 'Ticket not found'});}
       res.json(ticket);
    });
});

router.get('*', (req, res) => {
    res.render('index.ejs');
});

module.exports = router;