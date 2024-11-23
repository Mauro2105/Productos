const Product = require("../models/Product");

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los productos', error });
    }
}

// Obtener producto por id
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Error al buscar el producto', error });
    }
};

// Crear nuevo producto
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(200).json({ message: 'Producto creado', product });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el producto', error });
    }
};

// Actualizar producto
const updateProduct = async (req, res) => {
    try {
        const { price, stock, quantity } = req.body;
        const update = await Product.findOneAndUpdate(
            { _id: req.params.id },
            { price, stock }, 
            { new: true }
        );
        res.status(200).json({ message: 'Producto actualizado', product: update });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el producto', error });
    }
};

// Eliminar producto
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el producto', error });
    }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
