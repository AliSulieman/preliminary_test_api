export default (sequelize, DataTypes) => {
    const user = sequelize.define("users", {
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: false,
        },
        surname: {
            type: DataTypes.STRING,
            unique: false,
        },

    }, {
        timestamps: false
    });
    user.associate = (models) => {
        user.hasMany(models.task, {
            foreignKey: 'userID'
        })
        user.hasMany(models.project, {
            foreignKey: 'userID'
        })

    }
    return user
};