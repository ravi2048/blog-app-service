import express from 'express';
import postControllers from '../controllers/posts.js';
const router = express.Router();

router.get('/', postControllers.getPosts);
router.get('/:id', postControllers.getPost);
router.post('/', postControllers.addPost);
router.delete('/:id', postControllers.deletePost);
router.put('/:id', postControllers.updatePost);

export default router;