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

app.post('/data', (req, res) => {
  console.log("Dati ricevuti:", req.body);

  res.json({
    success: true
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));