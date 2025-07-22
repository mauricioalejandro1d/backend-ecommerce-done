export const addToCart = async (req, res) => {
    const { productId } = req.body

    const cart = await Cart.findOne({ user: req.user.id })

    if(cart) {
        const itemIndex = cart.products.findIndex(p => p.product == productId)
        if(itemIndex > -1){
            cart.products[itemIndex].quantity += 1
        } else {
            cart.products.push({ product: productId})
        }
        await cart.save()
        return res.json(cart)
    } else {
        const newCart = new Cart({
            user: req.user.id,
            products: [{ product: productId }]
        })
        await newCart.save()
        return res.json(newCart)
    }
}
