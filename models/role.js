"use strict";

var crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    let role = sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        NombreMascota: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // default values for dates => current time
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,

            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true,

            // disable the modification of table names; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: false,

            // define the table's name
            tableName: 'role',

            // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
            // to the model and throw an OptimisticLockingError error when stale instances are saved.
            // Set to true or a string with the attribute name you want to use to enable.
            version: false
        });

    role.associate = models => {
        role.belongsToMany(models.User, {
            through: 'User_role',
            foreingkey: 'role'
        });
    };

    return role;
};