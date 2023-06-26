const express = require('express');
require('dotenv').config();
const campaign=require('./routes/campaign')
const groups=require('./routes/groups');
const fundraisers=require('./routes/fundraisers');
const donations=require('./routes/donations');
const app=express();
const port = process.env.PORT || 3000;

app.use(express.json());

// app.get('/',(req,res)=>{
//     res.contentType="text/html"
//     res.send(`<h1>hello from my api</h1>
//     <h3>
//     <ul>
//         <li><a href="http://127.0.0.1:${port}/api/groups/">see all groups</a></li>
//         <li><a href="http://127.0.0.1:${port}/api/fundraisers/">see all fundraisers</a></li>
//         <li><a href="http://127.0.0.1:${port}/api/donations/">add donation</a></li>
//     </ul>
//     </h3>
//     `);
// })

app.use('/api/campaign',campaign);
app.use('/api/groups',groups);
app.use('/api/fundraisers',fundraisers);
app.use('/api/donations',donations);


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Sorry something broke try again later😕!')
})

app.listen(port, () => {
    console.log(`I am up in http://127.0.0.1:${port}`);
})

