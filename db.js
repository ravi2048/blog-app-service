import mysql from 'mysql';

// export const db = mysql.createConnection({
//     host: '217.21.87.154',
//     user: 'u480831866_raviyadav',
//     password: 'Ravi12345',
//     database: 'u480831866_blog_app'
// });

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog_app'
});