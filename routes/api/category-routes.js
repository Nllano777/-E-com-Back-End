const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!catData) {
      return res.status(404)
        .json({ message: "could not find a product category with an id of ${req.params.id}" });
    } res.status(200).json(catData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});
// create a new category 
router.post('/', async (req, res) => {
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCat = await Category.update(req.body, { where: { id: req.params.id } });
    if (!updateCat) {
      return res.status(404)
        .json({ message: "could not find a product category with an id of ${req.params.id}" });
    }
  } catch (error) {
    res.status(500).json(err)
  }
});
// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const delCat = await Category.destroy({ where: { id: req.params.id } });
    if (!delCat) {
      return res.status(404)
        .json({ message: "could not find a product category with an id of ${req.params.id}" });
    }
  } catch (error) {
    res.status(500).json(err)
  }
});

module.exports = router;
