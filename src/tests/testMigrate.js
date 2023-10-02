const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app');
const User = require('../modals/User');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        
        const user = await User.findOne({ where: { email: 'test@gmail.com'}})
        if (!user) {
        const user = {
            email: 'test@gmail.com',
            password: 'test1234',
            firstName: 'test',
            lastName: 'test',
            phone: '123456789'
        }
        await request(app).post("/users").send(user)
        }

        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();