const express = require('express');
const app = express();
const dotenv = require('dotenv');
const pdf = require('html-pdf');
const bodyParser = require('body-parser');
const connectDatabase = require('./config/database');

dotenv.config({path:'./config/config.env'});

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to uncaught exception.')
    process.exit(1);
});

connectDatabase();
// Set up body parser
app.use(bodyParser.urlencoded({ extended : true }));
// Setup body parser
app.use(express.json())

const auth = require('./routes/auth');
const profile = require('./routes/profile');
const client = require('./routes/client');
const invoice = require('./routes/invoice');
const pdfTemplate = require('./documents/index.js');

app.use('/invoice/v1/auth',auth)
app.use('/invoice/v1/profile',profile)
app.use('/invoice/v1/client',client)
app.use('/invoice/v1/record',invoice)

//CREATE AND SEND PDF INVOICE
app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

const PORT = process.env.PORT;
const listen = app.listen(PORT,()=>{
    console.log(`Port Connected with ${PORT}`)
})