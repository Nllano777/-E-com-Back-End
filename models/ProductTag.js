const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // column to refence the product id
    product_id: {
      type: DataTypes.INTEGER,
      // reference for product/id
      references: {
        model: "product",
        key: "id",
      },
    },
    // column to refence the tag id
    tag_id: {
      type: DataTypes.INTEGER,
      // Refernce to tag id
      references: {
        model: "tag",
        key: "id",
      },
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
