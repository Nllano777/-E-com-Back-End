// import models
const Category = require('./Category');
const Product = require('./Product');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Create Relationships
// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: "product_id",
  through: "product_tag",
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsTo(Product, {
  foreignKey: "tag_id",
  through: "product_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
