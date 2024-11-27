const express = require("express");
const app = express();
app.use(express.json());

const clientsRoutes = require("./routes/clients");
const productsRoutes = require("./routes/products");
const salesRoutes = require("./routes/sales");

app.use("/clients", clientsRoutes);
app.use("/products", productsRoutes);
app.use("/sales", salesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});