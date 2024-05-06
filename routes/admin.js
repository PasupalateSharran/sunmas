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
    // if (req.session.isAuthenticated) {
        // If authenticated, render the admin page
        const sliderData = Data.home.slider;
        const aboutData = Data.home.about;
        const servicesData = Data.home.services;
        const testimonialData = Data.home.testimonial;
        const contactData = Data.home.contactInfo;

        res.render('admin', { sliderData, aboutData, servicesData, testimonialData, contactData });
    // }
    // If not authenticated, redirect to the login page
    // res.redirect('/admin');
});


// Route to handle the POST request for updating the slider
router.post('/updateSlide/:slideNumber', (req, res) => {
    const slideNumber = parseInt(req.params.slideNumber);
    const { title, content } = req.body;

    try {
        // Update the slider
        const updateSuccessful = updateSlide(slideNumber, title, content);

        if (updateSuccessful) {
            // Set success flash message
            req.flash('success', `Slider ${slideNumber} updated successfully!`);
        } else {
            throw new Error('Failed to update slider');
        }
    } catch (error) {
        // Set error flash message
        req.flash('error', error.message || 'An error occurred. Please try again.');
    }

    // Redirect back to the admin page
    res.redirect('/admin');
});

// Route to handle the POST request for updating the about section
router.post('/updateAbout', (req, res) => {
    const { title, content } = req.body;

    try {
        // Update the about section
        const updateSuccessful = updateAbout(title, content);

        if (updateSuccessful) {
            // Set success flash message
            req.flash('success', 'About section updated successfully!');
        } else {
            throw new Error('Failed to update about section');
        }
    } catch (error) {
        // Set error flash message
        req.flash('error', error.message || 'An error occurred. Please try again.');
    }

    // Redirect back to the admin page
    res.redirect('/admin');
});

// Route to handle the POST request for updating the services section
router.post('/updateServices', (req, res) => {
    // Extract service data from request body
    const { title1, content1, title2, content2, title3, content3, title4, content4, title5, content5 } = req.body;

    try {
        // Update the services section
        const updateSuccessful = updateServices(title1, content1, title2, content2, title3, content3, title4, content4, title5, content5);

        if (updateSuccessful) {
            // Set success flash message
            req.flash('success', 'Services section updated successfully!');
        } else {
            throw new Error('Failed to update services section');
        }
    } catch (error) {
        // Set error flash message
        req.flash('error', error.message || 'An error occurred. Please try again.');
    }

    // Redirect back to the admin page
    res.redirect('/admin');
});

// Route to handle the POST request for updating the testimonial section
router.post('/updateTestimonial', (req, res) => {
    // Extract testimonial data from request body
    const { name1, position1, review1, name2, position2, review2, name3, position3, review3 } = req.body;

    try {
        // Update the testimonial section
        const updateSuccessful = updateTestimonial(name1, position1, review1, name2, position2, review2, name3, position3, review3);

        if (updateSuccessful) {
            // Set success flash message
            req.flash('success', 'Testimonial section updated successfully!');
        } else {
            throw new Error('Failed to update testimonial section');
        }
    } catch (error) {
        // Set error flash message
        req.flash('error', error.message || 'An error occurred. Please try again.');
    }

    // Redirect back to the admin page
    res.redirect('/admin');
});

// Route to handle the POST request for updating the contact info section
router.post('/updateContactInfo', (req, res) => {
    // Extract contact info data from request body
    const { title, number, website, timming, days } = req.body;

    try {
        // Update the contact info section
        const updateSuccessful = updateContactInfo(title, number, website, timming, days);

        if (updateSuccessful) {
            // Set success flash message
            req.flash('success', 'Contact info section updated successfully!');
        } else {
            throw new Error('Failed to update contact info section');
        }
    } catch (error) {
        // Set error flash message
        req.flash('error', error.message || 'An error occurred. Please try again.');
    }

    // Redirect back to the admin page
    res.redirect('/admin');
});


module.exports = router;
