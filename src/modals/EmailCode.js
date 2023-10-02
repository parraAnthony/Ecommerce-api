const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection'); 
   // En Mayúsculas y singular      // en minúsculas y singular
const EmailCode = sequelize.define('emailCode', {
    // Definimos las columnas aquí
    code: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
    //userID
  
});

module.exports = EmailCode;