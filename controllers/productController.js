import Product from '../models/Product.js'

export const createProduct = async (req, res) =>{
    const {name, price, image, description, stock, category} = req.body

    const product = new Product({ name, price, image, description, stock, category})
    await product.save()
    res.status(201).json(product)
}