const client = require('../config/client');

const activityDataMapper = {
  async getAll() {
    const query = {
      text: 'SELECT * FROM activity',
      values: [],
    };
    const result = await client.query(query);
    return result.rows;
  },

  async getByCategory(idCategory) {
    const query = {
      text: ' SELECT * FROM activity WHERE id_category = $1 ',
      values: [idCategory],
    };
    const result = await client.query(query);
    return result.rows;
  },

  async getByGeo(idGeolocalisation) {
    const query = {
      text: ' SELECT * FROM activity WHERE landmark = $1 ',
      values: [idGeolocalisation],
    };
    const result = await client.query(query);
    return result.rows;
  },

  async getBySearch(idKeyWord) {
    if (idKeyWord === 'kouech') {
      return this.getAll();
    }

    const query = {
      text: `
            SELECT *
            FROM activity
            WHERE name ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%'
            `,
      values: [idKeyWord],
    };
    const result = await client.query(query);
    return result.rows;
  },

  async getByAdvanceSearch(data) {
    const column = [];
    const value = [];
    const placeholder = [];
    for (let key in data) {
      if (data[key] !== 'all') {
        column.push(key);
        value.push(data[key]);
        placeholder.push('$' + (placeholder.length + 1));
      }
    }
    const prepare = [].concat(
      'SELECT * FROM activity WHERE ',
      column.map((e, i) => `${e} = ${placeholder[i]}`).join(' AND ')
    );

    const query = {
      text: prepare[0] + prepare[1],
      values: value,
    };

    if (column.length === 0) {
      return this.getAll();
    }

    const result = await client.query(query);
    return result.rows;
  },

  async getOneActivity(idActivity) {
    const query = {
      text: 'SELECT * FROM activity WHERE id = $1',
      values: [idActivity],
    };
    const result = await client.query(query);
    if (!result.rows[0]) {
      return undefined;
    }
    return result.rows[0];
  },

  async createActivity(data) {
    const query = {
      text: `INSERT INTO activity
            (
                name,
                description,
                max_participants,
                date,
                level,
                address,
                zip_code,
                city,
                country,
                landmark,
                id_user,
                id_category
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *
                `,
      values: [
        data.name,
        data.description,
        data.max_participants,
        data.date,
        data.level,
        data.address,
        data.zip_code,
        data.city,
        data.country,
        data.landmark,
        data.id_user,
        data.id_category,
      ],
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  async updateActivity(id, data) {
    const query = {
      text: `UPDATE activity
            SET
            name = $1,
            level = $2,
            address = $3,
            zip_code = $4,
            description = $5,
            date = $6,
            city = $7,
            country = $8,
            landmark = $9,
            id_user = $10,
            id_category = $11,
            updated_at = NOW()
            WHERE id = $12
            RETURNING *`,
      values: [
        data.name,
        data.level,
        data.address,
        data.zip_code,
        data.description,
        data.date,
        data.city,
        data.country,
        data.landmark,
        data.id_user,
        data.id_category,
        id,
      ],
    };
    const result = await client.query(query);
    if (!result.rows[0]) {
      return undefined;
    }
    return result.rows[0];
  },

  async removeActivity(id) {
    const query = {
      text: 'DELETE FROM activity WHERE id = $1 RETURNING *',
      values: [id],
    };
    const result = await client.query(query);
    if (!result.rows[0]) {
      throw new Error('Activity not found');
    }
    return result.rows[0];
  },

  async getUser(id) {
    const query = {
      text: `
            SELECT
                activity.id,
                activity.name AS activity_name,
                activity.description AS activity_description,
                activity.id_user AS creeator_id,
                activity.date AS activity_date,
                category.name AS category_name,
                level.name AS level_name,
                users.id AS participant_id,
                users.email AS participant_email,
                users.firstname AS participant_firstname,
                users.lastname AS participant_lastname
            FROM user_activity
            JOIN activity ON activity.id = user_activity.id_activity
            JOIN category ON category.id = activity.id_category
            JOIN level ON level.id = activity.level
            JOIN users ON users.id = user_activity.id_user
            WHERE user_activity.id_activity = $1
            `,
      values: [id],
    };
    const result = await client.query(query);
    if (!result.rows[0]) {
      return undefined;
    }
    return result.rows;
  },
};

module.exports = activityDataMapper;
