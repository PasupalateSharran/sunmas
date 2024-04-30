const express = require('express');
const router = express.Router();
const Data = require('../data')

// Define routes
router.get('/', (req, res) => {
  const sliderData = Data.home.slider; // Extract slider data from your data object
  const aboutData = Data.home.about; // Extract slider data from your data object
  res.render('index', { sliderData,aboutData }); // Pass the slider data to your EJS template
});



module.exports = router;
