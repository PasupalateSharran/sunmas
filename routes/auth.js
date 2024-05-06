const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Array of users
const users = [
    {
        name: "SunmasAdmin",
        password: "$2b$10$gVA3BLpjKqvAMquqmM2QvOGWu49JFR1s24XUgYGGyBaaW2NUw54DK" // Hashed password
    }
];

// Route to handle admin login
router.post('/admin', async (req, res) => {
    const user = users.find(user => user.name === req.body.name);
    if (!user) {
        return res.status(400).send('User not found');
    }
    try {
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (passwordMatch) {
            req.session.isAuthenticated = true;
            req.session.username = req.body.name; // Store the username in the session
            res.redirect('/admin'); // Redirect to /admin
        } else {
            res.status(401).send('Incorrect password');
        }
    } catch (error) {
        console.error("Error in bcrypt compare:", error);
        res.status(500).send('Internal server error occurred. Please try again later.');
    }
});

router.get('/admin', (req, res) => {
    res.render('login'); // Assuming you are using a templating engine like EJS or Handlebars to render the login page
});

module.exports = router;
