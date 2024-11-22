const { request, response } = require('express');
const pool = require('../db/connection');


// const users = [
//    { id: 1, name: 'John Doe' },
//    { id: 2, name: 'Jane Doe' },
//    { id: 3, name: 'Bob Smith' },
//];

//-------------------------------------------------------------------------

const getAllUsers = async(req = request, res = response) => {
    let conn;
    try{
        conn= await pool.getConnection();
        const users = await pool.query(userQueries.getAll);
        res.send(users);

    }catch(error){
        res.status(500).send('internal sever error');
        return
    } finally{
        if(conn) conn.end()
    }
};

//-------------------------------------------------------------------------

const getUserById = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try{
        conn = await pool.getConnection();
        const user =await conn.query(usersQueries.getById,[+id]);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
    
        res.send(user);
    } catch(error){
        res.status(500).send(error);
    } finally {
        if(conn)  conn.end();
    }
    
    const createUser = (req=request, res=response)=>{
        const{username, pssword,email}= req.body;

        if(!username || !password || !email){
            res.status(400).send("Bad request. Some fieds are missing.");
            return;
        }
        const user=user.find()
    }
    

};

//-------------------------------------------------------------------------

const createUser = async (req = request, res = response) => {
    const { username, password, email } = req.body;

    if (!username) {
        res.status(400).send("Bad request. The 'name' field is missing.");
        return;
    }
    let conn;

    try{
        conn = await pool.getConnection()
        const user = await conn.query(usersQueries.getByUsername, [username]);

        if(user.length>0){
            res.status(409).send('user name already exists');
            return;
        }
        const newUser = await conn.query(usersQueries.create,[username,password,email]);
        if(newUser.affectedRows == 0){
            res.status(500).send('user could not be created');
            return;
        }

        res.status(201).send("User created succesfuly");

    }catch(error){
        res.status(500).send(error)
    }
}

//-------------------------------------------------------------------------

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

//-------------------------------------------------------------------------

const deleteUser = async (req=request, res= response) =>{
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    try{

        conn = await pool.getConnection();
        const user = conn.query(usersQueries.getById,[+id]);
        if (!user.length == 0) {
        res.status(404).send('User not found');
        return;
        }
        const deletedUser = await conn.query(usersQueries.delete, [+id]);
        if(deleteUser.affectedRows == 0){
            res.status(500).send('user')
            return
        }j
        res.send("user deleted ")
    }catch(error){
        res.status(500).send(error);
        return;
    }finally{
        if(conn) conn.end();
    }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };             