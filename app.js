const express = require('express');
const router = require('./routes/router');
const EJSHelpers = require('./config/EJSHelper')

const app = express();
const port = 3000;

// EJS View Engine
app.set('view engine', 'ejs');
// Serve Static files
app.use(express.static('public'));
// Pass by JSON on POST
app.use(express.urlencoded({ extended: true }));
// Pass helper file to views
app.locals.helper = EJSHelpers;

// Use router for everything else
app.use('/', router);
// Default
app.get('*', (req, res) => (res.render('pages/rip')));

app.listen(port, () => console.log(`Listening on port ${port}`));