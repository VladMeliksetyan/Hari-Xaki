'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
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
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users');
  }
}