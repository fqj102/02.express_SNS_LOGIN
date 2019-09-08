module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    email: {
      type: DataTypes.STRING(100),
    },
    provider: {
      type: DataTypes.STRING(20),
    },
    snsId: {
      type: DataTypes.STRING(30),
      allowNull: false,
    }
  }, {
    timestamps: true,
    paranoid: true
  })
}