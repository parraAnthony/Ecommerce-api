const request = require('supertest');
const app = require('../app.js');
const Category = require("../modals/Category.js")
const Product = require('../modals/Product.js');
require("../modals")
let token
let id=0

beforeAll(async()=>{
    const user = {
        email: "test@gmail.com",
        password: "test1234"
    }
    const res = await request(app).post("/users/login").send(user)
    token = res.body.token
})

test("Get /cart-products", async()=>{

    const res = await request(app)
        .get("/cart-products")
        .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)

})

test("Post /cart-products", async()=>{
    const category = await Category.create({ 
        name: "comida"
    })
    const product = await Product.create({
        
            title:"mayonesa",
            description: "salsa para comida",
            brand: "mavesa",
            price: "450",
            categoryId: category.id
        
    })

    const productCart = {
        quantity: 20,
        productId: product.id
    }

    const res = await request(app)
        .post("/cart-products")
        .send(productCart)
        .set('Authorization', `Bearer ${token}`);

    id = res.body.id
    await product.destroy();
    await category.destroy();

    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()

})

test("Put /cart-products/:id", async()=>{

    const category = await Category.create({ 
        name: "comida"
    })
    const product = await Product.create({
        
            title:"mayonesa",
            description: "salsa para comida",
            brand: "mavesa",
            price: "450",
            categoryId: category.id
        
    })

    const productCart = {
        quantity: 24,
        productId: product.id
    }

    const res = await request(app)
        .put(`/cart-products/${id}`)
        .send(productCart)
        .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200)
    expect(res.body.quantity).toBe(productCart.quantity)
})

test("Delete /cart-products/:id", async()=>{
    const res = await request(app)
        .delete(`cart-products/${id}`)
        .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(204)

})