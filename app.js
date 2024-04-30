const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const path = require('path')
const indexRoutes = require('./routes/index.js');
const aboutRoutes = require('./routes/about.js');
const adminRoutes = require('./routes/admin.js');
const authRoutes = require('./routes/auth.js');
const port = 3000

// Server the static files 
app.use(express.static('public'))

// Set EJS as the view engine
app.set('view engine', 'ejs'); 

// Set the directory for views
app.set('views', path.join(__dirname, 'views'));

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    // configure your session options here
    secret: 'your-secret-key', // Set a secret key for session management
    resave: false,
    saveUninitialized: false
}));

// Initialize express-flash after session middleware
app.use(flash());

app.use('/', indexRoutes);
app.use('/about', aboutRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})