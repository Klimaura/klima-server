const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('KLIMA server online'));

// usa solo la porta fornita da Railway
const PORT = process.env.PORT;
if (!PORT) {
    console.error("Error: PORT non definita in process.env");
    process.exit(1); // chiude subito se non c'è porta
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));