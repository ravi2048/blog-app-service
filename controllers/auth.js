import { db } from "../db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authControllers = {
    register: (req, res) => {
        // check if already exists
        const raw_query = "SELECT * FROM users WHERE email=? OR username=?";
        db.query(raw_query, [req.body.email, req.body.username], (err, data) => {
            if(err) return res.status(500).json(err);
            if(data.length) return res.status(409).json({"message": 'user already exists'});

            // hash the password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            // create the user in db
            const insert_query = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
            const values = [
                req.body.username,
                req.body.email,
                hashedPassword
            ];

            db.query(insert_query, [values], (err, data) => {
                if(err) return res.status(500).json({"message": err});
                return res.status(200).json({"message": 'user created successfully'});
            })
        })
    },

    login: (req, res) => {
        // search for email
        const find_record = "SELECT * FROM users where email=(?)";
        db.query(find_record, [req.body.email], (err, data) => {
            if(err) return res.status(500).json({"message": err});
            if(data.length === 0) return res.status(401).json({"message": "Email does not exist!"})
            
            // match corrosponding password
            const matched = bcrypt.compareSync(req.body.password, data[0].password);
            if(!matched) return res.status(401).json({"message": "Wrong Password!"});

            // login success
            // return res.status(200).json({"message": "logged in successfully"});

            // store a unique identifier in jwt, ie the user id
            const token = jwt.sign({id: data[0].id}, "jwtKey");

            const {password, ...otherInfo} = data[0];
            // store logged in user info in cookie in the form of jwt
            res.cookie('access_token', token, {
                httpOnly: true
            }).status(200).json(otherInfo)

        })
    },

    logout: (req, res) => {
        res.clearCookie("access_token", {
            sameSite: "none",
            secure: true
        }).status(200).json({"message": "user logged out successfully"});
    }
}

export default authControllers;