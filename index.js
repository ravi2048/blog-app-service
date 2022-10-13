import express from 'express';
import { db } from './db.js';
import postsRoute from './routes/posts.js';
import usersRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json()); //to parse the body object as JSON
app.use(cookieParser());

app.use('/api/posts', postsRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

db.connect((err) => {
    if(err)  throw err;
    console.log(`connected to database`);
})
app.listen(port, (err) => {
    if(err)  throw err;
    console.log(`server started on port ${port}`);
});