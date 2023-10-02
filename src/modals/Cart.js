const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection'); 
   // En Mayúsculas y singular      // en minúsculas y singular
const Cart = sequelize.define('cart', {
    // Definimos las columnas aquí
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    //userId
    //productId
});

module.exports = Cart;