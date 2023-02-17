import express from 'express';
import getURLPreview from '../utils/urlPreviews.js';
//import session from 'express-session';

var router = express.Router();


//TODO: Add handlers here
router.post('/', async(req,res,next) => {
    if(req.session.isAuthenticated){
        let newPost = new req.models.Post({
            url: req.body.url,
            description: req.body.description,
            //username: req.body.username,
            username: req.session.account.username,
            //change from req.body.username to match the session
            created_date: new Date().toISOString()
        })
        
        await newPost.save()
    
        res.json({"status":"success"})
    } else {
        res.status(401).json(
            {
                status: "error",
                error: "not logged in"
             }
        )
    }
})

router.get('/', async function(req, res, next) {
    try {
        let allPosts;
        if(req.query.username) {
            allPosts = await req.models.Post.find({username: req.query.username})
        } else {
            allPosts = await req.models.Post.find()
        }
        
        //let allPosts = await req.models.Post.find()
        let finalJSON = await Promise.all(
        allPosts.map(async post => {
            let postObject = {}
            postObject.description = post.description
            postObject.username = post.username 
            //from v3 creative component
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

/*
router.post('/posts', async(req,res,next) => {
    if(req.session.isAuthenticated){
        let newPost = new req.models.Post({
            url: req.body.url,
            description: req.body.description,
            //username: req.body.username,
            username: req.session.account.username,
            //change from req.body.username to match the session
            created_date: new Date().toISOString()
        })
        
        await newPost.save()
    
        res.json({"status":"success"})
    } else {
        res.status(401).json(
            {
                status: "error",
                error: "not logged in"
             }
        )
    }
})
*/


/*
router.get('/posts', async(req,res,next) => {
    try {
        let postUsername = req.query.username
        // check if the query parameter is set(username is present)
        if (myStr === null || myStr.trim() === ""){
            //send back all posts
        } else {
            //send back only the posts that match with the username
        }


        let allPosts = await req.models.Post.find()
        //let allPosts = await req.models.Post.find()
        let finalJSON = await Promise.all(
        allPosts.map(async post => {
            let postObject = {}
            postObject.description = post.description
            postObject.username = postUsername
            //double check if this is the right way to return username
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
})
*/