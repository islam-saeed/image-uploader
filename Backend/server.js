require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const imageRoutes = require('./routes/images');

// express app
const app = express();

const cors = require('cors');


// middleware
app.use(express.json({extended: false}));


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use(cors())


// routes
app.use('/api/images',imageRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port ' + process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    })
