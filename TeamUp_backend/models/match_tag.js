const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('match_tag', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    match_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'match',
        key: 'id'
      }
    },
    tag: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'match_tag',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "match_tag_match_id_fk",
        using: "BTREE",
        fields: [
          { name: "match_id" },
        ]
      },
    ]
  });
};
