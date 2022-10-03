// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

class Product extends Model { }

// Initializes the Product model
Product.init(
  {
    // Column for product id to be used as the primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Column for product names
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Column for product price
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      // Validate that the data type is a decimal
      validate: {
        isDecimal: true,
      },
    },
    // Column for the number of the product in stock
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      // Validate that the data type is a number
      validate: {
        isNumeric: true,
      },
    },
    // Column to reference the category the product belongs to
    category_id: {
      type: DataTypes.INTEGER,
      // References the category id column
      references: {
        model: "category",
        key: "id",
      },
      // Cascade when deleting a row
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;