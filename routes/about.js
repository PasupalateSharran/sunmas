const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
    // Render the HTML file named 'about.ejs' in the views directory
    res.render('about');
  });



module.exports = router;
