const {request, response} = require ('express');
const bcrypt = require('bcrypt');
const pool = require('../../db/connection');
const { usersQueries } = require('../models/users');

const saltRounds = 10;


const getAllUsers = async (req = request, res= response) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const users = await conn.query(usersQueries.getAll);

        res.send(users);
    }catch (error){
        res.status(500).send(error);
        return;
    }finally{
        if (conn) conn.end();
    }

}

const getUserById = async (req = request, res= response) =>{
    const {id} = req.params;
    if(isNaN(id)){
        res.status(400).send('Invalid ID');
        return;
    }
    let conn;
    try{
        conn = await pool.getConnection();
        const user = await conn.query(usersQueries.getById, [+id]);
        
        if(user.length ===0){
        res.status(404).send('User not found')
        return;
    }
    res.send(user);
    }catch (error){
        res.status(500).send(error);
    }finally{
        if(conn) conn.end();
    }

    //const user = users.find(user => user.id === +id);

    if(!user){
        res.status(404).send('User not found')
        return;
    }
    
}
//agregar un usuario
const CreateUser = async (req = request, res = response) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        res.status(400).send('Bad Request. Some fields are missing');
        return;
    }

    let conn;
    try{
        conn = await pool.getConnection();
        const user = conn.query(usersQueries.getByUsername, [username]);
        if(user.length > 0){
            res.status(409).send('Username already exits');
            return;
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await conn.query(usersQueries.create, [username, hashPassword, email]);
        if(newUser.affectedRows ===0){
            res.status(500).send('user could not be created');
            return;
        }
        res.status(201).send("user created succefully");
    }catch (error){
        res.status(500).send(error);
        return;
    }finally{
        if(conn) conn.end();
    }

     
    //const user = user.find(user => user.name === name);

    //if(user){
    //    res.status(409).send('User already exits');
    //}

}

const loginUser = async (req = request, res = response) => {
    const {username, password} = req.body;

    if(!username || !password) {
        res.status(400).send('username and Password are mandatory');
        return;
    }

    let conn;
    try{
        conn = await pool.getConnection();

        const user = await conn.query(usersQueries.getByUsername, [username]);

        if(user.length === 0){
            res.status(404).send('User not found');
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user[0].password);

        if(!passwordMatch) {
            res.status(403).send('Bad username or password');
            return;
        }

        res.send('Login in');
    }catch(error){
        res.status(500).send(error);
    }finally {
        if (conn) conn.end()
    }
}
 
const updateUser = async (req = request, res = response) => {
    const { id } = req.params;
    const { username, password } = req.body;

    if (isNaN(id)) {
        res.status(400).send("Invalid ID");
        return;
    }

    // Si no se proporciona ni username ni password, no hay nada que actualizar
    if (!username && !password) {
        res.status(400).send("At least one field (username or password) is required for update");
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        
        // Verificar si el usuario existe
        const user = await conn.query(usersQueries.getById, [+id]);
        if (user.length === 0) {
            res.status(404).send("User not found");
            return;
        }
        
        // Si hay password, encriptarlo
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }

        // Realizar la actualización según los campos proporcionados
        let result;
        if (username && password) {
            // Actualizar tanto username como password
            result = await conn.query(usersQueries.updateBoth, [username, hashedPassword, +id]);
        } else if (password) {
            // Actualizar solo password
            result = await conn.query(usersQueries.updatePassword, [hashedPassword, +id]);
        } else {
            // Actualizar solo username
            result = await conn.query(usersQueries.update, [username, +id]);
        }
        
        if (result.affectedRows === 0) {
            res.status(500).send("User could not be updated");
            return;
        }

        res.send("User updated successfully");
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};


const remove = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send('ID must be a number');
        return;
    }

    //const userIndex = users.findIndex(user => user.id === +id);
    let conn;
    try{
        conn = await pool.getConnection();
        const user = await conn.query(usersQueries.getById, [+id]);
        
        if(user.length ===0){
        res.status(404).send('User not found')
        return;
        }
        const deleteduser = await conn.query (usersQueries.delete, [+id]);
        if(deleteduser.affectedRows ===0){
            res.status(404).send('user not found');
            return;
        }
        res.send('user deleted successfully');

    }catch(error){
        res.status(500).send(error);
    }finally{
        if (conn) conn.end();
    }



}

module.exports = { getAllUsers, getUserById, CreateUser, updateUser, remove, loginUser};
//tarea: agregar los endpoint de agregar, editar y eliminar un usuario
//module.exports = {getAll, getById}