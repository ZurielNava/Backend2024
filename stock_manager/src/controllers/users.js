const { request, response } = require('express');

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Bob Smith' },
];


const getAll = (req = request, res = response) => {
    res.send(users);
};


const getById = (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }
    const user = users.find(user => user.id === +id);

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    res.send(user);
};


const createUser = (req = request, res = response) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).send("Bad request. The 'name' field is missing.");
        return;
    }

    const userExists = users.find(user => user.name === name);

    if (userExists) {
        res.status(409).send('User already exists');
        return;
    }

    users.push({ id: users.length + 1, name });
    res.send("User created successfully");
};


const updateUser = (req = request, res = response) => {
    const { id } = req.params;
    const { name } = req.body;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }
    const user = users.find(user => user.id === +id);

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    users.forEach(user => {
        if (user.id === +id) {
            user.name = name;
        }
    });
    res.send("User updated successfully");
};

const deleteUser = (req=request, res= response) =>{
    const {id} = req.params;
    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }
    const user = users.find(user => user.id === +id);

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    users.splice(users.findIndex((user) => user.id === +id), 1);
    res.send("user delete succesfully");
}

module.exports = { getAll, getById, createUser, updateUser, deleteUser };