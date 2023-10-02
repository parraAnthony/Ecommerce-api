const request = require('supertest');
const app = require('../app.js');
let token

beforeAll(async()=>{
    const user = {
        email: "test@gmail.com",
        password: "test1234"
    }
    const res = await request(app).post("/users/login").send(user)
    token = res.body.token
})

test("Post /purchases", async()=>{
    const res = await request(app)
        .post("/purchases")
        .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(201)
    expect(res.body).toBeInstanceOf(Array)

})

test("Get /purchases", async()=>{
    const res = await request(app)
        .get("/purchases")
        .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)

})

