
const { DataTypes } = require("sequelize");
const sequelize = require('./sequelizeconfig');

const user = sequelize.define('user', {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
     
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sexe: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'user' ,
    timestamps: false
  });

module.exports = user;