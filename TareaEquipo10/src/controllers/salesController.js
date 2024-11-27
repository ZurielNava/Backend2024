let sales = [];

// Crear una venta
exports.createSale = (req, res) => {
    const { client_id, product_id, quantity } = req.body;
    if (!client_id || !product_id || !quantity) {
        return res.status(400).json({ message: "Cliente, producto y cantidad son requeridos" });
    }
    const newSale = { id: sales.length + 1, client_id, product_id, quantity };
    sales.push(newSale);
    res.status(201).json(newSale);
};

// Obtener todas las ventas
exports.getAllSales = (req, res) => {
    res.json(sales);
};