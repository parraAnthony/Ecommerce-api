const request = require('supertest');
const app = require('../app.js');
let token
let id
beforeAll( async ()=>{
    const user = {
        email: "test@gmail.com",
        password: "test1234"
    }
    const res = await request(app).post("/users/login").send(user)
    token = res.body.token
})

test("Get /users ", async()=>{
    const res = await request(app).get("/users").set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
})

test("Post /users", async()=>{
    const user = {
        email: 'parraanthony359@gmail.com',
        password: 'test1234',
        firstName: 'test',
        lastName: 'test',
        phone: '123456789'
    }
    const res = await request(app).post("/users").send(user)
    id = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
})

test("Post /users/login", async()=>{
    const userCredencials = {
        email: 'parraanthony359@gmail.com',
        password: 'test1234',
    }

    const res = await request(app).post("/users/login").send(userCredencials)

    expect(res.status).toBe(200)
    expect(res.body.user).toBeDefined()
    expect(res.body.token).toBeDefined()
})

test("Put /users/:id", async()=>{
    const newData = {
        firstName: "anthony",
        lastName: "parra"
    }

    const res = await request(app)
        .put(`/users/${id}`)
        .send(newData)
        .set('Authorization', `Bearer ${token}`);

})

test("Delete /users/:id", async()=>{

    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204)
})