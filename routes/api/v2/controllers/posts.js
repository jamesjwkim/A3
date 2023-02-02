import express from 'express';
import getURLPreview from '../utils/urlPreviews.js';

var router = express.Router();


//TODO: Add handlers here
router.post('/', async function(req, res, next) {
    console.log("this is the body:")
    console.log(req.body)
    try {
        let newPost = new req.models.Post({
            url: req.body.url,
            description: req.body.description,
            created_date: new Date().toISOString(),
            username: req.body.username
        })
        
        await newPost.save()
    
        res.json({"status":"success"})
        //res.status(500).json({"status": "Success", "error": err})
        } catch(err) {
            console.log(err)
            res.send("error info:" + err)
            res.status(500).json({"status": "error", "error": err})
        }   
})


router.get('/', async function(req, res, next) {
    try {
        let allPosts = await req.models.Post.find()
        let finalJSON = await Promise.all(
        allPosts.map(async post => {
            let postObject = {}
            postObject.description = post.description
            postObject.username = post.username
            try {
                console.log("print post.url")
                console.log(post.url)

                let newPost = await getURLPreview(post.url)
                postObject.htmlPreview = newPost
            }catch(err) {
                postObject.htmlPreview = "error" + err
                //res.status(500).json({"status": "error", "error": err})
            }
            return (postObject)
        })
        )
        res.json(finalJSON)
    } catch(err) {
        res.status(500).json({"status": "error", "error": err})
    }
    
  });

export default router;

