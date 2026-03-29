const express = require('express');
const app = express();
app.use(express.json());

// Stato globale simulato
let deviceState = {
  light: "OFF",
  pump: "OFF",
  temperature: 0,
  humidity: 0,
  wifiRSSI: 0,
  lastUpdate: null
};

// Comandi pendenti dall'app
let pendingCommand = null;

// ==================================================
// ENDPOINTS
// ==================================================

// Root
app.get('/', (req, res) => res.send('KLIMA server online'));

// Ricezione dati dall'ESP32
app.post('/device/data', (req, res) => {
  const { temperature, humidity, light, pump, wifiRSSI } = req.body;
  if (
    temperature === undefined ||
    humidity === undefined ||
    light === undefined ||
    pump === undefined
  ) {
    return res.status(400).send({ success: false, message: "Missing parameters" });
  }

  deviceState.temperature = temperature;
  deviceState.humidity = humidity;
  deviceState.light = light;
  deviceState.pump = pump;
  deviceState.wifiRSSI = wifiRSSI || 0;
  deviceState.lastUpdate = new Date().toISOString();

  console.log("Dati ricevuti:", deviceState);

  res.send({ success: true });
});

// Stato corrente dell'ESP32
app.get('/device/state', (req, res) => {
  res.send({
    success: true,
    state: deviceState
  });
});

// Comando dall'app verso ESP32
app.post('/device/command', (req, res) => {
  const { command } = req.body;
  if (!command) return res.status(400).send({ success: false, message: "Missing command" });

  pendingCommand = command;
  console.log("Comando salvato:", pendingCommand);
  res.send({ success: true });
});

// ESP32 legge i comandi pendenti
app.get('/device/command', (req, res) => {
  if (!pendingCommand) return res.send({ success: true, command: null });

  const commandToSend = pendingCommand;
  pendingCommand = null; // azzera dopo invio
  res.send({ success: true, command: commandToSend });
});

// ==================================================
// AVVIO SERVER
// ==================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));