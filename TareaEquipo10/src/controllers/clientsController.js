let clients = [];

// Obtener todos los clientes
exports.getAllClients = (req, res) => {
    res.json(clients);
};

// Crear un cliente
exports.createClient = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Nombre y correo son requeridos" });
    }
    const newClient = { id: clients.length + 1, name, email };
    clients.push(newClient);
    res.status(201).json(newClient);
};