// ligne_appro.js

const { DataTypes } = require("sequelize");
const sequelize = require('./sequelizeconfig');

const user = require('./modeleuser');
const poste = require('./post');

const commentaire = sequelize.define('commentaire', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'commentaire',
  timestamps: false
});
commentaire.belongsTo(user, {
  foreignKey: 'id_user', // Ensure this matches the column name in the "user" table
  targetKey: 'id_user', // Ensure this matches the primary key column name in the "user" table
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  })  , 
  commentaire.belongsTo(poste, {
    foreignKey: 'id_post', // Ensure this matches the column name in the "poste" table
    targetKey: 'id_post', // Ensure this matches the primary key column name in the "poste" table
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })                   

commentaire.sync()
module.exports = commentaire;
