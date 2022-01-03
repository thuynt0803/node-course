const Tour = require('../models/tourModel');

exports.getAllTours = async(req, res) => {
    try {
        console.log(req.query);

        // BIULD QUERY
        // 1A) Filtering
        const queryObj = {...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        console.log(JSON.parse(queryStr));

        // { difficulty: 'easy', duration: { $gte: 5 } }
        // { difficulty: 'easy', duration: { gte: '5' } }
        // gte, gt, lte, lt

        let query = Tour.find(JSON.parse(queryStr));

        // 2) Sorting
        if (req.query.sort) {
            // Sort('price, ratingsAverage') : Sort theo dkien 2 khi dkien 1 co values bang nhau
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            // In case that the user does not specify any sort field in the URL query string => auto sort by the createdAt
            query = query.sort('-createdAt');
        }

        // 3) Field limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        // 4) Pagination || movie 18 (continue)
        const page = req.query.page * 1 || 1;
        const limit = req.query.limiy * 1 || 100;
        const skip = (page - 1) * limit;

        //  page=2&limit=10, 1-10 page 1, 11-20 page 2
        query = query.skip(skip).limit(limit);

        // EXECUTE QUERY
        const tours = await query;
        // const tours = await Tour.find()
        //     .where('duration')
        //     .equals(5)
        //     .where('difficulty')
        //     .equals('easy');

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            result: tours.length,
            data: {
                tours: tours,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getTour = async(req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour: tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.createTour = async(req, res) => {
    try {
        // const newTour = new Tour({});
        // newTour.save();

        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tours: newTour,
            },
        }); // code: 201 - created success ; 200: Okay
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.updateTour = async(req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: 'success',
            data: {
                tour: tour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.deleteTour = async(req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: {
                tour: 'null',
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};