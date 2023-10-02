const request = require('supertest');
const app = require('../app.js');
const Category = require('../modals/Category.js');
const Image = require("../modals/Image.js") 
require("../modals")
let token
let id

beforeAll(async()=>{
    const user = {
        email: "test@gmail.com",
        password: "test1234"
    }
    const res = await request(app).post("/users/login").send(user)
    token = res.body.token
})

test("Get /products", async()=>{
    const res = await request(app).get("/products")

    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
})

test("Post /products", async()=>{
    const category = await Category.create({ 
        name: "comida"
    })
    const product = {
        title:"mayonesa",
        description: "salsa para comida",
        brand: "mavesa",
        price: "450",
        categoryId: category.id
    }

    const res = await request(app)
        .post("/products")
        .send(product)
        .set('Authorization', `Bearer ${token}`);

    id = res.body.id
    await category.destroy()

    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()

})

test("Put /products/:id", async()=>{
    const category = await Category.create({ 
        name: "comida"
    })
    const product = {
        title:"chocomilk",
        description: "para la ansiedad",
        brand: "todi",
        price: "9999999999",
        categoryId: category.id
    }

    const res = await request(app)
        .put(`/products/${id}`)
        .send(product)
        .set('Authorization', `Bearer ${token}`);
    await category.destroy();
    
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject(product)
})

test("Get  /products/:id", async()=>{
    const res = await request(app)
        .get(`/products/${id}`)

    expect(res.status).toBe(200)
    expect(res.body.id).toBeDefined()
})

test("Post /products/:id/images", async()=>{
    const image = await Image.create({ 
        url: 'http://cualquiercosa.jpg', 
        publicId: 'id' 
      })
    const res = await request(app)
        .post(`/products/${id}/images`)
        .send([image.id])
        .set('Authorization', `Bearer ${token}`);

    await image.destroy()

    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
    
})

test("Delete /products/:id", async()=>{
    const res = await request(app)
        .delete(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204)
    
})