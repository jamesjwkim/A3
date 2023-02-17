import express from 'express';
//import session from 'express-session';
let router = express.Router()

router.get('/myIdentity', async(req, res) => {
    if(req.session.isAuthenticated){
        res.send({
            status: "loggedin", 
            userInfo: {
               name: req.session.account.name, 
               username: req.session.account.username}
         })
      } else {
        res.json({status: "loggedout"});
      }
})

export default router;