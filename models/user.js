const { Model, Sequelize } = require("sequelize");

class User extends Model {}

/**
 * @type {typeof User}
 */
module.exports = (sequelize, DataTypes) => {
  /**
   * initialize user model, representing User model in the DB, with attributes and options
   */
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      firstName: {
        description: "User name",
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      referral: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "male",
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "User",
      tableName: "Users",
      freezeTableName: true,
    }
  );

  return User;
};
