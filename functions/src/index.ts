import * as functions from 'firebase-functions';

const express = require('express');
const cors = require('cors'); // CORS Express middleware to enable CORS Requests.

const app = express();
app.use(cors());

const Vimeo = require('vimeo').Vimeo;
const client = new Vimeo(
    "f9594e24e341bdbb4793b6f31bc964b6e1a6ec5e",
    "0O6o7tMuTslqkIS3w3WABwvWO55eo53VoCBrLA3bWarfcK6/QGA8Y+HLBEpe3m8cfeMkkuF2gOd/nVFu9vEtONQE/1/WV2xhbJiwD9zuOs9iMYcS4+JcYVcLe9D3ypp0",
    "3df94c365f53b164279ba61f7a94e5b3");

app.get('/getVideos', async (req: functions.https.Request, res: functions.Response) => {
    const getChuckNorrisFact = () => { 
        return new Promise((resolve, reject) => { 
            client.request({ method: 'GET', path: '/users/55472720/videos' }, (error: any, body: any, status_code: any, headers: any) => {
                if (error) reject(error);
                resolve(body);
            });
        });
    };

    return getChuckNorrisFact().then((val) => {
        res.send(val);
    });
});


exports.api = functions.https.onRequest(app);