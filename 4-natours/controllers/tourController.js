const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        result: tours.length,
        data: {
            tours: tours,
        },
    });
};

exports.getTour = (req, res) => {
    console.log(req.params); // req.params : chua tham so duoc chuyen tu URL (bien trong URL la tham so)

    const id = req.params.id * 1; // chuyen id : string -> number
    const tour = tours.find((el) => el.id === id); // find() : func cua JS

    // if (id > tours.length)
    if (!tour) {
        return res.status(404).send({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: tour,
        },
    });
};

exports.createTour = (req, res) => {
    // console.log(req.body);
    const newID = tours[tours.length - 1].id + 1; // Khi sd DB, id duoc tu dong sinh ra. Hien tai dang khong co DB nen can tao id thu cong
    const newTour = Object.assign({ id: newID }, req.body); // Object.assign : cho phep tao doi duong moi bang cach hop nhat cac doi tuong hien co

    tours.push(newTour); // push ban ghi vao tours

    fs.writeFile(
        // khong dong bo
        `${__dirname}/dev-data/data/tours-simple.json`, // ghi vao file .json
        JSON.stringify(tours), // chuyen tu dang object JS -> JSON
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tours: newTour,
                },
            }); // code: 201 - created success ; 200: Okay
        }
    );
};

exports.updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).send({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: 'Update tour here ...',
        },
    });
};

exports.deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).send({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: 'null',
        },
    });
};