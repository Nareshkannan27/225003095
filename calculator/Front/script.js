

document.getElementById('numbersForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const numberType = document.getElementById('numberType').value;
    const url = `http://localhost:9876/numbers/${numberType}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch numbers');
        }
        const data = await response.json();

        // Update UI with fetched data
        const numbersList = data.numbers.join(', ');
        document.getElementById('numbersList').textContent = numbersList;
        document.getElementById('average').textContent = data.average.toFixed(2);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        alert('Failed to fetch data. Please try again later.');
    }
});
