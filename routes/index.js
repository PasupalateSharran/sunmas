const express = require('express');
const router = express.Router();
const Data = require('../data')

// Define routes
router.get('/', (req, res) => {
  const sliderData = Data.home.slider;
  const aboutData = Data.home.about;
  const servicesData = Data.home.services;
  const testimonialData = Data.home.testimonial;
  const contactData = Data.home.contactInfo;
  res.render('index', { sliderData, aboutData, servicesData, testimonialData, contactData });
});



module.exports = router;
