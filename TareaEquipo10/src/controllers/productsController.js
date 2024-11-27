let products = [];

// Obtener todos los productos
exports.getAllProducts = (req, res) => {
    res.json(products);
};

// Crear un producto
exports.createProduct = (req, res) => {
    const { name, price } = req.body;
    if (!name || price == null) {
        return res.status(400).json({ message: "Nombre y precio son requeridos" });
    }
    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
};