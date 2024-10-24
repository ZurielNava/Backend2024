const{request, response} = require('express');

const getMessage = (req = request,res = response) => {
    res.send('hello from, the users controller!');
}

module.exports = {getMessage};