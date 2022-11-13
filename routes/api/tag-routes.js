const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const dataTag = await Tag.findByPk(req.params.id,
      {
        include: [{ model: Category }, { model: Tag }],
      });
    res.status(200).json(dataTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const dataTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    }); if (!dataTag) {
      return res.status(404)
        .json({ message: 'could not find a product tag with an id of $(req.params.id}' });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    if (req.body.product_id) {
      const productTagIdArr = req.body.product_id.map((product_id) => {
        return {
          product_id,
          tag_id: newTag.id,
        }
      })
      ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(addTag);
  } catch (err) {
    res.status(500).json(err);
  }

});
// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, { where: { id: req.params.id } });
    if (!updateTag) {
      return res.status(404)
        .json({ message: 'could not fine a product tag with and id of ${req.params.id}' })
    }
    res.status(200).json(updateTag)
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const delTag = await Tag.destroy({ where: { id: req.params.id } });
    if (!delTag) {

      return res.status(404)
        .json({ message: 'Could not find a product tag with an id of ${req.params.id}' })
    } res.status(200).json(delTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
