import express from 'express';

var router = express.Router();

import getURLPreview from '../utils/urlPreviews.js';

//TODO: Add handlers here
router.get('/preview', async function(req, res, next) {
    try {
        let urlPreview = await getURLPreview(req.query.url)
        console.log("urls.js: trying to send response!")
        console.log(urlPreview)
        res.send(urlPreview)
    }catch(err) {
        console.log("error! unable to get URLPreview")
        res.send("Error!")
    }
})

export default router;