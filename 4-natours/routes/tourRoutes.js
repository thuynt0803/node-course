const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// val: gia tri cua tham so duoc de cap
// router.param('id', tourController.checkID);

router
    .route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;