import express from 'express';
var router = express.Router();

router.post('/', async(req,res) => {
    try{
        if(req.session.isAuthenticated){

            let saveUserInfo;

            saveUserInfo = new req.models.UserInfo({
                username: req.session.account.username,
                favorite_song: req.body.favorite_song
            })

            /*
            if(req.models.UserInfo.exists({username: req.session.account.username})) {
                console.log("it exists!!!!")
                saveUserInfo = new req.models.UserInfo.findOneAndReplace({
                    favorite_song: req.body.favorite_song
                })
            } else {
            }
            */
            
            await saveUserInfo.save()
        
            res.json({"status":"success"})
        } else {
            res.status(401).json(
                {
                    status: "error",
                    error: "not logged in"
                 }
            )
        }
    } catch(err) {
        res.status(500).json({"status": "error", "error": err})
    }
})

/*
router.get('/', async(req,res) => {
    const urlParams = new URLSearchParams(window.location.search);
    const username1 = urlParams.get('user');

    try {
        let allInfo;    
        allInfo = await req.models.UserInfo.find({username: username1})

        let finalJSON = await Promise.all(
            allInfo.map(async post => {
                //make sure it now returns all the fields?
                console.log("start retreiving post", post)
                let postObject = {}
                postObject.favorite_song = post.favorite_song

                return (postObject)
            })
            )
        res.json(finalJSON)
    } catch(err) {
        res.status(500).json({"status": "error", "error": err})
    }
})
*/

router.get('/', async(req,res) => {
    try {
        let givenUsername = req.query.username
        let allPosts = await req.models.UserInfo.find({username: givenUsername})

        res.json(allPosts)
    } catch(err) {
        res.status(500).json({"status": "error", "error": err})
    }
})

export default router;