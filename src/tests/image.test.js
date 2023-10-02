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

test("Get /product_images", async()=>{
    const res = await request(app)
        .get("/product_images")

    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
})

test("Post /product_images", async()=>{
    const image = {
        fieldname: 'image',
        originalname: 'klk.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: 'C:\\Users\\ANTONY\\Documents\\proyectos\\Ecommerce-api\\src\\public\\uploads',
        filename: 'klk.jpg',
        path: 'C:\\Users\\ANTONY\\Documents\\proyectos\\Ecommerce-api\\src\\public\\uploads\\klk.jpg',
        size: 6131
      }

    const res = await request(app)
        .post("/product_images")
        .send(image)
        .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(201)
    
})

test("Delete /product_images/:id", async()=>{
    const res = await request(app)
    .get(`/product_images/${id}`)
    .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204)

})