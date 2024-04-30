const express = require('express');
const router = express.Router();
const Data = require('../data');

// Function to update a slide
const updateSlide = (slideNumber, heading, content) => {
    // Check if the slide number is valid
    if (slideNumber !== 1 && slideNumber !== 2) {
        throw new Error('Invalid slide number');
    }

    // Update the slide data
    const slide = `slide${slideNumber}`;
    Data.home.slider[slide].title = heading;
    Data.home.slider[slide].content = content;

    // For demonstration purposes, return true to indicate success
    return true;
};

// Function to update the about section
const updateAbout = (heading, content) => {
    // Update the about section data
    Data.homeome.about.title = heading;
    Data.home.about.content = content;

    // For demonstration purposes, return true to indicate success
    return true;
};




///////////////////////////Routes////////////////////////////////////////

// Route to handle the GET request for the admin page
router.get('/', (req, res, next) => {
    if (req.session.isAuthenticated) {
        // If authenticated, render the admin page
        const sliderData = Data.home.slider;
        const aboutData = Data.home.about;
        return res.render('admin', { sliderData, aboutData });
    }
    // If not authenticated, redirect to the login page
    res.redirect('/');
});

// Route to handle the POST request for updating a slide
router.post('/updateSlide/:slideNumber', (req, res) => {
    const slideNumber = parseInt(req.params.slideNumber);
    const { heading, body } = req.body;

    try {
        // Update the slide
        const updateSuccessful = updateSlide(slideNumber, heading, body);

        if (updateSuccessful) {
            // Redirect back to the admin page with a success message
            req.flash('success', `Slide ${slideNumber} updated successfully!`);
        } else {
            throw new Error('Failed to update slide');
        }
    } catch (error) {
        // If an error occurs, redirect back to the admin page with an error message
        req.flash('error', error.message || 'An error occurred. Please try again.');
    }

    // res.redirect('/admin');
});

// Route to handle the POST request for updating the about section
router.post('/updateAbout', (req, res) => {
    const { heading, body } = req.body;

    try {
        // Update the about section
        const updateSuccessful = updateAbout(heading, body);

        if (updateSuccessful) {
            // Redirect back to the admin page with a success message
            req.flash('success', 'About section updated successfully!');
        } else {
            throw new Error('Failed to update about section');
        }
    } catch (error) {
        // If an error occurs, redirect back to the admin page with an error message
        req.flash('error', error.message || 'An error occurred. Please try again.');
    }

    res.redirect('/admin');
});

module.exports = router;
