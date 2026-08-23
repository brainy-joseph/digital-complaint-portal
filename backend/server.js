// Mock Node.js Express Server for JantaSetu
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Mock database in memory
const mockIncidents = [
  { id: "JH-0101", region: "Ranchi", category: "Roads", dialect: "Nagpuri", status: "Assigned", priority: "High" },
  { id: "JH-0102", region: "West Singhbhum", category: "Drainage", dialect: "Ho", status: "Under Review", priority: "Medium" }
];

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({ status: "ok", service: "JantaSetu Processing Engine" });
});

// Mock endpoint for voice report conversion & translation
app.post('/api/v1/report/voice', (req, res) => {
  const { audioData, dialect } = req.body;
  res.json({
    success: true,
    incidentId: `JH-${Math.floor(1000 + Math.random() * 9000)}`,
    transcription: "Sample transcribed text from audio input.",
    translatedText: "Translated text normalized for authority review.",
    detectedLanguage: dialect || "Santali",
    autoRoutedTo: "District Administration"
  });
});

// Mock endpoint to fetch incidents for authority dashboard
app.get('/api/v1/incidents', (req, res) => {
  res.json({ success: true, count: mockIncidents.length, data: mockIncidents });
});

app.listen(PORT, () => {
  console.log(`JantaSetu Mock Server running on port ${PORT}`);
});
