import express from 'express';
import usersControllers from '../controllers/users.js';

const router = express.Router();

router.get('/', usersControllers.getPosts);

export default router;