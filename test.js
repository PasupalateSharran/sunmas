const bcrypt = require('bcrypt');

// Function to generate a hash from a string
const generateHash = async (inputString) => {
    try {
        // Generate the hash with bcrypt
        const saltRounds = 10; // Number of salt rounds
        const hashedValue = await bcrypt.hash(inputString, saltRounds);
        console.log('Hashed value:', hashedValue);
    } catch (error) {
        console.error('Error generating hash:', error);
    }
};

// Example usage
const inputString = 'sunmasadminauth'; // Replace this with your input string
generateHash(inputString);