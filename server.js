let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');
let app = express();
let data = require('./data');

let CONNECTION_URL = data.cloudDatabaseURL;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { mongoose.connect(CONNECTION_URL, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true },(err) =>
{
    if(err)
    {
        console.log('Database Not Connected',err);
    }
    else
    {
        console.log('Database Connected Successfully and Back End Listening on Port',PORT);
    }
});});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const recommendation = require('./recommendation/recommendation');

app.get('/recommend',recommendation.recommend);
app.use('/policy',require('./routes/policy.route'));
app.use('/user',require('./routes/user.route'));