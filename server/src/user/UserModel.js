module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique ID for de User"
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      deletedByUserId: {
        type: DataTypes.BIGINT,
        comment: "ID from User that delete this register"
      },
      deletedAt: DataTypes.DATE
    },
    {
      tableName: "user",
      schema: "onephotos"
    }
  );

  User.associate = function(models) {
    models.User.hasOne(models.UserDetail, {
      as: "UserDetail",
      through: "UserDetail",
      foreignKey: "UserId"
    });
  };

  return User;
};
