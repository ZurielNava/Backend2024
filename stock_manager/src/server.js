const express = require('express');
const usersRoutes = require('./routes/users');
const productSuppliersRoutes = require('./routes/products_suppliers'); // Importa las rutas de products_suppliers
const staffRoutes = require('./routes/staff');
const suppliersRoutes = require('./routes/suppliers');
const productsRoutes = require('./routes/products');
const purchasesRoutes = require('./routes/purchases');

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.middlewares();
        //this.app.use(express.json());//metodo de express, intercepta la solicitud antes del backend, identificar dento del paquete tiene informacion del paquete json
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/users', usersRoutes);
        this.app.use('/products_suppliers', productSuppliersRoutes); // Rutas de products_suppliers
        this.app.use('/staff', staffRoutes); // Nueva ruta para staff
        this.app.use('/products', productsRoutes); // Nueva ruta para productos
        this.app.use('/suppliers', suppliersRoutes);
        this.app.use('/purchases', purchasesRoutes);
    }

    start(){
        this.app.listen(this.port, () =>{
            console.log('Server listeninig on port' + this.port);
         });

    }
}

module.exports = {Server};