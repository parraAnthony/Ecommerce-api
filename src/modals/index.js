const EmailCode = require("./EmailCode");
const Image = require("./Image");
const User = require("./User");
const Product = require("./Product")
const Category = require("./Category");
const Cart = require("./Cart");
const Purchase = require("./Purchase");

EmailCode.belongsTo(User)
User.hasOne(EmailCode)

Image.belongsTo(Product)
Product.hasMany(Image)

Product.belongsTo(Category)
Category.hasMany(Product)

//Cart
Cart.belongsTo(User)
User.hasMany(Cart)

Cart.belongsTo(Product)
Product.hasMany(Cart)

//Purchase
Purchase.belongsTo(User)
User.hasMany(Purchase)

Purchase.belongsTo(Product)
Product.hasMany(Purchase)
