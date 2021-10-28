const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json()); // middleware

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours: tours,
        },
    });
});

app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params); // req.params : chứa các tham số được truyền từ URL (biến trong URL là tham số)

    // const tour = tours.find(el => ) // find() : func cua JS

    res.status(200).json({
        status: 'success',
        // result:   tours.length,
        // data: {
        //     tours: tours,
        // },
    });
});

app.post('/api/v1/tours', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port: http://localhost:${port}`);
});