import postsRouter from './controllers/posts.js';
import urlsRouter from './controllers/urls.js';
import usersRouter from './controllers/users.js';
import express from 'express';
var router = express.Router();


router.use('/posts', postsRouter);
router.use('/urls', urlsRouter);
router.use('/users', usersRouter);

export default router;