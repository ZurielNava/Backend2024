const usersQueries = {
    getAll: 'SELECT * FROM users WHERE is_active = 1',
    getById: 'SELECT * FROM users WHERE id = ? AND is_active = 1',
    getByUsername: 'SELECT * FROM users WHERE username = ?',
    create: 'INSERT INTO users (username, password, email) VALUES (?,?,?)',
    update: 'UPDATE users SET username = ? WHERE id=?',
    updatePassword: 'UPDATE users SET password = ? WHERE id = ?',
    updateBoth: 'UPDATE users SET username = ?, password = ? WHERE id = ?',
    delete: 'UPDATE users SET is_active = 0 WHERE id = ?',
};

module.exports = {usersQueries};