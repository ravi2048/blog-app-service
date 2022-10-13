import { db } from "../db.js";
import jwt from "jsonwebtoken";

const postControllers = {
    getPosts: (req, res) => {
        const qry = req.query.cat ? "SELECT * FROM posts where category=(?)" : "SELECT * FROM posts";
        db.query(qry, [req.query.cat], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    },

    getPost: (req, res) => {
        const qry = "SELECT p.`id` as postId, u.`username`, p.`title`, p.`description`, p.`date`, p.`img`, u.`img` as usrImg, p.`category` FROM users u INNER JOIN posts p ON u.id = p.user_id WHERE p.id=(?)";
        const post_id = req.params.id;
        db.query(qry, [post_id], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    },

    addPost: (req, res) => {
        res.json('from post controller');
    },

    deletePost: (req, res) => {
        const token = req.cookies.access_token;
        if(!token) return res.status(401).json({"message": "not authorized to perform this action"});

        // verify the token, it will return the same unique data used to sign the jwt token
        jwt.verify(token, "jwtKey", (err, userInfo) => {
            if(err) return res.status(403).json({"message": "invalid token"});

            //delete
            const qry = "DELETE FROM posts WHERE id=? and user_id=?";
            db.query(qry, [req.params.id, userInfo.id], (err, data) => {
                if(err) return res.status(500).json(err);
                return res.status(200).json(data);
            })
        })
    },

    updatePost: (req, res) => {
        res.json('from post controller');
    },
}

export default postControllers;