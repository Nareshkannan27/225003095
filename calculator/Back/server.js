const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
let numbers = [];
app.use(express.json());
async function fetchNumbers(id) {
    try {
        const response = await axios.get(`http://third-party-server/api/${id}`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch numbers');
        }
        return response.data.numbers;
    } catch (error) {
        console.error(`Error fetching numbers for ID '${id}':`, error.message);
        throw error;
    }
}


app.get('/numbers/:id', async (req, res) => {
    const { id } = req.params;

    try {
        
        const newNumbers = await fetchNumbers(id);

        
        newNumbers.forEach(num => {
            if (!numbers.includes(num)) {
                numbers.push(num);
                if (numbers.length > WINDOW_SIZE) {
                    numbers.shift(); 
                }
            }
        });

        
        let sum = 0;
        const windowNumbers = numbers.slice(-WINDOW_SIZE); 
        windowNumbers.forEach(num => sum += num);
        const average = sum / windowNumbers.length;

        
        res.json({
            numbers: windowNumbers,
            average: average
        });
    } catch (error) {
        console.error('Error processing request:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
