const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('KLIMA server online'));

// IMPORTANTISSIMO: usare SOLO process.env.PORT
const PORT = process.env.PORT;
if (!PORT) {
    console.error("Error: process.env.PORT non definita!");
    process.exit(1);
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));