const express = require('express')
var nodemailer = require('nodemailer');

const router = express.Router()
const userController = require('../Controllers/user.controller');
// Retrieve all users
router.get('/', userController.findAll);
// Create a new user
router.post('/add-user', userController.create);
// Retrieve a single user with id
router.get('/read-user/:id', userController.findById);
// Update a user with id
router.put('/update-user/:id', userController.update);
// Delete a user with id
router.delete('/delete-user/:id', userController.delete);
// login 
router.post('/login', userController.findByLogin);

router.post('/forgot', (req, res) => {
        const {to, subject, text} = req.body;
        const mailData = {
            to: to,
            subject: subject,
            text: text,
            html: '<b>' + text + '</b>'
        };
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mohamedyoussef.jemai@esprit.tn',
                pass: 'azertyamin45682'
            }
        });


        transporter.sendMail(mailData, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                res.status(200).send({message: "Mail Send", message_id: info.messageId})
            }
        )
    }
);
//update via email
router.put('/update-user-email/', userController.updateEmail);
//read via email
router.get('/read-user-email/:email',userController.findByEmail)
// Update a user phone with id
router.put('/update-user-phone/:id', userController.updatePhone);
// Update a user email with id
router.put('/update-user-email/:id', userController.updateEmailProfile);
// Update a user address with id
router.put('/update-user-address/:id', userController.updateAddress);
// Update a user username with id
router.put('/update-user-username/:id', userController.updateUsername);
//update all profile
router.put('/update-user-all/:id', userController.updateAll);
// Update a user username with id
router.put('/update-user-image/:id', userController.updateImage);

module.exports = router

