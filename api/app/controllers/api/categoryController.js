const categoryDataMapper = require('../../models/categoryDatamapper');

const categoryController = {
  async getAll(_, res) {
    const categories = await categoryDataMapper.getAll();
    if (categories.length > 0) {
      return res.status(200).json(categories);
    } else {
      return res.status(404).json({
        message: 'No categories found',
      });
    }
  },

  async createCategory(req, res) {
    const categories = await categoryDataMapper.createCategory(req.body);
    return res.status(200).json(categories);
  },

  async getOneCategory(req, res) {
    const categories = await categoryDataMapper.getOneCategory(req.params.id);
    if (!categories) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }
    return res.status(200).json(categories);
  },

  async updateCategory(req, res) {
    const categories = await categoryDataMapper.updateCategory(
      req.params.id,
      req.body
    );
    return res.status(200).json(categories);
  },

  async removeCategory(req, res) {
    const activities = await categoryDataMapper.removeCategory(req.params.id);
    return res.status(200).json(activities);
  },
};

module.exports = categoryController;
