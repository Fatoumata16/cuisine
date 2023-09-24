


const { DataTypes } = require("sequelize");
const sequelize = require('./sequelizeconfig');

const poste = sequelize.define('poste', {
    id_post: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'poste' ,
    timestamps: false
  });
poste.sync()
module.exports = poste;

