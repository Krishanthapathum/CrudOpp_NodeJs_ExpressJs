    const express = require('express');
    const mongoose = require('mongoose');
    const Product = require('./models/product_model');
    const app = express();

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    app.get('/', (req, res) => {
        res.send('Hello node api');
    })

    app.get('/blog', (req, res) => {
        res.send('Hello blog my name is pathum');
    })

    app.get('/products', async (req, res) => {
        try {
            const products = await Product.find({});
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    app.get('/product/:id', async (req, res) => {
        try {
            const {id} = req.params;
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    app.post('/product', async (req, res) => {
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            console.error(error.message); // Log error to console
            res.status(500).json({ message: error.message });
        }
    })

    //update a product
    app.put('/products/:id', async (req, res) => {
        try{
            const {id} = req.params;
            const product = await Product.findByIdAndUpdate(id, req.body);
            if(!product) {
                return res.status(404).json({ message: 'Product not found with ID ${id}' });
                    }
                    const updateProduct = await Product.findById(id);
                    res.status(200).json(updateProduct);
        }catch(error){
            console.error(error.message); // Log error to console
            res.status(500).json({ message: error.message });
        }

    })

    //delete a product
    app.delete('/products/:id', async (req, res) => {
        try {
            const {id} = req.params;
            const product = await Product.findByIdAndDelete(id);
            if(!product) {
                return res.status(404).json({ message: 'Product not found with ID ${id}' });
                    }
                    res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })


    mongoose.connect('mongodb+srv://admin:55265220220@moviereadapi.kqpsp8a.mongodb.net/Node-API?retryWrites=true&w=majority')
        .then(() => {
            console.log('Connected to MongoDB...');
            app.listen(3000, () => {
                console.log('Server is running on port 3000');
            });
        })
        .catch((err) => {
            console.error('Could not connect to MongoDB:', err.message); // Log connection error to console
        })
