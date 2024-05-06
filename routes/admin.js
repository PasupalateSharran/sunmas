const express = require('express');
const router = express.Router();
const Data = require('../data');


///////////////////////////Routes////////////////////////////////////////

// Route to handle the GET request for the admin page
router.get('/', (req, res, next) => {
    if (req.session.isAuthenticated) {
    // If authenticated, render the admin page
    const sliderData = Data.home.slider;
    const aboutData = Data.home.about;
    const servicesData = Data.home.services;
    const testimonialData = Data.home.testimonial;
    const contactData = Data.home.contactInfo;

    res.render('admin', { sliderData, aboutData, servicesData, testimonialData, contactData });
    }
    // If not authenticated, redirect to the login page
});


// Route to handle the POST request for updating the slider
router.post('/updateSlide/:slideNumber', (req, res) => {
    const slideNumber = parseInt(req.params.slideNumber);
    const { title, content } = req.body;

    try {
        // Update the slider
        const updateSuccessful = () => {
            Data.home.slider[slideNumber].title = title;
            Data.home.slider[slideNumber].content = content;
            return true;
        };

        if (updateSuccessful()) {
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
        const updateSuccessful = () => {
            Data.home.about.title = title;
            Data.home.about.content = content;
            return true;
        };

        if (updateSuccessful()) { // Corrected here: Call updateSuccessful function
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
router.post('/updateService/:serviceNumber', (req, res) => {
    // Extract service data from request body
    const serviceNumber = parseInt(req.params.serviceNumber);
    const { title, content } = req.body;

    try {
        // Update the services section
        const updateSuccessful = () => {
            if (Data.home.services[serviceNumber]) {
                Data.home.services[serviceNumber].title = title;
                Data.home.services[serviceNumber].content = content;
                return true;
            }
            return false; // Service with given serviceNumber not found
        };

        if (updateSuccessful()) {
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
router.post('/updateTestimonial/:testimonialNumber', (req, res) => {
    // Extract testimonial data from request body
    const { name, position, review } = req.body;
    const testimonialNumber = parseInt(req.params.testimonialNumber);

    try {
        // Update the testimonial section
        const updateSuccessful = () => {
            Data.home.testimonial[testimonialNumber].name = name;
            Data.home.testimonial[testimonialNumber].position = position;
            Data.home.testimonial[testimonialNumber].review = review; // Fix here
            return true;
        };

        if (updateSuccessful()) {
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

/// Route to handle the POST request for updating the contact info section
router.post('/updateContact', (req, res) => {
    // Extract contact info data from request body
    const { title, number, website, timing, days } = req.body;

    try {
        // Update the contact info section
        const updateSuccessful = () =>{
            Data.home.contactInfo.title = title;
            Data.home.contactInfo.number = number;
            Data.home.contactInfo.website = website;
            Data.home.contactInfo.timing = timing;
            Data.home.contactInfo.days = days;
            return true;
        };

        if (updateSuccessful()) { // Corrected here: Call updateSuccessful function
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
