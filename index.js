const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('KLIMA server online'));

app.get('/status', (req, res) => {
  res.json({
    server: "KLIMA",
    status: "online"
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));