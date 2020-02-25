module.exports = (sequelize, DataTypes) => {
  var UserDetail = sequelize.define(
    "UserDetail",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique ID for UserDetail"
      },
      userId: {
        type: DataTypes.INTEGER,
        comment: "ID from User"
      },
      slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: "Unique shortId for de UserDetail"
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "UserDetail name"
      },
      photoUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Photo from provider"
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Email from provider"
      },
      googleId: {
        type: DataTypes.DECIMAL,
        unique: true,
        comment: "ID from the google provider"
      },
      googleProfile: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "profile from google provider"
      },
      createdByUserId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        comment: "ID from User that create this register"
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
      tableName: "userDetail",
      schema: "onephotos"
    }
  );

  return UserDetail;
};
