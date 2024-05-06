const express = require('express');
const router = express.Router();
const Data = require('../data')

// Define routes
router.get('/', (req, res) => {
    // Render the HTML file named 'about.ejs' in the views directory
    const contactData = Data.home.contactInfo;
    res.render('about', { contactData });
  });



module.exports = router;
