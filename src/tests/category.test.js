const request = require('supertest');
const app = require('../app.js');
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

test("Get /category", async()=>{
    const res = await request(app)
        .get("/category")
        .set('Authorization', `Bearer ${token}`);
        
        expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Array)
})

test("Post /category", async()=>{
    const category = {
        name: "compota"
    }

    const res = await request(app)
        .post("/category")
        .send(category)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id
    
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.name).toBe(category.name)
})

test("Put /category/:id", async()=>{
    const category = {
        name: "compota"
    }
    const res = await request(app)
        .put(`/category/${id}`)
        .send(category)
        .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(category.name)
})

test("Delete /category/:id", async()=>{
    const res = await request(app)
        .delete(`/category/${id}`)
        .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(204)
})
