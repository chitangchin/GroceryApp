const express = require('express');
const { pool } = require('./db_config');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

pool.connect()
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.error('DB not connected', err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
