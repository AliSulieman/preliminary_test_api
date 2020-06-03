export default (sequelize, DataTypes) => {
    const project = sequelize.define("project", {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        text: {
            type: DataTypes.STRING,
            unique: false,
        },
        status: {
            type: DataTypes.STRING,
            unique: false,
        },
    }, {
        timestamps: false
    });
    project.associate = (models) => {
        project.hasMany(models.task, {
            foreignKey: "projectID",
        });
    };
    return project;
};