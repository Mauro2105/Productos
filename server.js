const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const productRoutes = require('./src/routes/productRoutes');


require ('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/products', productRoutes);

// Iniciar el servidor
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));