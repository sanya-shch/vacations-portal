const express = require('express');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

const router = express.Router();

const config = require('config');

router.post( '/',
    [
        check('email', 'email is required').isEmail()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { email } = req.body;

        const transporter = nodemailer.createTransport({
            service: config.get('nodemailerService'),
            auth: {
                user: config.get('nodemailerUser'),
                pass: config.get('nodemailerPass')
            }
        });

        console.log('created');
        transporter.sendMail({
            from: config.get('nodemailerUser'),
            to: email,
            subject: 'From vacation portal',
            text: 'contact the administrator'
        },function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }
);

module.exports = router;
