const express = require('express');

const router = express.Router();
const activityController = require('../../controllers/api/activityController');

const apiErrorController = require('../../controllers/api/error');
const validator = require('../../validation/validator');

const activityGeoSchema = require('../../validation/schemas/activity/activityGeo.schema');
const activitySearchSchema = require('../../validation/schemas/activity/activitySearch.schema');
const activityCategorySchema = require('../../validation/schemas/activity/activityCategory.schema');

const controllerHandler = require('../../helpers/controllerHandler');
const errorHandler = require('../../helpers/errorHandler');

router.route('/')
    .get(
        controllerHandler(activityController.getAll),
    );

router.route('/:category/category')
    .get(
        validator('query', activityCategorySchema),
        controllerHandler(activityController.getByCategory),
    );

router.route('/:geo/geo')
    .get(
        validator('query', activityGeoSchema),
        controllerHandler(activityController.getByGeo),
    );

router.route('/:search/search')
    .get(
        validator('params', activitySearchSchema),
        controllerHandler(activityController.getBySearch),
    );

router.use(apiErrorController.error404);
router.use(errorHandler);

module.exports = router;

// /**
//      * GET /api/cadex
//      * @summary To get a random cadex and personalize it
//      * @param {string} noun.query - cadex personalized noun
//      * @param {string} adjective.query - cadex personalized adjective
//      * @param {string} verb.query - cadex personalized verb
//      * @param {string} complement.query - cadex personalized complement
//      * @return {cadex} 200 - success response
//      * @return {error} 400 - input data invalid
//      */
