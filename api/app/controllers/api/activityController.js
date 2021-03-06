const activityDataMapper = require('../../models/activityDatamapper');
const geoloc = require('../../config/revertGeo');

const activityController = {
  async getAll(_, res) {
    const activities = await activityDataMapper.getAll();
    if (activities.length === 0) {
      return res.status(404).json({ error: 'No activities found' });
    }
    return res.status(200).json(activities);
  },

  async getByCategory(req, res) {
    const activities = await activityDataMapper.getByCategory(
      req.params.category
    );
    if (activities.length === 0) {
      return res.status(404).json({ message: 'No activities found' });
    }
    return res.status(200).json(activities);
  },

  async getByGeo(req, res) {
    const activities = await activityDataMapper.getByGeo(req.params.geo);
    if (activities.length === 0) {
      return res.status(404).json({ message: 'No activities found' });
    }
    return res.status(200).json(activities);
  },

  async getBySearch(req, res) {
    const activities = await activityDataMapper.getBySearch(req.params.search);
    if (activities.length === 0) {
      return res.status(404).json({ message: 'No activities found' });
    }
    return res.status(200).json(activities);
  },

  async getByAdvanceSearch(req, res) {
    const activities = await activityDataMapper.getByAdvanceSearch(req.body);
    if (activities.length === 0) {
      return res.status(404).json({ message: 'No activities found' });
    }
    return res.status(200).json(activities);
  },

  async getOneActivity(req, res) {
    const activities = await activityDataMapper.getOneActivity(req.params.id);
    if (!activities) {
      return res.status(404).json({ message: 'No activities found' });
    } else {
      return res.status(200).json(activities);
    }
  },

  async createActivity(req, res) {
    const data = req.body;
    const query = `${data.address} ${data.zip_code} ${data.city} ${data.country}`;
    const geo = await geoloc.revertGeo(query);
    data.landmark = JSON.stringify(geo);
    const activities = await activityDataMapper.createActivity(data);
    if (!activities) {
      return res.status(500).json({ message: 'server error' });
    } else {
      return res.status(200).json(activities);
    }
  },

  async updateActivity(req, res) {
    const activities = await activityDataMapper.updateActivity(
      req.params.id,
      req.body
    );
    if (!activities) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    return res.status(200).json(activities);
  },

  async removeActivity(req, res) {
    const activities = await activityDataMapper.removeActivity(req.params.id);
    return res.json(activities);
  },

  async getUser(req, res) {
    const activities = await activityDataMapper.getUser(req.params.id);
    if (!activities) {
      return res.status(404).json({ message: 'No activities found' });
    }
    return res.status(200).json(activities);
  },
};

module.exports = activityController;
