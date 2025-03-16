module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define(
    "Tasks",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      status: {
        type: DataTypes.STRING,
      },
      archived: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      tableName: "Tasks",
      timestamps: false,
    }
  );
  Tasks.associate = (models) => {
    Tasks.belongsTo(models.Users, {
      foreignKey: "createdBy",
    });
    Tasks.belongsTo(models.Boards, {
      foreignKey: "userId",
    });
  };
  return Tasks;
};
