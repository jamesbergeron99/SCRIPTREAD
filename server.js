const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// The voice engine
app.post('/api/tts', async (req, res) => {
    try {
        const apiKey = process.env.REACT_APP_INWORLD_KEY;
        if (!apiKey) return res.status(500).json({ error: "API Key missing in Render Dashboard" });

        const response = await fetch("https://api.inworld.ai/tts/v1/voice", {
            method: "POST",
            headers: { 
                "Authorization": `Basic ${apiKey}`, 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                text: req.body.text, 
                voiceId: req.body.voiceId || "Abby", 
                modelId: "inworld-tts-1.5-max" 
            })
        });
        const data = await response.json();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Serve the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Engine online on port ${PORT}`));
