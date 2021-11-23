const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        // result: tours.length,
        // data: {
        //     tours: tours,
        // },
    });
};

exports.getTour = (req, res) => {
    console.log(req.params); // req.params : chua tham so duoc chuyen tu URL (bien trong URL la tham so)
    const id = req.params.id * 1; // chuyen id : string -> number

    // const tour = tours.find((el) => el.id === id); // find() : func cua JS

    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         tour: tour,
    //     },
    // });
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
            message: 'Invalid data sent!',
        });
    }
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: 'Update tour here ...',
        },
    });
};

exports.deleteTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: 'null',
        },
    });
};