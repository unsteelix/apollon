const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/pass/:pass', async (req, res) => {
    
    try {

        // Grab the text parameter.
        const pass = req.params.pass;
        // Push the new message into the Realtime Database using the Firebase Admin SDK.
        const usersRef = admin.database().ref().child('users')
        

        usersRef.orderByChild("pass").equalTo(pass).once("value")
        .then(snapshot => {
            const user = snapshot.val()

            let status = ''
            let data = null
            
            if(user){

                const userId = Object.keys(user)[0]
                status = 'success'
                data = {
                    userId: userId,
                    ...user[userId]
                }

            } else {
                status = 'error'
                data = 'User not found'
            }

            res.send({
                status: status,
                data: data
            })
        })

    } catch(e) {
        res.send({
            status: 'error',
            data: {
                name: e.name,
                message: e.message,
                stack: e.stack
            }
        })
    }
    
});

exports.api = functions.https.onRequest(app);
