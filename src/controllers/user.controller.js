const catchError = require('../utils/catchError');
const User = require('../modals/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")
const EmailCode = require('../modals/EmailCode');

const getAll = catchError(async(req, res) => {
    // Operaciones...
    const users = await User.findAll();
    return res.json(users)
});
const create = catchError(async(req, res)=>{
    const {firstName, lastName, email, password, phone} = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password: encryptedPassword
    })  

    await sendEmail({
        to: email,
        subject: "verifying email",
        html:`
        <h1>Welcome ${firstName} ${lastName}</h1>
        <h3>Thank you for signing up for my app</h3>
        `
    })
    return res.status(201).json(newUser)
})
const remove = catchError(async(req, res)=>{
    const {id} = req.params;

    await EmailCode.destroy({where: {userId: id} })
    await User.destroy({where: {id} })

    return res.sendStatus(204)
})
const modifyUser = catchError(async(req, res)=>{
    const {id} = req.params;
    const {firstName, lastName} = req.body;
    const user = User.update({
        firstName,
        lastName
    }, {where: {id}, returning: true})
    if(user[0]==0){return res.sendStatus(404)}

    return res.json(user[1][0])
})

const login = catchError(async(req, res)=>{
    const {email, password} = req.body
    const user = await User.findOne({where: {email} })
    if(!user){res.status(401).json("invalid credentials")}
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid){res.status(401).json("invalid credentials")}

    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        { expiresIn: "1d"}
    )

    res.json({user, token})
})
const resetPassword = catchError(async(req, res)=>{
    const {email, frontBaseUrl} = req.body
    const user = await User.findOne({where: {email} })
    if(!user){return res.status(401).json("Invalid mail")}
    if(!user.isVerified){res.Status(401).json("unverified user")}

    const code = require('crypto').randomBytes(32).toString('hex')
    const link = `${frontBaseUrl}/reset_password/${code}`

    await EmailCode.create({
        code,
        userId: user.id
    })

    await sendEmail({
        to: email,
        subject: "Change account password",
        html:`
        <h1>Your password change ${user.firstName} ${user.lastName}</h1>
        <a href=${link}>Change password</a>
        `
    })
    return res.sendStatus(204)

})
const newPassword = catchError(async(req, res)=>{
    const {code} = req.params
    const {password} = req.body
    const emailCode = await EmailCode.findOne({where: {code} })
    if(!emailCode){return res.status(401).json("Invalid Code")}
    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.update({
        password: encryptedPassword
    }, {where: {id: emailCode.userId}, returning: true})
    await emailCode.destroy()
    
    return res.sendStatus(204)
})

module.exports = {
    getAll,
    create,
    remove,
    modifyUser,
    login,
    resetPassword,
    newPassword,

}