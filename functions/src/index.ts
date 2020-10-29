import * as functions from 'firebase-functions';

const express = require('express');
const cors = require('cors'); // CORS Express middleware to enable CORS Requests.
const axios = require('axios')
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors());

const key = 'AIzaSyDVEvbjXAUVFjmQ5X3QyxH90wL1dX32eX0';
const Vimeo = require('vimeo').Vimeo;
const client = new Vimeo(
    "f9594e24e341bdbb4793b6f31bc964b6e1a6ec5e",
    "0O6o7tMuTslqkIS3w3WABwvWO55eo53VoCBrLA3bWarfcK6/QGA8Y+HLBEpe3m8cfeMkkuF2gOd/nVFu9vEtONQE/1/WV2xhbJiwD9zuOs9iMYcS4+JcYVcLe9D3ypp0",
    "3df94c365f53b164279ba61f7a94e5b3");

app.get('/getVideos', async (req: functions.https.Request, res: functions.Response) => {
    const getVideoList = () => { 
        return new Promise((resolve, reject) => { 
            client.request(
                { method: 'GET', path: '/users/55472720/videos' }, 
                (error: any, body: any, status_code: any, headers: any) => {
                    if (error) reject(error);
                    resolve(body);
                });
            }
        );
    };

    return getVideoList().then((val) => {
        res.send(val);
    });
});
app.get('/getYoutubeVideos', async (req: functions.https.Request, res: functions.Response) => {
    const getVideoList = () => { 
        return new Promise((resolve, reject) => {
            axios.get(`https://www.googleapis.com/youtube/v3/search?channelId=UCHZzRtsgs40tKSJC5eN-lJQ&key=${key}`)
            .then((val: any) => {
                let videos = ``;
                val.data.items.forEach((i: any) => {
                    if (i.id.kind.includes('video')) videos += `&id=${i.id.videoId}`
                });

                axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cplayer${videos}&key=${key}`).then((vids: any) => {
                    resolve(vids.data)
                }).catch((err: any) => resolve(err.error.message));

            }).catch((err: any) => resolve(err.error.message));
        });
    };
    
    return getVideoList().then((val) => {
        res.send(val);
    });
});

app.get('/getVideoList', async (req: functions.https.Request, res: functions.Response) => {
    const getVideoList = () => { 
        return new Promise((resolve, reject) => {
            db.collection('content').get().then((snapshot: any) => {
                const dat: any = [];
                snapshot.forEach((doc: any) => {
                    dat.push(doc.data());
                    console.log(doc.id, '=>', doc.data());
                });
                resolve(dat)
            });
        });
    };
    return getVideoList().then((val) => res.send(val) );
});


app.get('/videos', async (req: functions.https.Request, res: functions.Response) => {
    return db.collection('content').doc('videos').get().then((videos: any) => {
        res.send(videos.data().list);
    });
});


app.post('/videos', async (req: functions.https.Request, res: functions.Response) => {
    const video = req.body;
    const videosRef = db.collection('content').doc('videos');
    return videosRef.get().then((vals: any) => {
        const videos = vals.data();
        if (!videos.list) videos.list = [];
    
        // validate object: thumbnails, order, link, description, sauce
        if (video) videos.list.push(video);
        console.log(videos)
    
        return videosRef.update(videos).then(() => res.send('success'));
    });
});

app.delete('/videos', async (req: functions.Request, res: functions.Response) => {
    if (!req || !req.body || !req.body.id) {
        res.status(400).send('ID was not passed in body');
        return;
    }
    const id = req.body.id;
    const videosRef = db.collection('content').doc('videos');
    return videosRef.get().then((vals: any) => {
        const videos = vals.data();
        if (!videos.list) videos.list = [];

        const newList: any = []
        videos.list.map((v: any) => {
            if (v.id !== id) newList.push(v);
        });
        videos.list = newList;
    
        return videosRef.update(videos).then(() => res.send('success'));
    });
});

app.put('/resume', async (req: functions.https.Request, res: functions.Response) => {
    const resume = req.body;
    return db.collection('content').doc('resume').update(resume).then(() => res.send('success'));
});

app.put('/aboutme', async (req: functions.https.Request, res: functions.Response) => {
    const aboutme = req.body;
    return db.collection('content').doc('aboutme').update(aboutme).then(() => res.send('success'));
});

app.get('/resume', async (req: functions.https.Request, res: functions.Response) => {
    return db.collection('content').doc('resume').get().then((val: any) => {
        console.log(val.data())
        res.send(val.data())
    });
});

app.get('/aboutme', async (req: functions.https.Request, res: functions.Response) => {
    return db.collection('content').doc('aboutme').get().then((val: any) => {
        console.log(val.data())
        res.send(val.data())
    });
});

exports.api = functions.https.onRequest(app);