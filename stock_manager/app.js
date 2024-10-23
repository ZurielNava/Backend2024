const express = require('express');

const app = express();

app.get('/', (req, res) => {
    rest.send('hello world!');
});

app.listen(3000, () => {
    console.log('example app listen');
});