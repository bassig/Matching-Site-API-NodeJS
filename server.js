const express = require('express');
const app = express();
require('./swagger')(app);

require('dotenv').config();
const campaign = require('./routes/campaign')
const groups = require('./routes/groups');
const fundraisers = require('./routes/fundraisers');
const donations = require('./routes/donations');
const db = require('./models/db');

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/campaign', campaign);
app.use('/api/groups', groups);
app.use('/api/fundraisers', fundraisers);
app.use('/api/donations', donations);


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Sorry something broke try again later😕!')
})

app.listen(port, () => {
    console.log(`I am up in http://127.0.0.1:${port}/api-docs`);
})

