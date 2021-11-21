const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose
    .connect(process.env.DATABASE_LOCAL, {
        // .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connection successful!');
    });

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App running on port: http://localhost:${port}`);
});