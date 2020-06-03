export default (sequelize, DataTypes) => {
    const task = sequelize.define("task", {
        name: {
            type: DataTypes.STRING,
            unique: false,
        },
        description: {
            type: DataTypes.STRING,
            unique: false,
        },
        score: {
            type: DataTypes.INTEGER,
            unique: false,
        },
        status: {
            type: DataTypes.STRING,
            unique: false,
        },
    });

    return task
};